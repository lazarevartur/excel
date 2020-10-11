export function capitalaze(string) {
  if (typeof string !== 'string') {
    return ''
  }
  string = string.charAt(0).toUpperCase() + string.slice(1)
  return string
}
