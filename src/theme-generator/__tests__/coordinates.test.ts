import { regexList } from '../coordinates'

describe('App', () => {
    it('check if regex mathes for coordinates', () => {
        const testList = [
            {
                test: 'top-0',
                outcome: true
            },
            {
                test: 'left-0.5',
                outcome: true
            },
            {
                test: 'bottom-1.5',
                outcome: true
            },
            {
                test: 'x-0',
                outcome: false
            }
        ]

        testList.forEach(({ test, outcome }) => {
            const result = regexList.some(regexString => (new RegExp(regexString)).test(test))
            expect(result).toBe(outcome)
        })
    })
})