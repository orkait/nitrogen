import { regexList } from "../borders";

describe('App', () => {
    it('check if regex mathes for borders', () => {
        const borderList = [
            {
                test: 'rounded-r-10',
                outcome: true
            },
            {
                test: 'rounded-15',
                outcome: false
            },
            {
                test: 'border-solid',
                outcome: true
            },
            {
                test: 'border-r-solid',
                outcome: true
            },
            {
                test: 'border-x-solid',
                outcome: false
            },
            {
                test: 'border-t-solid',
                outcome: true
            },
            {
                test: 'border-t-4',
                outcome: true
            },
            {
                test: 'border-4',
                outcome: true
            },
            {
                test: 'border-5',
                outcome: false
            }
        ]

        borderList.forEach(({ test, outcome }) => {
            const result = regexList.some(regexString => (new RegExp(regexString)).test(test))
            expect(result).toBe(outcome)
        })
    })
})