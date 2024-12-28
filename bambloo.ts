import type { Activity } from './Activity.ts'


namespace bambloo {
	export const update = (activity: Activity) => chrome.runtime.sendMessage({ type: 'activity', activity })
	export const log = (data: any) => chrome.runtime.sendMessage({ type: 'log', data })

	export const onMessage = {
		listeners: [] as ((data: any) => any)[],

		addListener: function(callback: (data: any) => void) {
			const fn = (e: MessageEvent) =>
				callback((e as any).detail)

			addEventListener('message', fn)
			this.listeners.push(callback)
		},

		removeListener: function(callback: (data: any) => void) {
			const fn = this.listeners.find(e => e === callback)

			if (fn) {
				removeEventListener('message', fn)
				this.listeners = this.listeners.filter(e => e !== callback)
			}
		}
	}
}
