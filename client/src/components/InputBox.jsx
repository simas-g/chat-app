import { Search } from 'lucide-react'
import { useChat } from '../context/ChatContext.jsx'

export default function InputBox() {
  const { search, setSearch, currentChat, addMessage, createChat } = useChat()
  const handleChange = (e) => setSearch(e.target.value)
  const handleSearch = async () => {
    const trimmed = search.trim()
    if (!trimmed) return
    try {
      if (currentChat) {
        await addMessage(currentChat.id, trimmed)
      } else {
        await createChat(trimmed)
      }
      setSearch('')
    } catch (err) {
      console.error(err)
    }
  }
  const submitOnEnter = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className='max-w-3xl mx-auto flex gap-2 flex-wrap justify-end'>
      <input
        type="text"
        value={search}
        placeholder='Enter your question'
        onChange={handleChange}
        onKeyDown={submitOnEnter}
        className='flex-1 px-4 py-3 rounded-full bg-gray-500 shadow-sm border text-white outline-none placeholder-gray-400'
      />
      <button
        onClick={handleSearch}
        className='px-4 py-3 cursor-pointer rounded-full bg-gray-500 shadow-sm border text-white transition-colors'
      >
        <Search size={20} />
      </button>
    </div>
  )
}