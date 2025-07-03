import React from 'react'

export default function WhyChooseUs() {
  return (
    <>
      <section className="py-20 px-6 sm:px-12 md:px-20">
   <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
    <div className="md:w-1/2">
     <img alt="A happy patient shaking hands with a doctor in a bright clinic room" className="rounded-lg shadow-lg w-full max-w-lg mx-auto md:mx-0" height="400" src="https://storage.googleapis.com/a1aa/image/75e3194a-206e-4396-a574-a5010b8a8cfe.jpg" width="600"/>
    </div>
    <div className="md:w-1/2 text-green-700">
     <h2 className="text-3xl font-extrabold mb-6">
      Why Choose Nova Hospital?
     </h2>
     <ul className="space-y-4 text-lg">
      <li className="flex items-start">
       <i className="fas fa-check-circle text-green-700 mt-1 mr-3"></i>
       <span>
        Experienced and compassionate medical professionals.
       </span>
      </li>
      <li className="flex items-start">
       <i className="fas fa-check-circle text-green-700 mt-1 mr-3"></i>
       <span>
        State-of-the-art medical technology and facilities.
       </span>
      </li>
      <li className="flex items-start">
       <i className="fas fa-check-circle text-green-700 mt-1 mr-3"></i>
       <span>
        Personalized treatment plans tailored to your needs.
       </span>
      </li>
      <li className="flex items-start">
       <i className="fas fa-check-circle text-green-700 mt-1 mr-3"></i>
       <span>
        Convenient online appointment booking system.
       </span>
      </li>
      <li className="flex items-start">
       <i className="fas fa-check-circle text-green-700 mt-1 mr-3"></i>
       <span>
        Friendly and supportive staff ensuring your comfort.
       </span>
      </li>
     </ul>
    </div>
   </div>
  </section>
    </>
  )
}
