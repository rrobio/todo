import { faker } from '@faker-js/faker'
import render from '../templates/template'

describe('Templates', () => {
  describe('simple template', () => {
    test('should substitute {{name}}', () => {
      const name = faker.person.firstName()
      expect(render('hello {{name}}', { name })).toStrictEqual('hello ' + name)
    })
    test('should fail when not closing {{', () => {
      const name = faker.person.firstName()
      expect(render('hello {{name', { name })).toStrictEqual('hello {{name')
    })
    test('should fail when term name is not in context', () => {
      expect(render('hello {{name}}', {})).toStrictEqual('hello {{name}}')
    })
  })
  describe('multiple substitues', () => {
    test('should replace first and last name', () => {
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      expect(render('hello {{firstName}} {{lastName}}', { firstName, lastName })).toStrictEqual('hello ' + firstName + ' ' + lastName)
    })
  })
})
