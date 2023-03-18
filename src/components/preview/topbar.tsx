import axios from 'axios';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { MAIL_TM_BASE_URL } from '../../constants';
import { queryClient } from '../../main';
import { FullMessage, User } from '../../types';

type Props = {
  user?: User
  messageId?: string
  isLoading: boolean
  message?: FullMessage
}

const Topbar = (props: Props) => {
  const {
    user,
    messageId,
    isLoading,
    message 
  } = props;

  if (!messageId) return null

  const deleteMessage = async () => {
    if (!messageId || !user) return

    await axios.delete(
      `${MAIL_TM_BASE_URL}/messages/${messageId}`,
      {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      }
    )
    queryClient.invalidateQueries({ queryKey: ['messages'] })
  }
  
  const receivedDate = message ? new Date(message?.createdAt) : undefined

  return (
    <div className={`h-topbar px-8 flex items-center justify-between ${isLoading && 'animate-pulse'}`}>
      <div 
        className='flex transition-all text-[#817f83]'
      >
        <div className='mr-4 w-10 h-10 shrink-0 rounded-full bg-[#f2e6ef] text-[#e84b8a] text-lg font-black flex items-center justify-center'>{message ? message?.from.name.slice(0, 1) : '...'}</div>
        <div className='grow'>
          <div className='flex justify-center gap-2 items-center'>
            <p className='font-bold text-lg text-[#555459]'>{message ? message?.from.name : '...'}</p>
            <p className='text-sm font-mono'>{`<${message ? message?.from.address.toLowerCase() : '...'}>`}</p>
          </div>
          <p className='text-sm'>{
            receivedDate 
            ? (
              `${
                receivedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
              } at ${
                receivedDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
              }`
            ) : '...'
          }</p>
        </div>
      </div>
      <BiTrash 
        className='text-2xl transition-all text-[#817f83] hover:text-[#555459]'
        onClick={deleteMessage}
      />
    </div>
  );
};

export default Topbar;
