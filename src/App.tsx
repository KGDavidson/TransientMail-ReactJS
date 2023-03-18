import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Inbox from './components/inbox'
import Navbar from './components/navbar'
import Preview from './components/preview'
import { MAIL_TM_BASE_URL } from './constants'
import { User } from './types'


function App() {

  const [user, setUser] = useState<User>()
  const [messageId, setMessageId] = useState<string>()
  const [hasMounted, setHasMounted ] = useState(false)

  useEffect(() => {
    const didMount = async () => {
      const newUser = JSON.parse(localStorage.getItem('user') || 'false')

      setUser(newUser)
  
      if (newUser) return
  
      const domains = await axios.get(`${MAIL_TM_BASE_URL}/domains`)
      const domain = domains.data["hydra:member"][0].domain
  
      const id = (Math.random() + 1).toString(36).substring(7);
      const password = (Math.random() + 1).toString(36).substring(2);
  
      await axios.post(
        `${MAIL_TM_BASE_URL}/accounts`, 
        {
          "address": `transience_${id}@${domain}`,
          "password": password
        }
      )
  
      const idToken = await axios.post(
        `${MAIL_TM_BASE_URL}/token`, 
        {
          "address": `transience_${id}@${domain}`,
          "password": password
        }
      )
  
      localStorage.setItem('user', JSON.stringify({
        ...idToken.data,
        address: `transience_${id}@${domain}`,
        password,
      }))

      setUser({
        ...idToken.data,
        address: `transience_${id}@${domain}`,
        password,
      })
    }
    
    if (hasMounted) return

    didMount()
    setHasMounted(true)

  }, [hasMounted])

  return (
      <div className='flex'>
        <Navbar/>
        <main className='flex w-full'>
          <Inbox 
            user={user}
            messageId={messageId}
            setMessageId={setMessageId}
            setHasMounted={setHasMounted}
          />
          <Preview
            user={user}
            messageId={messageId}
          />
        </main>
      </div>
  )
}

export default App
