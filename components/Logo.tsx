'use client'
import Image from 'next/image'
export default function Logo() {
  return (
    <Image src={'/logo.png'} width={70} height={100} alt="logo" />
  ) 
}
