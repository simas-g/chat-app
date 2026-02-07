import { useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext.jsx'
import InputBox from './InputBox.jsx'

export default function Messages() {
  const { currentChatMessages: messages, currentChat } = useChat()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <div className='w-full flex flex-col flex-1 overflow-y-auto px-4 py-6'>
      {messages.length === 0 && !currentChat && (
        <div className='flex flex-col items-center h-screen justify-center text-gray-400'>
          <h1 className='text-2xl font-bold mb-2'>Welcome to the chat</h1>
          <p>Select a chat or start a new conversation</p>
          <div className='mt-4 w-full max-w-3xl'>
            <InputBox />
          </div>
        </div>
      )}
      <div className='flex flex-col max-w-3xl w-full mx-auto gap-6'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex min-w-0 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`min-w-0 max-w-[85%] px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gray-500 rounded-2xl'
                  : ''
              }`}
            >
              <p className='text-white break-all'>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  )
}