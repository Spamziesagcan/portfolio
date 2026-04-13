import { useCallback, useEffect, useState } from 'react'

function clamp01(value) {
	return Math.min(1, Math.max(0, value))
}

function useScrollProgress(scrollRef) {
	const [progress, setProgress] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		const container = scrollRef?.current
		if (!container) return undefined

		let rafId = 0

		const measure = () => {
			const maxScroll = container.scrollHeight - container.clientHeight
			if (maxScroll <= 0) {
				setProgress(0)
				return
			}

			const nextProgress = clamp01(container.scrollTop / maxScroll)
			setProgress(nextProgress)
		}

		const onScroll = () => {
			if (rafId) return
			rafId = window.requestAnimationFrame(() => {
				measure()
				rafId = 0
			})
		}

		measure()
		container.addEventListener('scroll', onScroll, { passive: true })

		return () => {
			container.removeEventListener('scroll', onScroll)
			if (rafId) window.cancelAnimationFrame(rafId)
		}
	}, [scrollRef])

	const togglePlay = useCallback(() => {
		setIsPlaying((previous) => !previous)
	}, [])

	return { progress, isPlaying, togglePlay }
}

export default useScrollProgress
