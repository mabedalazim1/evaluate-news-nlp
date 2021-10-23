
import 'babel-polyfill'
import { checkURL } from '../src/client/js/urlChecker'

describe('Test submit functionality', () => {

    test('Test Url without http:// ', () => {
        let url = 'www.alkwtherps.com'
        expect(checkURL(url)).toBe(false)
    })
    test('Test Url without www ', () => {
        let url = 'alkwtherps.com'
        expect(checkURL(url)).toBe(false)
    })
    test('Test Url with space ', () => {
        let url = 'http://www.alkwth erps.com'
        expect(checkURL(url)).toBe(false)
    })
    test('Test valid url ', () => {
        let url = 'http://www.alkwtherps.com'
        expect(checkURL(url)).toBe(true)
    })
    
    test('Testing the checkURL() function ', () => {
        expect(checkURL).toBeDefined()
    }) 
})