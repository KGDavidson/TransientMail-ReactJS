import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MAIL_TM_BASE_URL } from '../constants';
import { Message, User } from '../types';
import {HiOutlineMail, HiOutlineClipboardCheck} from 'react-icons/hi'
import {BiExit} from 'react-icons/bi'
import { useQuery } from 'react-query';

type Props = {
  user?: User
  messageId?: string
  setMessageId: React.Dispatch<React.SetStateAction<string | undefined>>
  setHasMounted: React.Dispatch<React.SetStateAction<boolean>>
}


const Inbox = (props: Props) => {
  const {
    user,
    messageId,
    setMessageId,
    setHasMounted,
  } = props;

  const [clicked, setClicked ] = useState(false)

  const { isLoading: messagesIsLoading, error: messagesError, data: messages } = useQuery(['messages', user], async (): Promise<Message[]> => {
    if (!user) {
      setMessageId(undefined)
      return [] as  Message[]
    }

    const {
      data: {
        ["hydra:member"]: messages
      }
    } = await axios.get(
      `${MAIL_TM_BASE_URL}/messages`, 
      {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      }
    )

    if (!(messages as Message[]).find((message) => message.id === messageId)) setMessageId(undefined)

    return messages as Message[]
  })

  return (
    <div className='h-screen font-semibold text-base bg-[#f3f5f9] text-[#87898e] w-7/12 flex flex-col'>
      <div className='h-topbar shrink-0 px-4 flex items-center justify-between shadow z-20'>
        <button
          className='flex items-center bg-transparent hover:text-[#aeb1b8] transition-all cursor-pointer border-none'
          onClick={() => {
            if (user) navigator.clipboard.writeText(user.address)
            setClicked(true)
            setTimeout(() => {
              setClicked(false)
            }, 700)
          }}
        >
          <div className='relative'>
            <HiOutlineMail className={`mr-1 ${clicked ? 'opacity-0' : 'opacity-100'}`} />
            <HiOutlineClipboardCheck className={`mr-1 absolute top-0 left-0 transition-all ${clicked ? 'opacity-100 animate-[ping_1s_ease-in-out]' : 'opacity-0'}`} />
          </div>
          <h3>{user && user.address}</h3>
        </button>
        <BiExit 
          className='text-2xl hover:text-[#aeb1b8] transition-all'
          onClick={() => {
            axios.delete(`${MAIL_TM_BASE_URL}/accounts/${user?.id}`, {
              headers: {
                "Authorization": `Bearer ${user?.token}`
              }
            })
            localStorage.removeItem('user')
            setHasMounted(false)
            setMessageId(undefined)
          }}
        />
      </div>
      <ul className='flex flex-col-reverse overflow-y-scroll'>
        {messages && messages.slice().reverse().map(({
          id,
          from: {
            name: fromName
          },
          createdAt,
          subject,
          intro,
        }) => (
          <li 
            key={id} 
            className='shadow-sm p-8 flex transition-all bg-[#f3f5f9] hover:bg-[#eceef2] z-10 relative'
            onClick={() => setMessageId(id)}
          >
            <div className='mr-4 w-10 h-10 shrink-0 rounded-full bg-[#f2e6ef] text-[#e84b8a] text-lg font-black flex items-center justify-center'>{fromName.slice(0, 1)}</div>
            <div className='grow'>
              <div className='flex justify-between w-full items-center'>
                <p className='font-bold text-xl'>{fromName}</p>
                <p className='text-sm'>{new Date(createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
              </div>
              <p className='line-clamp-1'>{subject || 'No Subject'}</p>
              <p className='text-[#aeb1b8] text-sm line-clamp-2 h-10'>
                {intro}
              </p>
            </div>
            <div className={`absolute top-0 w-1 right-0 bg-[#e84b8a] transition-all ${id === messageId ? 'opacity-1 bottom-0' : 'opacity-0 bottom-full'}`} />
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Inbox;
