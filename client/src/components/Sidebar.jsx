import { X, Sidebar as SidebarIcon, MessagesSquare } from 'lucide-react'
import { useState } from 'react'
import { useChat } from '../context/ChatContext.jsx'

const ChatList = () => {
  const { chats, currentChat, setCurrentChat } = useChat()
  return (
    <div className='flex flex-col p-4 gap-4 text-sm'>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => setCurrentChat(chat)}
          className={`cursor-pointer text-white ${currentChat?.id === chat.id ? 'font-bold' : ''}`}
        >
          {chat.name}
        </div>
      ))}
    </div>
  )
}

const Header = ({ onClose, onNewChat }) => (
  <div className='flex p-4 justify-end items-end flex-col'>
    <button onClick={onClose} className='cursor-pointer'><X className='text-white' /></button>
    <div onClick={onNewChat} className='flex gap-2 cursor-pointer hover:text-gray-400 mt-4 items-center text-white text-sm w-full'>
      <MessagesSquare size={18} />
      <span>New chat</span>
    </div>
  </div>
)

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const { setCurrentChat } = useChat()
  const base = 'flex flex-col h-screen bg-black border-r border-gray-700'
  const expandedWidth = 'w-64'
  const width = isOpen ? `w-12 sm:${expandedWidth}` : 'w-12'

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <div className={`${base} ${width} transition-all duration-300`}>
        <div className='hidden sm:flex flex-1 overflow-hidden flex-col relative'>
          <button
            onClick={() => setIsOpen(true)}
            className={`flex p-4 cursor-pointer transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}
          >
            <SidebarIcon className='text-white' size={20} />
          </button>
          <div className={`flex-1 flex flex-col min-w-64 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <Header onClose={() => setIsOpen(false)} onNewChat={() => setCurrentChat(null)} />
            <div className='flex-1 overflow-y-auto'><ChatList /></div>
          </div>
        </div>
        <div className='sm:hidden flex-1 flex'>
          <button onClick={() => setIsOpen(true)} className='flex p-4 cursor-pointer h-full'>
            <SidebarIcon className='text-white' size={20} />
          </button>
        </div>
        <div className={`sm:hidden fixed left-0 top-0 h-full overflow-hidden bg-black border-r border-gray-700 z-50 flex transition-all duration-300 ${isOpen ? expandedWidth : 'w-0'}`}>
          <div className={`min-w-64 w-64 flex flex-col flex-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <Header onClose={() => setIsOpen(false)} onNewChat={() => setCurrentChat(null)} />
            <div className='flex-1 overflow-y-auto'><ChatList /></div>
          </div>
        </div>
      </div>
    </>
  )
}
