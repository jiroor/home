import TextUseCase from './text'

test('counts number of char in string', () => {
  expect(TextUseCase.count('88888', '8')).toBe(5)
  expect(TextUseCase.count('88888', '1')).toBe(0)
})
