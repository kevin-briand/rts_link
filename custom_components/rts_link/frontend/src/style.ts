import { css } from 'lit'

// Shared styles, based on Home Assistant theme variables so light/dark/custom themes work
export const style = css`
  :host {
    --rts-radius: var(--ha-card-border-radius, 12px);
    --rts-divider: var(--divider-color, rgba(127, 127, 127, 0.2));
  }

  ha-card {
    display: flex;
    flex-direction: column;
    margin: 8px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    margin: 0 0 8px;
  }

  .hint {
    font-size: 13px;
    color: var(--secondary-text-color);
    margin: 4px 0 0;
  }

  input, select {
    box-sizing: border-box;
    height: 40px;
    padding: 0 12px;
    font: inherit;
    font-size: 15px;
    color: var(--primary-text-color);
    background-color: var(--input-fill-color, var(--secondary-background-color));
    border: 1px solid var(--rts-divider);
    border-bottom: 1px solid var(--input-idle-line-color, var(--secondary-text-color));
    border-radius: 4px 4px 0 0;
    outline: none;
  }

  input:focus, select:focus {
    border-bottom: 2px solid var(--primary-color);
  }

  input:disabled, select:disabled {
    opacity: 0.5;
  }

  label.field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    --mdc-icon-size: 20px;
  }

  .icon-btn:hover:not(:disabled) {
    background-color: var(--secondary-background-color);
    color: var(--primary-text-color);
  }

  .icon-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .icon-btn.danger:hover:not(:disabled) {
    color: var(--error-color);
  }

  .icon-btn.control {
    color: var(--primary-color);
    background-color: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
  }

  .icon-btn.control:hover:not(:disabled) {
    background-color: rgba(var(--rgb-primary-color, 3, 169, 244), 0.2);
    color: var(--primary-color);
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid var(--rts-divider);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .dialog-content {
    line-height: 1.5;
    color: var(--primary-text-color);
  }

  .dialog-content input, .dialog-content select {
    width: 100%;
    margin-top: 8px;
  }
`
