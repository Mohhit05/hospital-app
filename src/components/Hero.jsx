import React from 'react'

export default function Hero() {
  return (
    <>
       <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden" id="hero">
   {/* <!-- Background images carousel --> */}
   <div className="absolute inset-0">
    <img alt="Doctor consulting patient in a bright modern clinic room with medical equipment and natural light" className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-1000" height="700" id="slide-0" src="https://storage.googleapis.com/a1aa/image/be2535a9-97d4-4fad-699d-b83ea3637b50.jpg" width="1920"/>
    <img alt="Smiling female doctor with stethoscope in white coat in a bright clinic" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000" height="700" id="slide-1" src="https://storage.googleapis.com/a1aa/image/48de4986-85ef-4e56-9e80-b4d43efc3ad8.jpg" width="1920"/>
    <img alt="Close-up of hands holding a heart model symbolizing care and health" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000" height="700" id="slide-2" src="https://storage.googleapis.com/a1aa/image/d16977a9-1d74-4054-a8a3-fff698674927.jpg" width="1920"/>
   </div>
   {/* <!-- Overlay --> */}
   <div className="absolute inset-0 bg-green-900 bg-opacity-60"></div>
   {/* <!-- Content --> */}
   <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 text-center md:text-left">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-3xl mb-6 drop-shadow-lg">
     Your Health, Our Priority
    </h1>
    <p className="text-lg sm:text-xl text-green-200 max-w-2xl drop-shadow-md">
     Expert medical care with compassion and advanced technology. Experience personalized healthcare with Nova Hospital.
    </p>
   </div>
   {/* <!-- Carousel Controls --> */}
   <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
    <button aria-label="Slide 1" className="w-4 h-4 rounded-full bg-green-400 opacity-90 hover:opacity-100 transition" data-slide="0"></button>
    <button aria-label="Slide 2" className="w-4 h-4 rounded-full bg-green-400 opacity-50 hover:opacity-90 transition" data-slide="1"></button>
    <button aria-label="Slide 3" className="w-4 h-4 rounded-full bg-green-400 opacity-50 hover:opacity-90 transition" data-slide="2"></button>
   </div>
  </section>
    </>
  )
}
