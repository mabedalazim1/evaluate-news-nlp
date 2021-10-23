/**
 * @jest-environment jsdom
 */
import 'babel-polyfill'
import { handleSubmit } from '../src/client/js/formHandler'

describe('Test submit functionality', () => {
    test('test the submit function ', () => {
        expect(handleSubmit).toBeDefined()
    }) 
})