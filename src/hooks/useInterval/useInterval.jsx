import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
	const savedCallback = useRef()

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the interval.
	useEffect(() => {
		function updateTimer() {
			savedCallback.current()
		}
		if (delay !== null) {
			let id = setInterval(updateTimer, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}
