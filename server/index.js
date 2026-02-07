import express from "express"
import cors from "cors"
import "dotenv/config"
import { getDefaultAnswer } from "./lib/answers.js"
import { createDb } from "./lib/db.js"
import { addChatMessage, createChat, getChat, listChats } from "./lib/chats.js"

const app = express()
const PORT = process.env.PORT
let db

app.use(cors())
app.use(express.json())

const parseId = (s) => parseInt(s, 10)
const validId = (n) => Number.isInteger(n)
const getTrimmedMessage = (body) => String(body?.message ?? "").trim()

app.get("/health", (req, res) => res.json({ status: "OK" }))

app.get("/api/chats", async (req, res) => {
  try {
    res.json({ chats: await listChats(db) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

app.get("/api/chats/:id", async (req, res) => {
  const id = parseId(req.params.id)
  if (!validId(id)) return res.status(400).json({ error: "Invalid chat id" })
  try {
    const chat = await getChat(db, id)
    if (!chat) return res.status(404).json({ error: "Chat not found" })
    res.json({ chat })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/api/chats", async (req, res) => {
  const trimmed = getTrimmedMessage(req.body)
  if (!trimmed) return res.status(400).json({ error: "Message is required" })
  try {
    const chat = await createChat(db, trimmed, getDefaultAnswer)
    if (!chat) return res.status(500).json({ error: "Failed to create chat" })
    res.status(201).json({ chat })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/api/chats/:id/messages", async (req, res) => {
  const id = parseId(req.params.id)
  if (!validId(id)) return res.status(400).json({ error: "Invalid chat id" })
  const trimmed = getTrimmedMessage(req.body)
  if (!trimmed) return res.status(400).json({ error: "Message is required" })
  try {
    const messages = await addChatMessage(db, id, trimmed, getDefaultAnswer)
    if (!messages) return res.status(404).json({ error: "Chat not found" })
    res.status(201).json({ messages })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

const start = async () => {
  db = await createDb()
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}

start().catch((err) => {
  console.error("Failed to start:", err)
  process.exit(1)
})
