import type { Activity } from './Activity.ts'


globalThis.bambloo = {
	repo: '<!-- repo -->',
	path: '<!-- path -->',

	update: (activity: Activity) => chrome.runtime.sendMessage({ type: 'activity', activity }),
	log: (data: any) => chrome.runtime.sendMessage({ type: 'log', data }),

	onMessage: {
		__listeners__: [],

		addListener: function(callback: (data: any) => void) {
			const fn = (e: MessageEvent) =>
				callback((e as any).detail)

			addEventListener('message', fn)
			this.__listeners__.push(callback)
		},

		removeListener: function(callback: (data: any) => void) {
			const fn = this.__listeners__.find(e => e === callback)

			if (fn) {
				removeEventListener('message', fn)
				this.__listeners__ = this.__listeners__.filter(e => e !== callback)
			}
		}
	}
}
