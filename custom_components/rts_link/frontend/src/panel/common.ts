export function getEnumValues(obj: any) {
  return Object.values(obj).reduce((acc: string[], p) => {
    if (Object(p) instanceof String) {
      acc.push(p as string)
    }
    return acc
  }, [])
}

export function getEnumValuePos(obj: any, value: string) {
  return Object.values(obj).indexOf(value)
}
