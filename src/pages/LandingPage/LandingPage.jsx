import React, { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

import useBTCApi from '../../hooks/useBTC/useBTCApi'
import CurrencyOutput from '../../components/CurrencyOutput/CurrencyOutput'
import CurrencyDropdown from '../../components/CurrencyDropdown/CurrencyDropdown'
import Spinner from '../../components/Spinner/Spinner'
import BtcInput from '../../components/BtcInput/BtcInput'

const LandingPage = () => {
	const [amount, setAmount] = useState(1.33)
	const [btcInput, SetBtcInput] = useState()
	const [errorMessage, SetErrorMessage] = useState('')
	const [inputError, setInputError] = useState(false)
	const [removedCurrencyList, setRemovedCurrencyList] = useState([])
	const [dataFromApi, setDataFromApi] = useState()

	const { currencyValues, error, isLoading } = useBTCApi(amount)

	const classes = useStyles()

	useEffect(() => {
		setDataFromApi(currencyValues)
	}, [currencyValues])

	function handleCurrencyRemoval(currency) {
		let removedValue = currencyValues.filter(
			(item) => item.code === currency
		)
		let valueToStore = removedValue[0]
		setRemovedCurrencyList((prev) => [...prev, valueToStore])
		let newCurrencyLit = [...dataFromApi]
		let listWithRemovedValues = newCurrencyLit.filter(
			(item) => item.code !== currency
		)
		setDataFromApi(listWithRemovedValues)
	}

	function addRemovedCurrency(data) {
		const updateRemovedValues = [...removedCurrencyList]

		let updatedValues = updateRemovedValues.filter(
			(item) => item.code !== data.code
		)

		setRemovedCurrencyList(updatedValues)
		setDataFromApi((prev) => [...prev, data])
	}

	// ar man cia reikia dvieju stepu ar tai ok input handlinimas reacte
	function handleSubmit(event) {
		event.preventDefault()
		setAmount(btcInput)
	}

	function handleInputError(event) {
		const regex = /^[0-9,.]*$/
		const value = event.target.value

		if (value.match(regex)) {
			const valueWithoutComma = value.replace(/,/g, '.')
			SetBtcInput(valueWithoutComma)
			setInputError(false)
		} else if (!value.match(regex)) {
			setInputError(true)
			SetErrorMessage('Only numbers are allowed')
		}
	}

	return (
		<div>
			<form className={classes.formContainer} onSubmit={handleSubmit}>
				<BtcInput
					inputError={inputError}
					errorMessage={errorMessage}
					handleInput={handleInputError}
				/>
			</form>
			{isLoading ? <Spinner /> : null}
			{error ? (
				<Alert className={classes.error} severity="warning">
					Something went wrong, check your internet connection or try
					latter.
				</Alert>
			) : null}
			<ul>
				{dataFromApi
					? dataFromApi.map((currency) => (
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
}))
