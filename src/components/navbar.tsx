import React, { useEffect, useState } from 'react';

type Props = {

}

const Navbar = (props: Props) => {
  const {} = props;
  const [expanded, setExpanded ] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setExpanded(false)
    }, 500)
  }, [])


  return (
    <>
      <div 
        className='px-6 opacity-0'
      >
        <p className='text-3xl font-black flex'>
          T
          <span className='flex'>M</span>
        </p>
      </div>
      <aside 
        className={`p-6 h-full fixed z-50 bg-white flex flex-col items-stretch justify-between ${expanded ? 'shadow-lg' : 'shadow-none'}`}
        onPointerEnter={() => setExpanded(true)}
        onPointerLeave={() => setExpanded(false)}
      >
        <a href='/'>
          <h1 className='text-3xl text-[#242424] font-black items-center flex'>
            T
            <span className={`overflow-hidden transition-all inline-block w-0 ${expanded ? 'w-32' : 'w-0'}`}>ransient</span>
            <span className='text-[#e84b8a] items-center flex'>
              M
              <span className={`overflow-hidden transition-all inline-block w-0 ${expanded ? 'w-10' : 'w-0'}`}>ail</span>
            </span>
          </h1>
        </a>

        <div className={`flex flex-col gap-2 overflow-hidden transition-all ${expanded ? 'w-56' : 'w-0'}`}>
          <a className='py-1 px-2 hover:bg-[#eceef2] text-[#242424] hover:text-[#e84b8a] rounded whitespace-nowrap' href='https://docs.mail.tm/'>API</a>
          <a className='py-1 px-2 hover:bg-[#eceef2] text-[#242424] hover:text-[#e84b8a] rounded whitespace-nowrap' href='https://mail.tm/en/faq/'>FAQ</a>
          <a className='py-1 px-2 hover:bg-[#eceef2] text-[#242424] hover:text-[#e84b8a] rounded whitespace-nowrap' href='https://mail.tm/en/privacy/'>Privacy</a>
          <a className='py-1 px-2 hover:bg-[#eceef2] text-[#242424] hover:text-[#e84b8a] rounded whitespace-nowrap' href='https://mail.tm/en/feedback/'>Feedback</a>
          <a className='py-1 px-2 hover:bg-[#eceef2] text-[#242424] hover:text-[#e84b8a] rounded whitespace-nowrap' href='https://mail.tm/en/contact/'>Contact Us</a>
        </div> 
      </aside>
    </>
  );
};

export default Navbar;
