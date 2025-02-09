import type { Activity } from './Activity.ts'


declare global {
	namespace bambloo {
		export const update: (activity: Activity) => void
		export const log: (data: any) => void
		export const onMessage: {
			__listeners__: ((msg: any) => void)[]
			addListener: (callback: (msg: any) => void) => void
			removeListener: (callback: (msg: any) => void) => void
		}

		export const repo: string
		export const path: string
		export const id: number
	}
}

export {}
