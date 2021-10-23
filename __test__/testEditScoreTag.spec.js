/**
 * @jest-environment jsdom
 */

import "babel-polyfill"
import { editScoreTag } from '../src/client/js/formHandler'

describe('Testing editScoreTag functionality', () => {
   
    test('Testing the "P+" case', () => {
        
        expect(editScoreTag('P+')).toBe('Strong Positive')
    })
    test('Testing the "P" case', () => {
        
        expect(editScoreTag('P')).toBe('Positive')
    })
    test('Testing the "NEW" case', () => {
        
        expect(editScoreTag('NEW')).toBe('Neutral')
    })
    test('Testing the "N+" case', () => {
        
        expect(editScoreTag('N+')).toBe('Strong Negative')
    })
    test('Testing the "NONE" case', () => {
        
        expect(editScoreTag('NONE')).toBe('No Sentiment')
    })

    test('Testing the editScoreTag() function', () => {
        expect(editScoreTag).toBeDefined()
    })
})