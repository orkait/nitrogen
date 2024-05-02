import { regexList } from '../colors'

describe('App', () => {
    it('check if regex mathes for colors', () => {
        const testList = [
            {
                test: 'bg-red-50',
                outcome: true
            },
            {
                test: 'bg-red-500',
                outcome: true
            },
            {
                test: 'bg-white',
                outcome: true
            },
            {
                test: 'bg-transparent',
                outcome: true
            },
        ]

        testList.forEach(({ test, outcome }) => {
            const result = regexList.some(regexString => (new RegExp(regexString)).test(test))
            expect(result).toBe(outcome)
        })
    })
})