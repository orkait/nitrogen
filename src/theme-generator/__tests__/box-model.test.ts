import { regexList } from '../box-model'

describe('App', () => {
    it('check if regex mathes for box-model', () => {
        const boxModelList = [
            {
                test: 'pt-5',
                outcome: true
            },
            {
                test: 'pb-0.5',
                outcome: true
            },
            {
                test: 'pb-0',
                outcome: true
            },
            {
                test: 'px-0',
                outcome: true
            }
        ]

        boxModelList.forEach(({ test, outcome }) => {
            const result = regexList.some(regexString => (new RegExp(regexString)).test(test))
            expect(result).toBe(outcome)
        })
    })
})