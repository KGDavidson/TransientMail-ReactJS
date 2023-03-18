import axios from 'axios';
import React from 'react';
import { BiExit } from 'react-icons/bi';
import { HiOutlineClipboardCheck, HiOutlineMail } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { MAIL_TM_BASE_URL } from '../constants';
import { FullMessage, User } from '../types';
import Topbar from './preview/topbar';

type Props = {
  user?: User,
  messageId?: string;
}

const Preview = (props: Props) => {
  const {
    user,
    messageId
  } = props;

  console.log(user)
  console.log(messageId)

  const { isLoading: messageIsLoading, error: messageError, data: message } = useQuery(['message', messageId, user], async (): Promise<FullMessage | undefined> => {
    if (!messageId || !user) return

    const { data: message } = await axios.get(
      `${MAIL_TM_BASE_URL}/messages/${messageId}`, 
      {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      }
    )

    return message as FullMessage
  })

  return (
    <div className='h-screen font-semibold text-base bg-white w-full flex flex-col'>
      <Topbar
        user={user}
        messageId={messageId}
        isLoading={messageIsLoading}
        message={message} 
      />
      {!messageId && (
        <div className='flex-grow flex items-center justify-center'>
          <p className='text-2xl text-[#87898e]'>
            Select a message to preview
          </p>
        </div>
      )}
      {message && (
        <iframe 
        className='w-full grow'
        srcDoc={`<div
            style="padding:2rem;"
          >
            ${message.html.join(" ")}
          </div>
        `}
        />
      )}
    </div>
  );
};

export default Preview;
