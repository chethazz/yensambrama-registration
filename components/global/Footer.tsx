import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="flex flex-col  justify-between text-center text-xs">


      {/* Footer */}
      <footer className='p-10'>
        <p>
          &copy; Copyright{' '}
          <Link href="https://yit.edu.in/" target="_blank" className="font-bold">
            YIT TECH TEAM
          </Link>{' '}
          {new Date().getFullYear()} All rights Reserved
        </p>
      </footer>
    </div>
  )
}

export default Footer