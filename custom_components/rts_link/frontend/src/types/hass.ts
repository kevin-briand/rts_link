// Minimal Home Assistant frontend types used by the panel
// (replaces the custom-card-helpers dependency, which was only used for these types)

export interface HomeAssistant {
  language: string
  callWS: <T = unknown>(msg: { type: string, [key: string]: unknown }) => Promise<T>
  callApi: <T = unknown>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, parameters?: Record<string, unknown>) => Promise<T>
}

export interface Panel {
  component_name: string
  config: Record<string, unknown>
  url_path: string
  title: string | null
  icon: string | null
}
