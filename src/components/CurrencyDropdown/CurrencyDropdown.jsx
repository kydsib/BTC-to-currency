import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const CurrencyDropdown = ({ itemsToShow, handleAddCurrency }) => {
	const classes = useStyles()

	const dropdownItems = itemsToShow.map((item) => (
		<MenuItem key={item.rate} value={item.code}>
			{item.code}
		</MenuItem>
	))

	function handleChange(event) {
		const value = event.target.value

		const addValueFormList = itemsToShow.filter(
			(item) => item.code === value
		)
		const currencyToAdd = addValueFormList[0]

		handleAddCurrency(currencyToAdd)
	}

	return (
		<Fragment>
			<FormControl className={classes.formControl}>
				<InputLabel id="dropdown">Add currency</InputLabel>
				<Select
					labelId="dropdown"
					id="demo-simple-select"
					onChange={handleChange}
				>
					{dropdownItems}
				</Select>
			</FormControl>
		</Fragment>
	)
}

export default CurrencyDropdown

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}))
