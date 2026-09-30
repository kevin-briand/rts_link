import { css, html, LitElement, type TemplateResult } from 'lit'
import { type HomeAssistant, type Panel } from '../types/hass'
import { customElement, property } from 'lit/decorators.js'
import './covers/covers'
import { VERSION } from './consts'

@customElement('rts-link-panel')
export class RtsLinkPanel extends LitElement {
  @property() public hass!: HomeAssistant
  @property() public panel!: Panel
  @property({ type: Boolean, reflect: true }) public narrow!: boolean

  render (): TemplateResult<1> {
    return html`
            <div class="header">
                <div class="toolbar">
                    <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
                    <div class="main-title">RTS Link</div>
                    <div class="version">
                            v${VERSION}
                    </div>
                </div>
            </div>
            <div class="view">
                ${this.getCards()}
            </div>
        `
  }

  reload (): void {
    const children: NodeListOf<LitElement> | undefined = this.shadowRoot?.querySelectorAll('.card')
    if (children === undefined) return
    children.forEach(el => {
      el.requestUpdate('panel')
    })
  }

  getCards (): TemplateResult<1> {
    return html`
            <rts-link-covers-card class="card" .hass=${this.hass} .narrow=${this.narrow} .panel=${this.panel} .reload="${this.reload.bind(this)}"></rts-link-covers-card>
        `
  }

  static readonly styles = css`
          .header {
            background-color: var(--app-header-background-color);
            color: var(--app-header-text-color, white);
            border-bottom: var(--app-header-border-bottom, none);
          }
          .toolbar {
            height: var(--header-height);
            display: flex;
            align-items: center;
            font-size: 20px;
            padding: 0 16px;
            font-weight: 400;
            box-sizing: border-box;
          }
          .main-title {
            margin: 0 0 0 24px;
            line-height: 20px;
            flex-grow: 1;
          }
          .version {
            font-size: 14px;
            font-weight: 500;
            color: rgba(var(--rgb-text-primary-color), 0.9);
          }
          .view {
            box-sizing: border-box;
            min-height: calc(100vh - var(--header-height, 56px));
            padding: 16px 8px 24px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            background-color: var(--primary-background-color);
          }
          .view > * {
            width: 100%;
            max-width: 760px;
          }
    `
}
