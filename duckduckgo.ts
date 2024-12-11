import type { Presence } from '../models/Presence'


export const url = 'duckduckgo.com'

export const fn = async () => {
	const presence: Presence = {
		assets: {
			large_image: 'https://duckduckgo.com/assets/logo_header_mobile.alt.v109.svg'
		},
		timestamps: { start: Date.now() },
		buttons: [ {label: 'Search it too', url: window.location.href} ]
	}

	const update = (presence: Presence) => chrome.runtime.sendMessage({ target: 'background', type: 'presence', presence })
	const log = (...data: any) => chrome.runtime.sendMessage({ target: 'background', type: 'log', data })

	const params = new URLSearchParams(window.location.search)
	const paths = window.location.pathname
		.replace(/^\/|\/$/, '')
		.split('/')
		.filter(e => e)

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
}
