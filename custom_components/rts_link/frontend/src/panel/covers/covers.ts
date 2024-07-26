import { css, type CSSResultGroup, html, LitElement, type PropertyDeclaration, type TemplateResult } from 'lit';
import { type HomeAssistant, type Panel } from 'custom-card-helpers'
import { customElement, property, state } from 'lit/decorators.js'
import './table_covers'
import '../dialog/confirm'
import { localize } from '../../localize/localize'
import { style } from '../../style'
import { CoverDto } from '../websocket/dto/coverDto';
import {
  rtsLinkAddShutter,
  rtsLinkChangeTypeCover,
  rtsLinkNewCover,
  rtsLinkRemoveCover,
  rtsLinkRenameCover,
} from '../api/ha-api';
import { rtsLinkGetAllCovers } from '../websocket/ha-ws';
import { RtsLinkCoversTable } from './table_covers';
import { RtsLinkConfirmDialog } from '../dialog/confirm';
import { CoverDeviceEnum } from '../api/enum/cover-device-enum';
import { getEnumValues } from '../common';

@customElement('rts-link-covers-card')
export class RtsLinkCoversCard extends LitElement {
  @property() public hass!: HomeAssistant
  @property() public panel!: Panel
  @property({ type: Boolean, reflect: true }) public narrow!: boolean
  @property() public reload!: () => void
  @state() private error: string | null = null
  @state() private success: string | null = null
  @state() private coversData: CoverDto[] = []

  firstUpdated (): void {
    this.updateCoversData()

    const element = this.shadowRoot?.querySelector('#add')
    if (element == null) {
      return
    }
    element.addEventListener('click', (event) => {
      const button = event.target as HTMLElement
      button.blur()
      const dialog: RtsLinkConfirmDialog | null = this.shadowRoot?.querySelector('rts-link-confirm-dialog') ?? null
      if (dialog == null) {
        return
      }
      dialog.setContentKey('create')
      dialog.open()
    })
  }

  handleAdd (confirm: boolean): void {
    if (!confirm) return
    const form = this.shadowRoot?.querySelector('form')
    if (form == null) return
    const name = form.shutterName.value
    const coverType = form.coverType.value
    if (!name || !coverType) {
      this.error = localize('panel.error.emptyField', this.hass.language)
      this.requestUpdate()
      return
    }
    this.disableButtons(true)

    void rtsLinkNewCover(this.hass, name, coverType).then((data) => {
      if (!data.success) {
        this.error = localize("panel.error.create", this.hass.language)
        return
      }
      this.updateCoversData()
      this.success = localize("panel.success.create", this.hass.language)
    }).catch(() => this.error = localize("panel.error.create", this.hass.language))
      .finally(() => this.disableButtons(false))
  }

  handleAddShutter (shutter: CoverDto): void {
    if (!shutter) return
    this.disableButtons(true)
    void rtsLinkAddShutter(this.hass, shutter.id)
      .then((data) => {
        if (!data.success) {
          this.error = localize("panel.error.add", this.hass.language)
          return
        }
        this.updateCoversData();
        this.success = localize("panel.success.add", this.hass.language)
      })
      .catch(() => {
        this.error = localize("panel.error.add", this.hass.language)
      })
      .finally(() => this.disableButtons(false))
  }

  handleDelete (shutter: CoverDto): void {
    this.disableButtons(true)
    void rtsLinkRemoveCover(this.hass, shutter.id)
      .then((data) => {
        if (!data.success) {
          this.error = localize("panel.error.remove", this.hass.language)
          return
        }
        this.updateCoversData();
        this.success = localize("panel.success.remove", this.hass.language)
      })
      .catch(() => this.error = localize("panel.error.remove", this.hass.language))
      .finally(() => this.disableButtons(false))
  }

  handleRename (shutter: CoverDto): void {
    this.disableButtons(true)
    void rtsLinkRenameCover(this.hass, shutter.id, shutter.name)
      .then((data) => {
        if (!data.success) {
          this.error = localize("panel.error.rename", this.hass.language)
          return
        }
        this.updateCoversData();
        this.success = localize("panel.success.rename", this.hass.language)
      })
      .catch(() => this.error = localize("panel.error.rename", this.hass.language))
      .finally(() => this.disableButtons(false))
  }

