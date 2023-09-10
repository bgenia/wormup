const COMPARSION_SIGNS = [">", "<", "="] as const
const MAP_STATUSES = ["ranked", "loved", "unranked", "approved", "wip"] as const

type ComparisonFilter = (typeof COMPARSION_SIGNS)[number]
type StatusFilter = (typeof MAP_STATUSES)[number]

type NumberFilter = {
	comparison: ComparisonFilter
	value: string
}
type ParseResult = {
	bpm: NumberFilter[]
	len: NumberFilter[]
	mapper?: string
	status?: StatusFilter
	spaced?: boolean
	long?: boolean
}

export {
	ComparisonFilter,
	NumberFilter,
	StatusFilter,
	ParseResult,
	COMPARSION_SIGNS,
	MAP_STATUSES,
}
