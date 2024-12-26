import type { Activity } from '@/Activity.ts'


const rawFile = `https://raw.githubusercontent.com/${bambloo.repo}/refs/heads/master/${bambloo.path}`

const presence: Activity = {
	assets: {
		large_image: `${rawFile}/discord-icon.png`
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
	else presence.state = 'It seems pretty interesting...'

	bambloo.update(presence)
}

let scrolling: number

const loop = () => {
	clearTimeout(scrolling)
	scrolling = setTimeout(fn, 1000)
}

bambloo.onMessage(msg => {
	switch (msg.type) {
		case 'stop':
			clearTimeout(scrolling)
			window.removeEventListener('scroll', loop)
			break

		case 'start':
			fn()
			window.addEventListener('scroll', loop)
		}
})
