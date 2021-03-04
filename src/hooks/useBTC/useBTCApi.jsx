import { useState, useEffect } from 'react'

export default function useBTCApi(amount, updateTimer) {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [currencyValues, setCurrencyValues] = useState([])

	useEffect(() => {
		// resets values when new request is sent
		setCurrencyValues([])
	}, [amount])

	useEffect(() => {
		async function getCurrencyValues() {
			setIsLoading(true)
			setError(false)

			try {
				const response = await fetch(
					`https://api.coindesk.com/v1/bpi/currentprice.json`
				)

				if (response.status === 200) {
					let data = await response.json()
					let finalData = Object.values(data.bpi)

					setCurrencyValues([...finalData])
				}

				setIsLoading(false)
				return
			} catch (ex) {
				setError(true)
				console.log(ex.message)
			}
		}

		getCurrencyValues()
	}, [amount, updateTimer])

	return { currencyValues, error, isLoading }
}
