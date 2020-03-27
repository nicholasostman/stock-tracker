import {toDollarString, stripDollarSign} from '../../src/common/helpers'

describe('toDollarString helper function', () => {
    it('should convert a number to a string with a prefixed dollar sign = $', async () => {
        const result = toDollarString(124.3456)
        expect(result).toEqual('$124.35')
    })
})

describe('stripDollarSign helper function', () => {
    it('should remove $ symbols from a string value', async () => {
        const result = stripDollarSign('$test$ funTime$')
        expect(result).toEqual('test funTime')
    })
})