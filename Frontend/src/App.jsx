import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [messages, setMessages] = useState('')
  useEffect(() => {
    async function getData() {
      const test = await fetch('http://localhost:3000/user/sign-up')
      const testJson = await test.json()
      console.log('Fetched Data: ', testJson, 'And: ', test)
      setMessages(testJson.message)
    }
    getData()
  }
    , [])
  return (
    <>
      <div>
        Hello There
        <p>{messages}</p>
      </div>
    </>
  )
}

export default App
