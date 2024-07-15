import { css, html, LitElement, PropertyValues, type TemplateResult } from 'lit';
import { type HomeAssistant } from 'custom-card-helpers'
import { customElement, property, state } from 'lit/decorators.js';
import { localize } from '../../localize/localize';
import { Dialog } from '@material/mwc-dialog';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { style } from '../../style';

@customElement('rts-link-confirm-dialog')
export class RtsLinkConfirmDialog extends LitElement {
  @property() public hass!: HomeAssistant
  @property() public closed!: (confirm: boolean) => void
  @state() public contentKey: string | undefined = undefined

  protected firstUpdated(_changedProperties: PropertyValues) {
    const dialog = this.shadowRoot?.getElementById('dialog') as Dialog;
    if (!dialog) return
    dialog.addEventListener('closed', (event) => {
      const customEvent = event as CustomEvent<{ action: string }>;
      this.closed(customEvent.detail.action === 'accept')
    })
  }

  setContentKey (contentKey: string) {
    this.contentKey = contentKey
  }

  open() {
    const dialog = this.shadowRoot?.getElementById('dialog') as Dialog;
    if (!dialog) return
    dialog.show()
    this.requestUpdate()
  }

  render (): TemplateResult<1> {
    return html`
      <ha-dialog id="dialog" flexcontent="" scrimClickAction="">
        <ha-dialog-header>
          <span slot="title">${localize(`panel.dialog.title.${this.contentKey}`, this.hass.language)}</span>
        </ha-dialog-header>
        <div class="content">${unsafeHTML(localize(`panel.dialog.content.${this.contentKey}`, this.hass.language))}</div>
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
