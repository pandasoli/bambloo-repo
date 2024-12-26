import type { Activity } from './Activity.ts'


declare global {
	namespace bambloo {
		export const update: (activity: Activity) => void
		export const log: (data: any) => void
		export const onMessage: (callback: (msg: any) => any) => void

		export const repo: string
		export const path: string
	}
}
