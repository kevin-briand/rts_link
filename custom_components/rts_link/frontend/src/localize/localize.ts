import * as en from './languages/en.json'
import * as fr from './languages/fr.json'

import IntlMessageFormat from 'intl-messageformat'

const LANGUAGES: any = {
  en,
  fr
}

export function localize (string: string, language: string, ...args: any[]): string {
  const lang = language.replace(/['"]+/g, '')

  let translated: string | undefined = findTranslation(string, lang)
  if (translated === undefined) return ''

  // replace keys in the translated message
  const iKeys = translated.match(/{{.*?}}/g)
  if (iKeys) {
    iKeys.forEach((key) => {
      key = key.replace(/{{|}}/g, '')
      const result = findTranslation(key, lang)
      if (result) {
        translated = translated?.replace(key, result)
      }
    })
    translated = translated.replace(/{{|}}/g, '')
  }

  if (args.length === 0) return translated

    type arg = Record<string, any>
    const argObject: arg = {}
    for (let i = 0; i < args.length; i += 2) {
      let key = args[i]
      key = key.replace(/^{([^}]+)?}$/, '$1')
      argObject[key] = args[i + 1]
    }

    try {
      const message = new IntlMessageFormat(translated, language)
      return message.format(argObject) as string
    } catch (err) {
      return `Translation ${String(err)}`
    }
}

function findTranslation (key: string, language: string) {
  let translated = undefined
  try {
    translated = key.split('.').reduce((o, i) => o[i], LANGUAGES[language])
  } catch (e) {
    try {
      translated = key.split('.').reduce((o, i) => o[i], LANGUAGES.en)
    } catch (e) {
      console.error("translation not found : " + key);
    }
  }
  return translated
}
