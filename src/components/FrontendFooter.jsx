import React from 'react'

export default function FrontendFooter() {
  return (
    <>
      {/* <!-- Footer --> */}
  <footer className="bg-green-700 text-white py-10 px-6 sm:px-12 md:px-20">
   <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
    <div className="flex items-center space-x-3">
     <img alt="Nova Hospital logo icon in white" className="h-10 w-10" height="40" src="https://storage.googleapis.com/a1aa/image/156a95bb-fd98-438e-c376-65707ca861a3.jpg" width="40"/>
     <span className="font-bold text-xl">
      Nova Hospital
     </span>
    </div>
    <p className="text-sm">
     © 2025 Nova Hospital. All rights reserved.
    </p>
    <div className="flex space-x-6 text-white">
     <a aria-label="Facebook" className="hover:text-green-300 transition" href="#">
      <i className="fab fa-facebook-f fa-lg"></i>
     </a>
     <a aria-label="Twitter" className="hover:text-green-300 transition" href="#">
      <i className="fab fa-twitter fa-lg"></i>
     </a>
     <a aria-label="Instagram" className="hover:text-green-300 transition" href="#">
      <i className="fab fa-instagram fa-lg"></i>
     </a>
     <a aria-label="LinkedIn" className="hover:text-green-300 transition" href="#">
      <i className="fab fa-linkedin-in fa-lg"></i>
     </a>
    </div>
   </div>
  </footer>
    </>
  )
}
