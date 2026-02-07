import Messages from './Messages.jsx'
import InputBox from './InputBox.jsx'
import { useChat } from '../context/ChatContext.jsx'

export default function Chat() {
  const { currentChat } = useChat()
  return (
    <div className='flex flex-col h-screen flex-1'>
      <Messages />
      {currentChat && (
        <div className='p-4 border-t border-gray-700'>
          <InputBox />
        </div>
      )}
    </div>
  )
}
