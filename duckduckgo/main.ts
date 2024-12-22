import type { Activity } from '../Activity.ts'


declare const update: (presence: Activity) => void
declare const log: (data: any) => void


const presence: Activity = {
	assets: {
		large_image: 'https://duckduckgo.com/assets/logo_header_mobile.alt.v109.svg'
	},
	timestamps: { start: Date.now() },
	buttons: [ {label: 'Search it too', url: window.location.href} ]
}

window.addEventListener('message', e => {
	const data = (e as any).detail

	if (data.type !== 'start') return

	const params = new URLSearchParams(window.location.search)

	const state = () =>
		params.get('q')
			? `Searching for ${params.get('q')}`
			: 'In the home page'

	const details = () =>
		params.get('iaxm') === 'maps' ?
			'Looking for places in the map'
		: params.get('ia') && params.get('ia') !== 'web' ?
			`Looking for ${params.get('ia')}`
		: ''

	presence.state = state()
	presence.details = details()

	update(presence)
})
