import type { Presence } from '../Presence.ts'


const update = (presence: Presence) => chrome.runtime.sendMessage({ target: 'background', type: 'presence', presence })
const log = (...data: any) => chrome.runtime.sendMessage({ target: 'background', type: 'log', data })

const presence: Presence = {
	assets: {
		large_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png'
	},
	timestamps: { start: Date.now() },
	buttons: [ {label: 'Search it too', url: window.location.href} ]
}

const get_topmost = async (query: string): Promise<Element | null> => {
	const eles = document.querySelectorAll(query)

	let topmost: Element | null = null
	let topmost_top: number = 0

	eles.forEach(ele => {
		const top = ele.getBoundingClientRect().top

		if (top <= 0)
			if (topmost ? top > topmost_top : true) {
				topmost = ele
				topmost_top = top
			}
	})

	return topmost
}

const fn = async () => {
	const title = document.querySelector('#firstHeading')?.textContent
	const subtitle = (await get_topmost('h2'))?.textContent

	presence.details = `Reading about ${title}`
	if (subtitle) presence.state = `inside ${subtitle}`

	update(presence)
}

let scrolling: number
fn()

window.addEventListener('scroll', () => {
	clearTimeout(scrolling)
	scrolling = setTimeout(fn, 1000)
})
