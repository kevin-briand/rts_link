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

enum Btn {
  add,
  remove,
  rename
}

@customElement('rts-link-covers-table')
export class RtsLinkCoversTable extends LitElement {
  @property() public hass!: HomeAssistant
  @property() public disabled: boolean = false
  @property() public removeCover!: (prog: CoverDto) => void
  @property() public addShutter!: (prog: CoverDto) => void
  @property() public rename!: (prog: CoverDto) => void
  @property({ type: Array }) public datas!: CoverDto[]
  @state() selectedCover: CoverDto | undefined = undefined
  @state() btnClicked: Btn | undefined = undefined

  addRow (data: CoverDto): TemplateResult<1> {
    return html`
            <div class="flexRow">
             <span>${data.id}</span>
              <span class="grow">${data.name}</span>
              <span><mwc-button @click='${(event: MouseEvent) => { this.openDialog(event, data, Btn.rename, 'rename') }}' class="button" id="rename" .disabled="${this.disabled}">
                ${localize('panel.rename', this.hass.language)}
              </mwc-button></span>
              <span><mwc-button @click='${(event: MouseEvent) => { this.openDialog(event, data, Btn.add, 'add') }}' class="button" id="add" .disabled="${this.disabled}">
                ${localize('panel.add', this.hass.language)}
              </mwc-button></span>
              <span><mwc-button @click='${(event: MouseEvent) => { this.openDialog(event, data, Btn.remove, 'remove') }}' class="button" id="delete" .disabled="${this.disabled}">
                ${localize('panel.delete', this.hass.language)}
              </mwc-button></span>   
            </div>
        `
  }

  openDialog (event: MouseEvent, data: CoverDto, btn: Btn, trKey: string) {
    const button = event.target as HTMLElement
    button.blur()
    this.selectedCover = data
    this.btnClicked = btn
    let dialog: RtsLinkConfirmDialog | RtsLinkRenameDialog | null
    if (btn === Btn.rename) {
      dialog = this.shadowRoot?.querySelector('rts-link-rename-dialog') ?? null
    } else {
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
    }
    this.selectedCover = undefined
    this.btnClicked = undefined
  }

  handleClosedRenameDialog (confirm: boolean, name: string) {
    if (!name || !this.selectedCover) return
    this.selectedCover.name = name
    this.handleClosedDialog(confirm)
  }

  render (): TemplateResult<1> {
    if (this.datas === undefined) return html``
    return html`
            <div>
              <div class="flexRow">
                <span>${localize('panel.id', this.hass.language)}</span>
                <span class="grow">${localize('panel.name', this.hass.language)}</span>
              </div>
              ${this.datas.map((value) => {
                return this.addRow(value)
              })}     
            </div>
            <rts-link-confirm-dialog .closed="${this.handleClosedDialog.bind(this)}" .hass="${this.hass}"></rts-link-confirm-dialog>
            <rts-link-rename-dialog .closed="${this.handleClosedRenameDialog.bind(this)}" .hass="${this.hass}"></rts-link-rename-dialog>
        `
  }

  static get styles (): CSSResultGroup {
    return css`
      ${style}
      span {
        margin: 0 5px;
        align-self: center;
        min-width: 20px;
      }
    `
  }
}
