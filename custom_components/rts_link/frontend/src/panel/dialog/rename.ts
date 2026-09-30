import { html, type TemplateResult } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { RtsLinkBaseDialog } from './base-dialog'

@customElement('rts-link-rename-dialog')
export class RtsLinkRenameDialog extends RtsLinkBaseDialog {
  @property({ attribute: false }) public closed!: (confirm: boolean, name: string) => void
  @property({ attribute: false }) public name: string = ''
  @query('#shutterName') private input!: HTMLInputElement

  async open (): Promise<void> {
    await this.updateComplete
    this.input.value = this.name ?? '' // reset what a cancelled edit left in the field
    await super.open()
    this.input.select()
  }

  protected onClosed (confirm: boolean): void {
    const name = this.input.value.trim()
    if (!name) return
    this.closed(confirm, name)
  }

  protected renderBody (): TemplateResult<1> {
    return html`
      <form @submit=${(e: Event) => { e.preventDefault(); this.finish(true) }}>
        <input type="text" id="shutterName" autocomplete="off" autofocus .value=${this.name ?? ''}>
      </form>`
  }
}
