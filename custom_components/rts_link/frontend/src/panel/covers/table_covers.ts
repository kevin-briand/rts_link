import { css, type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { localize } from '../../localize/localize'
import { type HomeAssistant } from 'custom-card-helpers'
import { style } from '../../style'
import { CoverDto } from '../websocket/dto/coverDto';
import { RtsLinkConfirmDialog } from '../dialog/confirm';
import { RtsLinkRenameDialog } from '../dialog/rename';
import '../dialog/rename'
import '../dialog/confirm'
import '../dialog/change-type'
import { CoverDeviceEnum } from '../api/enum/cover-device-enum';
import { RtsLinkChangeTypeDialog } from '../dialog/change-type';

enum Btn {
  add,
  remove,
  rename,
  changeType
}

@customElement('rts-link-covers-table')
export class RtsLinkCoversTable extends LitElement {
  @property() public hass!: HomeAssistant
  @property() public disabled: boolean = false
  @property() public removeCover!: (prog: CoverDto) => void
  @property() public addShutter!: (prog: CoverDto) => void
  @property() public rename!: (prog: CoverDto) => void
  @property() public changeType!: (prog: CoverDto) => void
  @property({ type: Array }) public datas!: CoverDto[]
  @state() selectedCover: CoverDto | undefined = undefined
  @state() btnClicked: Btn | undefined = undefined

  addRow (data: CoverDto): TemplateResult<1> {
    return html`
      <div class="grid-item">${data.id}</div>
      <div class="grid-item">${data.name}</div>
      <div class="grid-item">${data.cover_type ?? CoverDeviceEnum.SHUTTER}</div>
      <div class="grid-item">
        <mwc-button @click='${(event: MouseEvent) => { this.openDialog(event, data, Btn.rename, 'rename') }}' class="button" id="rename" .disabled="${this.disabled}">
          ${localize('panel.rename', this.hass.language)}
        </mwc-button>
        <mwc-button @click='${(event: MouseEvent) => { this.openDialog(event, data, Btn.changeType, 'changeType') }}' class="button" id="changeType" .disabled="${this.disabled}">
          ${localize('panel.changeType', this.hass.language)}
        </mwc-button>
        <mwc-button @click='${(event: MouseEvent) => { this.openDialog(event, data, Btn.add, 'add') }}' class="button" id="add" .disabled="${this.disabled}">
          ${localize('panel.add', this.hass.language)}
        </mwc-button>
        <mwc-button @click='${(event: MouseEvent) => { this.openDialog(event, data, Btn.remove, 'remove') }}' class="button" id="delete" .disabled="${this.disabled}">
          ${localize('panel.delete', this.hass.language)}
        </mwc-button>             
      </div>
        `
  }

  openDialog (event: MouseEvent, data: CoverDto, btn: Btn, trKey: string) {
    const button = event.target as HTMLElement
    button.blur()
    this.selectedCover = data
    this.btnClicked = btn
    let dialog: RtsLinkConfirmDialog | RtsLinkRenameDialog | RtsLinkChangeTypeDialog | null
    switch (btn) {
      case Btn.rename:
        dialog = this.shadowRoot?.querySelector('rts-link-rename-dialog') as RtsLinkRenameDialog ?? null
        if (dialog) {
          dialog.name = data.name ?? ''
        }
        break
      case Btn.changeType:
        dialog = this.shadowRoot?.querySelector('rts-link-change-type-dialog') as RtsLinkChangeTypeDialog ?? null
        if (dialog) {
          dialog.setSelected(data.cover_type ?? CoverDeviceEnum.SHUTTER)
        }
        break
      default:
        dialog = this.shadowRoot?.querySelector('rts-link-confirm-dialog') ?? null
    }
    if (dialog == null) {
      return
    }
    dialog.setContentKey(trKey)
    dialog.open()
  }

  handleClosedDialog (confirm: boolean) {
    if (!confirm || !this.selectedCover || !this.btnClicked === undefined) return
    switch (this.btnClicked) {
      case Btn.add:
        this.addShutter(this.selectedCover)
        break
      case Btn.remove:
        this.removeCover(this.selectedCover)
        break
      case Btn.rename:
        this.rename(this.selectedCover)
        break
      case Btn.changeType:
        this.changeType(this.selectedCover)
        break
    }
    this.selectedCover = undefined
    this.btnClicked = undefined
  }

  handleClosedRenameDialog (confirm: boolean, name: string) {
    if (!name || !this.selectedCover) return
    this.selectedCover.name = name
    this.handleClosedDialog(confirm)
  }

  handleClosedChangeTypeDialog (confirm: boolean, type: CoverDeviceEnum) {
    if (!type || !this.selectedCover) return
    this.selectedCover.cover_type = type
    this.handleClosedDialog(confirm)
  }

  render (): TemplateResult<1> {
    if (this.datas === undefined) return html``
    return html`
            <div class="grid-container">
              <div class="grid-item header">${localize('panel.id', this.hass.language)}</div>
              <div class="grid-item header">${localize('panel.name', this.hass.language)}</div>
              <div class="grid-item header">${localize('panel.type', this.hass.language)}</div>
              <div class="grid-item header"></div>
              ${this.datas.map((value) => {
                return this.addRow(value)
              })}     
            </div>
            <rts-link-confirm-dialog 
              .closed="${this.handleClosedDialog.bind(this)}" 
              .hass="${this.hass}">
            </rts-link-confirm-dialog>
            <rts-link-rename-dialog 
              .closed="${this.handleClosedRenameDialog.bind(this)}" 
              .hass="${this.hass}">
            </rts-link-rename-dialog>
            <rts-link-change-type-dialog 
              .closed="${this.handleClosedChangeTypeDialog.bind(this)}" 
              .hass="${this.hass}">
            </rts-link-change-type-dialog>
        `
  }

  static get styles (): CSSResultGroup {
    return css`
      ${style}
      .header {
        font-weight: bold;
      }
      
      .grid-container {
        display: grid;
        grid-template-columns: auto auto auto auto;
      }
      
      .grid-item {
        margin: 0 5px;
        align-self: center;
        min-width: 20px;
      }
    `
  }
}
