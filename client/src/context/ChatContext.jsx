import { createContext, useContext, useState, useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL
const ChatContext = createContext(null)


export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/chats`, {
          headers: { "Content-Type": "application/json" },
        })
        if (!res.ok) throw new Error("Failed to load chats")
        const data = await res.json()
        setChats(data.chats ?? [])
      } catch (err) {
        console.error(err)
        setChats([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const fetchChat = async (id) => {
    const res = await fetch(`${API_URL}/api/chats/${id}`, {
      headers: { "Content-Type": "application/json" },
    })
    if (!res.ok) throw new Error("Failed to load chat")
    const data = await res.json()
    return data.chat
  }

  const selectChat = async (chat) => {
    if (!chat?.id) {
      setCurrentChat(null)
      return
    }
    if (currentChat?.id === chat.id && currentChat?.messages) return
    setLoading(true)
    try {
      const full = await fetchChat(chat.id)
      setCurrentChat(full)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createChat = async (content) => {
    const trimmed = content?.trim()
    if (!trimmed) return
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })
      if (!res.ok) throw new Error("Failed to create chat")
      const data = await res.json()
      const chat = data.chat
      setChats((prev) => [chat, ...prev])
      setCurrentChat(chat)
    } finally {
      setLoading(false)
    }
  }

  const addMessage = async (chatId, content) => {
    const trimmed = content?.trim()
    if (!trimmed) return
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/chats/${chatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })
      if (!res.ok) throw new Error("Failed to send message")
      const data = await res.json()
      const newMessages = Array.isArray(data?.messages) ? data.messages : []
      setCurrentChat((prev) => {
        if (!prev || prev.id !== chatId) return prev
        return { ...prev, messages: [...(prev.messages ?? []), ...newMessages] }
      })
    } finally {
      setLoading(false)
    }
  }

  const currentChatMessages = currentChat?.messages ?? []

  const value = {
    chats,
    loading,
    currentChat,
    setCurrentChat: selectChat,
    search,
    setSearch,
    addMessage,
    createChat,
    currentChatMessages,
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
