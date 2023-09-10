import { BanchoClient } from "bancho.js"
import { authorize } from "@/bot/auth"

const username = process.env.USERNAME
const password = process.env.IRC

if (!username || !password) {
	throw new Error("USERNAME or PASSWORD env is not provided")
}

export const client = new BanchoClient({ username, password })

try {
	await authorize(client)
	console.log("Connection established!")
} catch (err) {
	console.log(err)
}

client.on("PM", async (m) => {
	if (m.user.ircUsername == username) {
		return
	}
	console.log(m.message)
	await m.user.sendMessage("Привет. Я новый бот!")
})
