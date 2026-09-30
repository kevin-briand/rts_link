import * as en from './languages/en.json'
import * as fr from './languages/fr.json'

const LANGUAGES: Record<string, unknown> = {
  en,
  fr
}

/**
 * Translate a key ("panel.dialog.confirm") in the given language, English as fallback.
 * {{other.key}} inside a translation is replaced by that translation,
 * and optional args ('name', value, ...) replace {name} placeholders.
 */
export function localize (key: string, language: string, ...args: unknown[]): string {
  const lang = language.replace(/['"]+/g, '')

  let translated = findTranslation(key, lang)
  if (translated === undefined) return ''

  // nested translations: {{panel.dialog.step.add}}
  translated = translated.replace(/{{(.*?)}}/g, (_match, nestedKey: string) => findTranslation(nestedKey, lang) ?? '')

  // placeholders: localize('key', 'fr', 'name', 'Salon') replaces {name}
  for (let i = 0; i + 1 < args.length; i += 2) {
    const name = String(args[i]).replace(/^{|}$/g, '')
    translated = translated.split(`{${name}}`).join(String(args[i + 1]))
  }
  return translated
}

function findTranslation (key: string, language: string): string | undefined {
  const lookup = (lang: string): unknown =>
    key.split('.').reduce<unknown>((node, part) =>
      (node !== null && typeof node === 'object') ? (node as Record<string, unknown>)[part] : undefined, LANGUAGES[lang])

  const value = lookup(language) ?? lookup('en')
  if (typeof value !== 'string') {
    console.error(`translation not found : ${key}`)
    return undefined
  }
  return value
}
