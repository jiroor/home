export default {
  count(string: string, char: string): number {
    const reChar = new RegExp(char, 'g')
    const match = string.match(reChar)
    return match ? match.length : 0
  }
}
