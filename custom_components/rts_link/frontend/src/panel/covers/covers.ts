import { css, type CSSResultGroup, html, LitElement, nothing, type PropertyValues, type TemplateResult } from 'lit'
import { type HomeAssistant, type Panel } from '../../types/hass'
import { customElement, property, query, state } from 'lit/decorators.js'
import './table_covers'
import '../dialog/confirm'
import { localize } from '../../localize/localize'
import { style } from '../../style'
import { type CoverDto } from '../websocket/dto/coverDto'
import {
  rtsLinkAddShutter,
  rtsLinkChangeTypeCover,
  rtsLinkNewCover,
  rtsLinkRemoveCover,
  rtsLinkRenameCover
} from '../api/ha-api'
import { type CoverCommand, rtsLinkGetAllCovers, rtsLinkSendCommand } from '../websocket/ha-ws'
import { type RtsLinkConfirmDialog } from '../dialog/confirm'
import { CoverDeviceEnum } from '../api/enum/cover-device-enum'
import { getEnumValues } from '../common'

interface ApiResponse { success: boolean }

@customElement('rts-link-covers-card')
export class RtsLinkCoversCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant
  @property({ attribute: false }) public panel!: Panel
  @property({ type: Boolean, reflect: true }) public narrow!: boolean
  @property({ attribute: false }) public reload!: () => void
  @state() private error: string | null = null
  @state() private success: string | null = null
  @state() private coversData: CoverDto[] | undefined = undefined
  @state() private busy: string | null = null
  @query('rts-link-confirm-dialog') private confirmDialog!: RtsLinkConfirmDialog
  @query('#shutterName') private nameInput!: HTMLInputElement
  @query('#coverType') private typeSelect!: HTMLSelectElement

  private t (key: string): string {
    return localize(key, this.hass.language)
  }

  protected firstUpdated (_changed: PropertyValues): void {
    this.updateCoversData()
  }

  private openCreateDialog (event: Event): void {
    event.preventDefault()
    if (!this.nameInput.value.trim()) {
      this.error = this.t('panel.error.emptyField')
      this.nameInput.focus()
      return
    }
    this.error = null
    this.confirmDialog.setContentKey('create')
    void this.confirmDialog.open()
  }

  private handleAdd (confirm: boolean): void {
    if (!confirm) return
    const name = this.nameInput.value.trim()
    const coverType = this.typeSelect.value as CoverDeviceEnum
    if (!name || !coverType) {
      this.error = this.t('panel.error.emptyField')
      return
    }
    void this.run('create', async () => await rtsLinkNewCover(this.hass, name, coverType))
      .then((ok) => { if (ok) this.nameInput.value = '' })
  }

  private handleAddShutter (cover: CoverDto): void {
    void this.run('add', async () => await rtsLinkAddShutter(this.hass, cover.id))
  }

  private handleDelete (cover: CoverDto): void {
    void this.run('remove', async () => await rtsLinkRemoveCover(this.hass, cover.id))
  }

  private handleRename (cover: CoverDto): void {
    void this.run('rename', async () => await rtsLinkRenameCover(this.hass, cover.id, cover.name))
  }

  private handleChangeType (cover: CoverDto): void {
    void this.run('changeType', async () =>
      await rtsLinkChangeTypeCover(this.hass, cover.id, cover.cover_type ?? CoverDeviceEnum.SHUTTER))
  }

  private async handleCommand (cover: CoverDto, command: CoverCommand): Promise<void> {
    this.error = null
    this.success = null
    try {
      await rtsLinkSendCommand(this.hass, cover.id, command)
    } catch (e) {
      this.error = `${this.t('panel.error.command')} (${cover.name})`
    }
  }

  /** Runs an API call with busy indicator and success/error message. */
  private async run (action: string, call: () => Promise<ApiResponse>): Promise<boolean> {
    this.error = null
    this.success = null
    this.busy = action
    let ok = false
    try {
      ok = (await call()).success
    } catch (e) {
      ok = false
    }
    this.busy = null
    if (ok) {
      this.success = this.t(`panel.success.${action}`)
      this.updateCoversData()
    } else {
      this.error = this.t(`panel.error.${action}`)
    }
    return ok
  }

  updateCoversData (): void {
    rtsLinkGetAllCovers(this.hass)
      .then((covers) => {
        this.coversData = [...covers].sort((a, b) => a.name.localeCompare(b.name))
      })
      .catch((e: { message?: string }) => {
        this.coversData = []
        this.error = e.message ?? this.t('error')
      })
  }

  requestUpdate (name?: PropertyKey, oldValue?: unknown): void {
    super.requestUpdate(name, oldValue)
    if (name === 'panel') this.updateCoversData()
  }

  render (): TemplateResult<1> {
    const disabled = this.busy !== null
    return html`
      <ha-card>
        <div class="header">
          <ha-icon icon="mdi:remote"></ha-icon>
          <span>${this.t('panel.title')}</span>
        </div>

        ${this.error ? html`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${() => { this.error = null }}>${this.error}</ha-alert>` : nothing}
        ${this.success ? html`<ha-alert alert-type="success" dismissable @alert-dismissed-clicked=${() => { this.success = null }}>${this.success}</ha-alert>` : nothing}
        ${this.busy ? html`<div class="busy"><div class="spinner"></div>${this.t(`panel.busy.${this.busy}`)}</div>` : nothing}

        <div class="card-content">
          <section>
            <h3 class="section-title">${this.t('panel.newRemote')}</h3>
            <form class="add-form" @submit=${this.openCreateDialog}>
              <label class="field name">
                ${this.t('panel.name')}
                <input type="text" id="shutterName" autocomplete="off" .disabled=${disabled}
                       placeholder=${this.t('panel.namePlaceholder')}>
              </label>
              <label class="field">
                ${this.t('panel.type')}
                <select id="coverType" .disabled=${disabled}>
                  ${getEnumValues(CoverDeviceEnum).map((v) => html`<option value=${v}>${this.t(`panel.coverType.${v}`)}</option>`)}
                </select>
              </label>
              <ha-button class="create" .disabled=${disabled} @click=${this.openCreateDialog}>
                <ha-icon slot="start" icon="mdi:plus"></ha-icon>
                ${this.t('panel.create')}
              </ha-button>
            </form>
          </section>

          <section>
            <h3 class="section-title">
              ${this.t('panel.remotes')}${this.coversData ? html` <span class="count">${this.coversData.length}</span>` : nothing}
            </h3>
            <rts-link-covers-table
              .hass=${this.hass}
              .datas=${this.coversData}
              .disabled=${disabled}
              .removeCover=${this.handleDelete.bind(this)}
              .addShutter=${this.handleAddShutter.bind(this)}
              .rename=${this.handleRename.bind(this)}
              .changeType=${this.handleChangeType.bind(this)}
              .sendCommand=${this.handleCommand.bind(this)}
            ></rts-link-covers-table>
          </section>
        </div>
      </ha-card>
      <rts-link-confirm-dialog .closed=${this.handleAdd.bind(this)} .hass=${this.hass}></rts-link-confirm-dialog>
    `
  }

  static get styles (): CSSResultGroup {
    return [style, css`
      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 16px 8px;
        font-size: 20px;
        color: var(--primary-text-color);
      }

      .header ha-icon {
        color: var(--primary-color);
      }

      ha-alert {
        display: block;
        margin: 0 16px 8px;
      }

      .busy {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 16px 8px;
        padding: 10px 12px;
        border-radius: 8px;
        background-color: var(--secondary-background-color);
        color: var(--primary-text-color);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 8px 16px 16px;
      }

      .add-form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 12px;
      }

      .add-form .name {
        flex: 1 1 200px;
      }

      .add-form input {
        width: 100%;
      }

      .count {
        display: inline-block;
        min-width: 20px;
        padding: 0 6px;
        margin-left: 4px;
        border-radius: 10px;
        text-align: center;
        background-color: var(--secondary-background-color);
        color: var(--primary-text-color);
      }

      :host([narrow]) .add-form .create {
        width: 100%;
      }
    `]
  }
}
