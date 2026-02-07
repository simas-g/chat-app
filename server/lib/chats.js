export const listChats = async (db) =>
  (await db.query("SELECT id, name FROM chats ORDER BY created_at DESC")).rows ?? []

export const getChat = async (db, id) => {
  const [chatRes, msgRes] = await Promise.all([
    db.query("SELECT id, name FROM chats WHERE id = $1", [id]),
    db.query("SELECT id, role, content FROM messages WHERE chat_id = $1 ORDER BY id ASC", [id]),
  ])
  const chat = chatRes.rows?.[0]
  if (!chat) return null
  return { ...chat, messages: msgRes.rows ?? [] }
}

export const createChat = async (db, message, getAnswer) => {
  const trimmed = message.trim()
  const name = trimmed.length > 30 ? trimmed.slice(0, 30) + "..." : trimmed
  const [chat] = (await db.query("INSERT INTO chats (name) VALUES ($1) RETURNING id, name", [name])).rows ?? []
  if (!chat) return null
  await db.query(
    "INSERT INTO messages (chat_id, role, content) VALUES ($1, $2, $3), ($4, $5, $6)",
    [chat.id, "user", trimmed, chat.id, "assistant", getAnswer()]
  )
  return getChat(db, chat.id)
}

export const addChatMessage = async (db, chatId, message, getAnswer) => {
  const trimmed = message.trim()
  const { rows } = await db.query("SELECT 1 FROM chats WHERE id = $1", [chatId])
  if (!rows?.length) return null
  await db.query(
    "INSERT INTO messages (chat_id, role, content) VALUES ($1, $2, $3), ($1, $4, $5)",
    [chatId, "user", trimmed, "assistant", getAnswer()]
  )
  const { rows: msgRows } = await db.query(
    "SELECT id, role, content FROM messages WHERE chat_id = $1 ORDER BY id DESC LIMIT 2",
    [chatId]
  )
  return (msgRows ?? []).reverse()
}
