import React from 'react'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Search from '@material-ui/icons/Search'

const BtcInput = ({ inputError, errorMessage, handleInput }) => {
	let errorHelperText, isErrorPresent, inputTextStyling, labelText

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
			onChange={handleInput}
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
