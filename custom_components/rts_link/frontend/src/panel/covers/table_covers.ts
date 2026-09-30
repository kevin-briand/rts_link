import { css, type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { localize } from '../../localize/localize'
import { type HomeAssistant } from '../../types/hass'
import { style } from '../../style'
import { type CoverDto } from '../websocket/dto/coverDto'
import { type CoverCommand } from '../websocket/ha-ws'
import { type RtsLinkConfirmDialog } from '../dialog/confirm'
import { type RtsLinkRenameDialog } from '../dialog/rename'
import { type RtsLinkChangeTypeDialog } from '../dialog/change-type'
import '../dialog/rename'
import '../dialog/confirm'
import '../dialog/change-type'
import { CoverDeviceEnum } from '../api/enum/cover-device-enum'

enum Btn {
  add,
  remove,
  rename,
  changeType
}

const TYPE_ICONS: Record<string, string> = {
  [CoverDeviceEnum.SHUTTER]: 'mdi:window-shutter',
  [CoverDeviceEnum.BUTTON]: 'mdi:gesture-tap-button'
}

@customElement('rts-link-covers-table')
export class RtsLinkCoversTable extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant
  @property({ type: Boolean }) public disabled: boolean = false
  @property({ attribute: false }) public removeCover!: (cover: CoverDto) => void
  @property({ attribute: false }) public addShutter!: (cover: CoverDto) => void
  @property({ attribute: false }) public rename!: (cover: CoverDto) => void
  @property({ attribute: false }) public changeType!: (cover: CoverDto) => void
  @property({ attribute: false }) public sendCommand!: (cover: CoverDto, command: CoverCommand) => Promise<void>
  @property({ attribute: false }) public datas: CoverDto[] | undefined
  @state() private pendingId: number | null = null
  @query('rts-link-confirm-dialog') private confirmDialog!: RtsLinkConfirmDialog
  @query('rts-link-rename-dialog') private renameDialog!: RtsLinkRenameDialog
  @query('rts-link-change-type-dialog') private changeTypeDialog!: RtsLinkChangeTypeDialog
  private selectedCover: CoverDto | undefined = undefined
  private btnClicked: Btn | undefined = undefined

  private t (key: string): string {
    return localize(key, this.hass.language)
  }

  private async command (cover: CoverDto, command: CoverCommand): Promise<void> {
    this.pendingId = cover.id
    try {
      await this.sendCommand(cover, command)
    } finally {
      this.pendingId = null
    }
  }

  private iconButton (icon: string, label: string, onClick: () => void, extraClass = '', disabled = this.disabled): TemplateResult<1> {
    return html`
      <button class="icon-btn ${extraClass}" title=${label} aria-label=${label} .disabled=${disabled} @click=${onClick}>
        <ha-icon icon=${icon}></ha-icon>
      </button>`
  }

  private controls (cover: CoverDto): TemplateResult<1> {
    const busy = this.disabled || this.pendingId !== null
    if ((cover.cover_type ?? CoverDeviceEnum.SHUTTER) === CoverDeviceEnum.BUTTON) {
      return html`${this.iconButton('mdi:gesture-tap', this.t('panel.control.press'), () => { void this.command(cover, 'press') }, 'control', busy)}`
    }
    return html`
      ${this.iconButton('mdi:arrow-up', this.t('panel.control.up'), () => { void this.command(cover, 'up') }, 'control', busy)}
      ${this.iconButton('mdi:star-outline', this.t('panel.control.my'), () => { void this.command(cover, 'stop') }, 'control', busy)}
      ${this.iconButton('mdi:arrow-down', this.t('panel.control.down'), () => { void this.command(cover, 'down') }, 'control', busy)}
    `
  }

  private row (cover: CoverDto): TemplateResult<1> {
    const type = cover.cover_type ?? CoverDeviceEnum.SHUTTER
    return html`
      <div class="row">
        <div class="identity">
          <div class="type-icon">
            ${this.pendingId === cover.id ? html`<div class="spinner"></div>` : html`<ha-icon icon=${TYPE_ICONS[type] ?? 'mdi:remote'}></ha-icon>`}
          </div>
          <div class="text">
            <div class="name">${cover.name}</div>
            <div class="secondary">${this.t(`panel.coverType.${type}`)} · ${this.t('panel.id')} ${cover.id}</div>
          </div>
        </div>
        <div class="controls">${this.controls(cover)}</div>
        <div class="actions">
          ${this.iconButton('mdi:pencil', this.t('panel.rename'), () => { this.openDialog(cover, Btn.rename, 'rename') })}
          ${this.iconButton('mdi:swap-horizontal', this.t('panel.changeType'), () => { this.openDialog(cover, Btn.changeType, 'changeType') })}
          ${this.iconButton('mdi:link-variant-plus', this.t('panel.add'), () => { this.openDialog(cover, Btn.add, 'add') })}
          ${this.iconButton('mdi:delete-outline', this.t('panel.delete'), () => { this.openDialog(cover, Btn.remove, 'remove') }, 'danger')}
        </div>
      </div>`
  }

  private openDialog (cover: CoverDto, btn: Btn, trKey: string): void {
    this.selectedCover = cover
    this.btnClicked = btn
    let dialog: RtsLinkConfirmDialog | RtsLinkRenameDialog | RtsLinkChangeTypeDialog | null
    switch (btn) {
      case Btn.rename:
        dialog = this.renameDialog
        if (dialog) dialog.name = cover.name ?? ''
        break
      case Btn.changeType:
        dialog = this.changeTypeDialog
        if (dialog) dialog.setSelected(cover.cover_type ?? CoverDeviceEnum.SHUTTER)
        break
      default:
        dialog = this.confirmDialog
    }
    if (dialog == null) return
    dialog.setContentKey(trKey)
    void dialog.open()
  }

  private handleClosedDialog (confirm: boolean): void {
    const cover = this.selectedCover
    const btn = this.btnClicked
    this.selectedCover = undefined
    this.btnClicked = undefined
    if (!confirm || !cover || btn === undefined) return
    switch (btn) {
      case Btn.add:
        this.addShutter(cover)
        break
      case Btn.remove:
        this.removeCover(cover)
        break
      case Btn.rename:
        this.rename(cover)
        break
      case Btn.changeType:
        this.changeType(cover)
        break
    }
  }

  private handleClosedRenameDialog (confirm: boolean, name: string): void {
    if (!name || !this.selectedCover) return
    // Work on a copy: the list must not change if the dialog is cancelled
    if (confirm) this.selectedCover = { ...this.selectedCover, name }
    this.handleClosedDialog(confirm)
  }

  private handleClosedChangeTypeDialog (confirm: boolean, type: CoverDeviceEnum): void {
    if (!type || !this.selectedCover) return
    if (confirm) this.selectedCover = { ...this.selectedCover, cover_type: type }
    this.handleClosedDialog(confirm)
  }

  render (): TemplateResult<1> {
    let content: TemplateResult<1>
    if (this.datas === undefined) {
      content = html`<div class="empty"><div class="spinner"></div></div>`
    } else if (this.datas.length === 0) {
      content = html`
        <div class="empty">
          <ha-icon icon="mdi:window-shutter-open"></ha-icon>
          <div>${this.t('panel.empty')}</div>
        </div>`
    } else {
      content = html`<div class="list">${this.datas.map((cover) => this.row(cover))}</div>`
    }
    return html`
      ${content}
      <rts-link-confirm-dialog .closed=${this.handleClosedDialog.bind(this)} .hass=${this.hass}></rts-link-confirm-dialog>
      <rts-link-rename-dialog .closed=${this.handleClosedRenameDialog.bind(this)} .hass=${this.hass}></rts-link-rename-dialog>
      <rts-link-change-type-dialog .closed=${this.handleClosedChangeTypeDialog.bind(this)} .hass=${this.hass}></rts-link-change-type-dialog>
    `
  }

  static get styles (): CSSResultGroup {
    return [style, css`
      .list {
        border: 1px solid var(--rts-divider);
        border-radius: 8px;
        overflow: hidden;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 8px 8px 12px;
        border-bottom: 1px solid var(--rts-divider);
      }

      .row:last-child {
        border-bottom: none;
      }

      .row:hover {
        background-color: var(--secondary-background-color);
      }

      .identity {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1 1 auto;
        min-width: 0;
      }

      .type-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 50%;
        background-color: var(--secondary-background-color);
        color: var(--state-icon-color, var(--primary-color));
      }

      .row:hover .type-icon {
        background-color: var(--card-background-color);
      }

      .text {
        min-width: 0;
      }

      .name {
        font-size: 16px;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .secondary {
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .controls, .actions {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
      }

      .controls {
        padding-right: 8px;
        border-right: 1px solid var(--rts-divider);
      }

      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 32px 16px;
        color: var(--secondary-text-color);
        --mdc-icon-size: 40px;
      }

      /* Narrow screens: actions go on a second line */
      @media (max-width: 600px) {
        .row {
          flex-wrap: wrap;
        }
        .identity {
          flex-basis: 100%;
        }
        .controls {
          padding-right: 0;
          border-right: none;
        }
        .actions {
          margin-left: auto;
          gap: 0;
        }
      }
    `]
  }
}
