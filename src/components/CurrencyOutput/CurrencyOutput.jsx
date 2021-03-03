import React from 'react'
import Button from '@material-ui/core/Button';

const CurrencyOutput = ({currency, amount, handleRemove }) => {

    const finalAmount = (currency.rate_float * amount).toLocaleString('en-US', {maximumFractionDigits:2})
    const symbol = currency.symbol
    
    return (
        <li  >
    {/* dangerous sounds bad find replacement */}
          <span dangerouslySetInnerHTML={{__html: symbol}}/> {finalAmount}
          <Button onClick={() => handleRemove(currency.code)} size="small" >X</Button>
          </li>
    )
}

export default CurrencyOutput