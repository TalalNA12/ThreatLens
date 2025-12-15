import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-slate-950/90 backdrop-blur-md shadow-lg shadow-black/50 transition-all duration-300">
      
      {/* Decorative "Laser" line at the top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-80"></div>

      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        
        {/* Logo Section - Updated to use favicon.ico with a strong glow */}
        <Link href="/" className="relative flex items-center gap-2 group">
           <div className="relative transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/favicon.ico" // Switching to the new icon
              alt="ThreatLens Logo"
              width={64}  // Using standard icon dimensions for the prop
              height={64}
              // h-16 w-16 forces a nice big square. Added extra drop-shadow for visibility.
              className="h-16 w-16 object-contain brightness-110 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]" 
              priority
            />
           </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className='nav-link'>
            Dashboard
          </Link>
          <Link href="/assets" className='nav-link'>
            Assets
          </Link>
          <Link href="/findings" className='nav-link'>
            Findings
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar