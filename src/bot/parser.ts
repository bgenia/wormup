import {
	type ParseResult,
	type ComparisonFilter,
	type StatusFilter,
	COMPARSION_SIGNS,
	MAP_STATUSES,
} from "@/bot/types"

function isComparisonFilter(value: string): value is ComparisonFilter {
	return COMPARSION_SIGNS.includes(value as ComparisonFilter)
}
function isStatusFilter(value: string): value is StatusFilter {
	return MAP_STATUSES.includes(value as StatusFilter)
}

function processBpm(el: string, obj: ParseResult) {
	if (!el.includes("bpm")) return

	if (el.length == 3) return
	if (!isComparisonFilter(el[3])) return

	const value = el.slice(4)
	if (value && !isNaN(Number(value))) {
		obj.bpm = {
			equality: el[3],
			value: value,
		}
	} else return
}
function processLen(el: string, obj: ParseResult) {
	if (!el.includes("len")) return

	if (el.length == 3) return
	if (!isComparisonFilter(el[3])) return

	const value = el.slice(4)
	if (value && !isNaN(Number(value))) {
		obj.len = {
			equality: el[3],
			value: value,
		}
	} else return
}
function processMapper(el: string, obj: ParseResult) {
	if (!el.includes("mapper")) return

	if (el.length == 6) return
	if (el[6] != "=") return

	const value = el.slice(7)
	if (value) {
		obj.mapper = value
	} else return
}
function processStatus(el: string, obj: ParseResult) {
	if (!el.includes("status")) return

	if (el.length == 6) return
	if (el[6] != "=") return

	const value = el.slice(7)
	if (value && isStatusFilter(value)) {
		obj.status = value
	} else return
}

function processSpaced(el: string, obj: ParseResult) {
	if (!el.includes("spaced")) return

	if (el == "spaced") {
		obj.spaced = true
		return
	}

	if (el[6] == "=") {
		const value = el.slice(7)

		if (value) {
			if (value == "true") obj.spaced = true
			else if (value == "false") obj.spaced = false
			else return
		} else return
	}
}
function processLong(el: string, obj: ParseResult) {
	if (!el.includes("long")) return

	if (el == "long") {
		obj.long = true
		return
	}

	if (el[4] == "=") {
		const value = el.slice(5)

		if (value) {
			if (value == "true") obj.long = true
			else if (value == "false") obj.long = false
			else return
		} else return
	}
}

export function parse(message: string): ParseResult | null {
	const result: ParseResult = {}

	const initial = message.trim()
	const splitted = initial.split(" ")

	if (splitted[0] != "!r") return null
	if (splitted.length == 1) return result

	splitted.forEach((el, i) => {
		if (i == 0) return

		processBpm(el, result)
		processLen(el, result)
		processMapper(el, result)
		processStatus(el, result)
		processSpaced(el, result)
		processLong(el, result)
	})

	return result
}
