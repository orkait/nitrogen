import { regexList } from '../box-shadow'

describe('App', () => {
    it('check if regex mathes for box-shadow', () => {
        const shadowList = [
            {
                test: 'shadow-nx4-ny4-0-100',
                outcome: true
            },
            {
                test: 'shadow-x4-y4-8-400',
                outcome: true
            },
            {
                test: 'shadow-x0-y0-4-200',
                outcome: true
            },
            {
                test: 'shadow-x2-y2-2-900',
                outcome: false
            }
        ]

        shadowList.forEach(({ test, outcome }) => {
            const result = regexList.some(regexString => (new RegExp(regexString)).test(test))
            expect(result).toBe(outcome)
        })
    })
})