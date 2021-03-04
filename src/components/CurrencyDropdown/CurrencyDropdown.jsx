import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const CurrencyDropdown = ({ itemsToShow, handleAddCurrency }) => {
	const classes = useStyles()

	function handleChange(event) {
		const value = event.target.value
		const addValueFormList = itemsToShow.filter(
			(item) => item.code === value
		)
		const currencyToAdd = addValueFormList[0]

		handleAddCurrency(currencyToAdd)
	}

	// Error regarding Material-ui findDOMNode is deprecated in StrictMode.
	// related to Select options being rendered conditionaly

	return (
		<div className={classes.root}>
			<FormControl className={classes.formControl}>
				<InputLabel id="dropdown">Add currency</InputLabel>
				<Select value="" labelId="dropdown" onChange={handleChange}>
					{itemsToShow.map((item) => (
						<MenuItem key={item.rate} value={item.code}>
							{item.code}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}

export default CurrencyDropdown

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))
