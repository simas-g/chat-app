import { Search } from 'lucide-react'
function App() {
  return (
    <section>
      <div className='flex flex-col h-screen justify-center'>
        <div className='flex flex-col items-center justify-center p-4 rounded-md'>
          <h1 className='text-2xl font-bold'>Welcome to the chat app</h1>
        </div>
        <div className='flex flex-col items-center justify-center p-4 rounded-md'>
          <input type="text" placeholder='Enter your question' />
          <button className='text-white p-2 rounded-md'><Search /></button>
        </div>
      </div>      
    </section>
  )
}

export default App
