import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="flex justify-center text-center text-xs">
      <p>
        &copy;    Copyright {' '}
        <Link
          href="https://yit.edu.in/"
          target="_blank"
          className="font-bold"
        >
          YIT TECH TEAM
        </Link> {new Date().getFullYear()} All rights
        Reserved
      </p>
    </div>)
}

export default Footer