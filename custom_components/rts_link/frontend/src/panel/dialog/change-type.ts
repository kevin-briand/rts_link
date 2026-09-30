import { html, type TemplateResult } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { RtsLinkBaseDialog } from './base-dialog'
import { CoverDeviceEnum } from '../api/enum/cover-device-enum'
import { getEnumValues } from '../common'

@customElement('rts-link-change-type-dialog')
export class RtsLinkChangeTypeDialog extends RtsLinkBaseDialog {
  @property({ attribute: false }) public closed!: (confirm: boolean, type: CoverDeviceEnum) => void
  @state() public type: CoverDeviceEnum = CoverDeviceEnum.SHUTTER
  @query('#coverType') private select!: HTMLSelectElement

  setSelected (type: CoverDeviceEnum): void {
    this.type = type
  }

  async open (): Promise<void> {
    await this.updateComplete
    this.select.value = this.type
    await super.open()
  }

  protected onClosed (confirm: boolean): void {
    const type = this.select.value as CoverDeviceEnum
    if (!type) return
    this.closed(confirm, type)
  }

  protected renderBody (): TemplateResult<1> {
    return html`
      <select id="coverType" autofocus .value=${this.type}>
        ${getEnumValues(CoverDeviceEnum).map((v) => html`
          <option value=${v} ?selected=${v === this.type}>${this.t(`panel.coverType.${v}`)}</option>`)}
      </select>`
  }
}
