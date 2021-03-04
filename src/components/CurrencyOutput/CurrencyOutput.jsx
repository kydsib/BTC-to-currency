import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const CurrencyOutput = ({ currency, amount, handleRemove }) => {
	const classes = useStyles()
	const finalAmount = (currency.rate_float * amount).toLocaleString('en-US', {
		maximumFractionDigits: 2,
	})
	let symbol

	if (currency.code === 'EUR') {
		symbol = '€'
	} else if (currency.code === 'GBP') {
		symbol = '£'
	} else {
		symbol = '$'
	}

	return (
		<li className={classes.root}>
			<p className={classes.currency}>{`${symbol} ${finalAmount}`}</p>
			<Button onClick={() => handleRemove(currency.code)} size="small">
				X
			</Button>
		</li>
	)
}

export default CurrencyOutput

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
	currency: {
		fontSize: '1.5rem',
		minWidth: '10.5rem',
	},
}))
