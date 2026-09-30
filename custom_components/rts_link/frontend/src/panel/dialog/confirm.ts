import { html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { RtsLinkBaseDialog } from './base-dialog'

@customElement('rts-link-confirm-dialog')
export class RtsLinkConfirmDialog extends RtsLinkBaseDialog {
  @property({ attribute: false }) public closed!: (confirm: boolean) => void

  protected onClosed (confirm: boolean): void {
    this.closed(confirm)
  }

  protected renderBody (): TemplateResult<1> {
    if (!this.contentKey) return html``
    return html`${unsafeHTML(this.t(`panel.dialog.content.${this.contentKey}`))}`
  }
}
