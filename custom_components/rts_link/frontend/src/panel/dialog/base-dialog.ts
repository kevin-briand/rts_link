import { css, type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit'
import { type HomeAssistant } from '../../types/hass'
import { property, query, state } from 'lit/decorators.js'
import { localize } from '../../localize/localize'
import { style } from '../../style'

/**
 * Base dialog built on the native <dialog> element.
 * ha-dialog is not used on purpose: its API changed several times between HA versions.
 */
export abstract class RtsLinkBaseDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant
  @state() public contentKey: string | undefined = undefined
  @query('dialog') private dialogEl!: HTMLDialogElement

  setContentKey (contentKey: string): void {
    this.contentKey = contentKey
  }

  async open (): Promise<void> {
    await this.updateComplete
    if (!this.dialogEl.open) this.dialogEl.showModal()
    const focusable = this.renderRoot.querySelector<HTMLElement>('[autofocus]')
    focusable?.focus()
  }

  /** Called when the dialog is closed, confirm = true if the user validated. */
  protected abstract onClosed (confirm: boolean): void

  protected abstract renderBody (): TemplateResult<1>

  protected finish (confirm: boolean): void {
    if (this.dialogEl.open) this.dialogEl.close()
    this.onClosed(confirm)
  }

  protected t (key: string): string {
    return localize(key, this.hass.language)
  }

  private onBackdropClick (event: MouseEvent): void {
    // The <dialog> itself only receives the click when the backdrop is clicked
    if (event.target === this.dialogEl) this.finish(false)
  }

  private onCancel (event: Event): void {
    // Escape key
    event.preventDefault()
    this.finish(false)
  }

  render (): TemplateResult<1> {
    return html`
      <dialog @click=${this.onBackdropClick} @cancel=${this.onCancel}>
        <div class="surface">
          <h2 class="title">${this.contentKey ? this.t(`panel.dialog.title.${this.contentKey}`) : ''}</h2>
          <div class="dialog-content">${this.renderBody()}</div>
          <div class="actions">
            <ha-button appearance="plain" @click=${() => { this.finish(false) }}>
              ${this.t('panel.dialog.cancel')}
            </ha-button>
            <ha-button @click=${() => { this.finish(true) }}>
              ${this.t('panel.dialog.confirm')}
            </ha-button>
          </div>
        </div>
      </dialog>
    `
  }

  static get styles (): CSSResultGroup {
    return [style, css`
      dialog {
        padding: 0;
        border: none;
        border-radius: var(--ha-dialog-border-radius, 24px);
        width: min(520px, calc(100vw - 32px));
        background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
        color: var(--primary-text-color);
        box-shadow: var(--dialog-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.3));
        outline: none;
      }

      dialog::backdrop {
        background: var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.5));
      }

      .surface {
        padding: 24px;
      }

      .title {
        margin: 0 0 16px;
        font-size: 22px;
        font-weight: 400;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 24px;
      }
    `]
  }
}
