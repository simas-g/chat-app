import { useChat } from './context/ChatContext.jsx'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'

function App() {
  const { loading } = useChat()
  return (
    <section className='flex h-screen w-full relative'>
      <Sidebar />
      <Chat />
      {loading && (
        <div className='absolute inset-0 bg-black/70 flex items-center justify-center z-50'>
          <div className='text-white text-lg'>Loading...</div>
        </div>
      )}
    </section>
  )
}
export default App
