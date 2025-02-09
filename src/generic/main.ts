import type { Activity } from '@/Activity.ts'


const getFaviconUrl = () => {
  const linkElements = Array.from(
		document.head.querySelectorAll<HTMLLinkElement>("link[rel*='icon']")
	)

  for (const link of linkElements)
    if (link.href) return link.href

  return `${window.location.origin}/favicon.ico`
}

const getPageDescription = () => {
  const metaDescription = document.querySelector<HTMLMetaElement>("meta[name='description']")
  return metaDescription ? metaDescription.content : null
}


const presence: Activity = {
	timestamps: { start: Date.now() }
}

bambloo.onMessage.addListener(msg => {
	if (msg.type !== 'start') return

	presence.assets = {
		large_image: getFaviconUrl()
	}
	presence.details = document.title
	presence.state = getPageDescription() || `Browsing at ${window.location.origin}`

	bambloo.update(presence)
})
