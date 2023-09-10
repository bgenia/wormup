import { type BanchoClient } from "bancho.js"

let retries = 0

export async function authorize(client: BanchoClient) {
	try {
		await client.connect()
		if (client.isConnected()) return
		else {
			console.error("Connection is not established. Reconnecting...")
			await waitToReconnect(client)
		}
	} catch (err) {
		console.error("Connection error. Reconnecting...")
		await waitToReconnect(client)
	}
}

async function reconnect(client: BanchoClient) {
	if (client.isDisconnected()) {
		try {
			await client.connect()
			if (client.isConnected()) return
			else {
				console.error("Connection is not established. Reconnecting...")
				await waitToReconnect(client)
			}
		} catch (err) {
			console.error("Connection error. Reconnecting...")
			await waitToReconnect(client)
		}
	}
}

async function waitToReconnect(client: BanchoClient) {
	if (retries > 4) throw new Error("Number of reconnect attempts exceeded")
	retries++
	await new Promise((res) => {
		setTimeout(() => {
			res(null)
		}, 1000)
	})
	await reconnect(client)
}
