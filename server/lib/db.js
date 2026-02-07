import pg from "pg"

export const createDb = async () => {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL is required")
  const pool = new pg.Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: true },
  })
  await pool.query("CREATE TABLE IF NOT EXISTS chats (id SERIAL PRIMARY KEY, name TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW())")
  await pool.query("CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE, role TEXT NOT NULL, content TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW())")
  return pool
}
