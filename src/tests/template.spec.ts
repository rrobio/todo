import { faker } from '@faker-js/faker'
import render from '../templates/template'

describe('Templates', () => {
  describe('simple template', () => {
    test('should substitute {{name}}', () => {
      const name = faker.person.firstName()
      expect(render({ name }, 'hello {{name}}')).toStrictEqual('hello ' + name)
    })
    test('should fail when not closing {{', () => {
      const name = faker.person.firstName()
      expect(() => render({ name }, 'hello {{name')).toThrow(SyntaxError)
      expect(() => render({ name }, 'hello {{name')).toThrow('Term not closed starting at: 6')
    })
    test('should fail when term name is not in context', () => {
      expect(() => render({}, 'hello {{name}}')).toThrow(SyntaxError)
      expect(() => render({}, 'hello {{name}}')).toThrow('Term `name` not in context starting at: 6')
    })
  })
  describe('multiple substitues', () => {
    test('should replace first and last name', () => {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      expect(render({ firstName, lastName }, 'hello {{firstName}} {{lastName}}')).toStrictEqual('hello ' + firstName + ' ' + lastName)
    })
    test('should fail when oppening new term before closing last', () => {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const func = () => render({ firstName, lastName }, 'hello {{firstName {{lastName}}')
      expect(func).toThrow(SyntaxError)
      // expect(func).toThrow(/First Term not closed.*/)
    })
  })
})
