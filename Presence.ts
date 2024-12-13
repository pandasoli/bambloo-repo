
interface PresenceTimestamps {
	start?: number
	end?: number
}

interface PresenceAssets {
	large_image?: string
	large_text?:  string
	small_image?: string
	small_text?:  string
}

interface PresenceButton {
	label: string
	url:   string
}

export interface Presence {
	state?:      string
	details?:    string
	timestamps?: PresenceTimestamps
	assets?:     PresenceAssets
	buttons?:    PresenceButton[]
}
