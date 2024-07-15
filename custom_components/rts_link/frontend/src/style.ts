import { css } from 'lit'

export const style = css`
  .button {
    margin-right: -0.57em;
  }
  
  .flex {
    display: flex;
    justify-content: space-between;
  }
  
  .flex-center {
    justify-content: center !important;
  }
  
  .flexRow {
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: center;
  }
  
  .flexRow-center {
    justify-content: center;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  
  .gap {
    gap: 1rem;
  }
  
  .grow {
    flex-grow: 1;
  }

  h2, .center {
    text-align: center;
  }
  
  ha-card {
    display: flex;
    flex-direction: column;
    margin: 5px;
    max-width: calc(100vw - 10px);
  }

  label {
    width: 120px;
    align-self: center;
  }
  
  .row {
    height: 40px;
    margin: 0;
    align-items: center;
  }
  
  select, input {
    background-color: var(--mdc-text-field-fill-color);
    flex-grow: 1;
    border: none;
    border-radius: 5px;
    padding: 5px;
  }
`
