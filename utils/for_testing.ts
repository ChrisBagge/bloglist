export const palindrome = (string: string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

export const average = (array: number[]) => {
  const reducer = (sum: any, item: any) => {
    return sum + item
  }
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

