import type { Activity } from './Activity.ts'


globalThis.bambloo = {
	repo: '<!-- repo -->',
	path: '<!-- path -->',
	id: Number('<!-- id -->'),

	update: (activity: Activity) =>
		chrome.runtime.sendMessage({
			id: Number('<!-- id -->'),
			type: 'activity',
			activity
		}),

	log: (data: any) =>
		chrome.runtime.sendMessage({
			id: Number('<!-- id -->'),
			type: 'log',
			data
		}),

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
