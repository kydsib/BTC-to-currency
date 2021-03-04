import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'

const BtcInput = ({ handleInput }) => {
	const [inputError, setInputError] = useState(false)
	const [errorMessage, SetErrorMessage] = useState('')

	let errorHelperText, isErrorPresent, inputTextStyling, labelText

	// Testing new implementation
	function handleInputError(event) {
		const regex = /^[0-9,.]*$/
		const value = event.target.value

		if (value.match(regex)) {
			const valueWithoutComma = value.replace(/,/g, '.')
			handleInput(valueWithoutComma)
			setInputError(false)
		} else if (!value.match(regex)) {
			setInputError(true)
			SetErrorMessage('Only numbers are allowed')
		}
	}

	// UI changes related to error
	if (inputError) {
		errorHelperText = errorMessage
		isErrorPresent = true
		inputTextStyling = 'standard-error-helper-text'
		labelText = 'Error'
	} else {
		errorHelperText = ''
		isErrorPresent = false
		inputTextStyling = 'standard-basic'
		labelText = 'Enter amount in BTC'
	}

	return (
		<TextField
			error={isErrorPresent}
			id={inputTextStyling}
			helperText={errorHelperText}
			label={labelText}
			variant="outlined"
			onChange={handleInputError}
			// onChange={handleInput}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Button
							disabled={inputError}
							type="submit"
							variant="contained"
							color="inherit"
						>
							<Search />
						</Button>
					</InputAdornment>
				),
			}}
			fullWidth={true}
		/>
	)
}

export default BtcInput