  handleChangeType (shutter: CoverDto): void {
    this.disableButtons(true)
    void rtsLinkChangeTypeCover(this.hass, shutter.id, shutter.cover_type ?? CoverDeviceEnum.SHUTTER)
      .then((data) => {
        if (!data.success) {
          this.error = localize("panel.error.changeType", this.hass.language)
          return
        }
        this.updateCoversData();
        this.success = localize("panel.success.changeType", this.hass.language)
      })
      .catch(() => this.error = localize("panel.error.changeType", this.hass.language))
      .finally(() => this.disableButtons(false))
  }

  updateCoversData (): void {
    rtsLinkGetAllCovers(this.hass)
      .then((r) => {
        this.coversData = r
        this.requestUpdate()
        this.updateCoversTable()
      })
      .catch((e) => {
        this.error = e.message
        this.requestUpdate()
      })
  }

  updateCoversTable (): void {
    const coversTable = this.shadowRoot?.querySelector('rts-link-covers-table') as RtsLinkCoversTable
    if (coversTable === null) return
    coversTable.disabled = true
    coversTable.requestUpdate()
    coversTable.datas = this.coversData
    coversTable.disabled = false
    coversTable.requestUpdate()
  }

  disableButtons (disabled: boolean): void {
    if (disabled) {
      this.error = null
      this.success = null
    }
    const coversTable = this.shadowRoot?.querySelector('rts-link-covers-table') as RtsLinkCoversTable
    if (coversTable === null) return
    coversTable.disabled = disabled
    coversTable.requestUpdate()
    const buttonAdd = this.shadowRoot?.querySelector('#add') as HTMLButtonElement
    if (buttonAdd === null) return
    buttonAdd.disabled = disabled
    this.requestUpdate()
  }

  requestUpdate (name?: PropertyKey, oldValue?: unknown, options?: PropertyDeclaration): void {
    super.requestUpdate(name, oldValue, options)
    if (name === 'panel') this.updateCoversData()
  }

  render (): TemplateResult<1> {
    return html`
      <ha-card .header="${localize("panel.title", this.hass.language)}">
        ${this.error != null ? html`<div id="error">${this.error}</div>` : ''}
        ${this.success != null ? html`<div id="success">${this.success}</div>` : ''}
        <div class="card-content">
          <div class="content">
            <form>
              <div class="flexRow">
                <label for="shutterName">${localize('panel.name', this.hass.language)}</label>
                <input type="text" name="shutterName" id="shutterName">
              </div>
              <div class="flexRow">
                <label for="coverType">${localize('panel.type', this.hass.language)}</label>
                <select name="coverType" id="coverType">
                  ${getEnumValues(CoverDeviceEnum).map((v) => {
                    return html`<option value="${v}">${localize(`panel.coverType.${v}`, this.hass.language)}</option>`
                  })}
                </select>
              </div>
              <div class="flexRow">
                <mwc-button class="button" id="add">
                  ${localize('panel.create', this.hass.language)}
                </mwc-button>
              </div>
            </form>
            <rts-link-covers-table 
              .hass="${this.hass}" 
              .removeCover="${this.handleDelete.bind(this)}" 
              .addShutter="${this.handleAddShutter.bind(this)}"
              .rename="${this.handleRename.bind(this)}"
              .changeType="${this.handleChangeType.bind(this)}"
            ></rts-link-covers-table>
          </div>
        </div>
      </ha-card>
      <rts-link-confirm-dialog .closed="${this.handleAdd.bind(this)}" .hass="${this.hass}"></rts-link-confirm-dialog>
    `
  }

  static get styles (): CSSResultGroup {
    return css`
      ${style}
      #error {
        background-color: red;
        color: white;
        padding: 3px;
        margin-bottom: 10px;
      }
      #success {
        background-color: green;
        color: white;
        padding: 3px;
        margin-bottom: 10px;
      }
    `
  }
}
