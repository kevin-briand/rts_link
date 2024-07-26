import { css, html, LitElement, PropertyValues, type TemplateResult } from 'lit';
import { type HomeAssistant } from 'custom-card-helpers'
import { customElement, property, state } from 'lit/decorators.js';
import { localize } from '../../localize/localize';
import { Dialog } from '@material/mwc-dialog';
import { style } from '../../style';
import { CoverDeviceEnum } from '../api/enum/cover-device-enum';
import { getEnumValues } from '../common';

@customElement('rts-link-change-type-dialog')
export class RtsLinkChangeTypeDialog extends LitElement {
  @property() public hass!: HomeAssistant
  @property() public closed!: (confirm: boolean, name: string) => void
  @state() public type: CoverDeviceEnum = CoverDeviceEnum.SHUTTER
  @state() public contentKey: string | undefined = undefined

  protected firstUpdated(_changedProperties: PropertyValues) {
    const dialog = this.shadowRoot?.getElementById('dialog') as Dialog;
    if (!dialog) return
    dialog.addEventListener('closed', (event) => {
      const customEvent = event as CustomEvent<{ action: string }>;
      const form = this.shadowRoot?.querySelector('form')
      if (form == null) return
      const type = form.coverType.value
      if (!type) return
      this.closed(customEvent.detail.action === 'accept', type)
    })
  }

  setContentKey (contentKey: string) {
    this.contentKey = contentKey
  }

  setSelected (type: CoverDeviceEnum) {
    this.type = type
  }

  open() {
    const dialog = this.shadowRoot?.getElementById('dialog') as Dialog;
    if (!dialog) return
    const select = this.shadowRoot?.querySelector('select')
    if (select) {
      select.selectedIndex = Object.values(CoverDeviceEnum).indexOf(this.type)
    }
    dialog.show()
    this.requestUpdate()
  }

  render (): TemplateResult<1> {
    return html`
      <ha-dialog id="dialog" flexcontent="" scrimClickAction="">
        <ha-dialog-header>
          <span slot="title">${localize(`panel.dialog.title.${this.contentKey}`, this.hass.language)}</span>
        </ha-dialog-header>
        <form>
          <select name="coverType" id="coverType">
            ${getEnumValues(CoverDeviceEnum).map((v) => {
              console.log(v, this.type.valueOf(), v === this.type.valueOf());
              return html`<option value="${v}">${v}</option>`
            })}
          </select>
        </form>
        <mwc-button
          slot="primaryAction"
          dialogAction="accept">
          ${localize('panel.dialog.confirm', this.hass.language)}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          dialogAction="decline">
          ${localize('panel.dialog.cancel', this.hass.language)}
        </mwc-button>  
      </ha-dialog>
    `
  }

  static readonly styles = css`${style}`
}
