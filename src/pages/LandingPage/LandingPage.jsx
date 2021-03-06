import React, { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

import useBTCApi from '../../hooks/useBTC/useBTCApi'
import useInterval from '../../hooks/useInterval/useInterval'
import CurrencyOutput from '../../components/CurrencyOutput/CurrencyOutput'
import CurrencyDropdown from '../../components/CurrencyDropdown/CurrencyDropdown'
import Spinner from '../../components/Spinner/Spinner'
import BtcInput from '../../components/BtcInput/BtcInput'

const LandingPage = () => {
	const [amount, setAmount] = useState(1)
	const [btcInput, SetBtcInput] = useState()
	const [removedCurrencyList, setRemovedCurrencyList] = useState([])
	const [apiDataLocalState, setApiDataLocalState] = useState()
	const [updateTimer, setUpdateTimer] = useState(0)

	const classes = useStyles()
	const { currencyValues, error, isLoading } = useBTCApi(amount, updateTimer)

	// API is called every 60s
	useInterval(() => {
		setUpdateTimer((prev) => prev + 1)
	}, 60000)

	// storing api data to local state
	useEffect(() => {
		setApiDataLocalState(currencyValues)
	}, [currencyValues])

	function handleCurrencyRemoval(currency) {
		let removedValue = currencyValues.filter(
			(item) => item.code === currency
		)
		let valueToStore = removedValue[0]
		setRemovedCurrencyList((prev) => [...prev, valueToStore])
		let newCurrencyLit = [...apiDataLocalState]
		let listWithRemovedValues = newCurrencyLit.filter(
			(item) => item.code !== currency
		)
		setApiDataLocalState(listWithRemovedValues)
	}

	function addRemovedCurrency(data) {
		const updateRemovedValues = [...removedCurrencyList]

		let updatedValues = updateRemovedValues.filter(
			(item) => item.code !== data.code
		)

		setRemovedCurrencyList(updatedValues)
		setApiDataLocalState((prev) => [...prev, data])
	}

	function handleSubmit(event) {
		event.preventDefault()
		setAmount(btcInput)
		event.target.reset()
	}

	function handleInput(inputValue) {
		SetBtcInput(inputValue)
	}

	return (
		<div>
			<form className={classes.formContainer} onSubmit={handleSubmit}>
				<BtcInput handleInput={handleInput} />
			</form>
			{isLoading ? (
				<Spinner />
			) : (
				<p className={classes.infoText}>
					Exchange rate for {amount} BTC
				</p>
			)}
			{error ? (
				<Alert className={classes.error} severity="warning">
					Something went wrong, check your internet connection or try
					latter.
				</Alert>
			) : null}

			<ul className={classes.ul}>
				{apiDataLocalState
					? apiDataLocalState.map((currency) => (
							<CurrencyOutput
								handleRemove={handleCurrencyRemoval}
								key={currency.code}
								currency={currency}
								amount={amount}
							/>
					  ))
					: null}
			</ul>
			{removedCurrencyList.length > 0 ? (
				<CurrencyDropdown
					handleAddCurrency={addRemovedCurrency}
					itemsToShow={removedCurrencyList}
				/>
			) : null}
		</div>
	)
}

export default LandingPage

const useStyles = makeStyles((theme) => ({
	formContainer: {
		margin: '0.75rem auto',
		width: '80vw',
		[theme.breakpoints.up('sm')]: {
			width: '50vw',
		},
	},
	error: {
		marginBottom: '0.75rem',
		justifyContent: 'center',
	},
	infoText: {
		paddingTop: '1rem',
		display: 'flex',
		justifyContent: 'center',
	},
	ul: {
		paddingTop: '2rem',
	},
}))
