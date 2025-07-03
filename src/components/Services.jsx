import React from 'react'

export default function Services() {
  return (
    <>
      <section className="py-20 px-6 sm:px-12 md:px-20 bg-green-50" id="services">
   <div className="max-w-7xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-extrabold text-green-700 mb-4">
     Our Services
    </h2>
    <p className="text-green-900 max-w-2xl mx-auto">
     Comprehensive healthcare services tailored to your needs.
    </p>
   </div>
   <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Icon representing general consultation with a stethoscope and clipboard in green" className="mb-4" height="96" src="/img/service1.jpg" width="96"/>
     <h3 className="text-xl font-semibold mb-2 text-green-700">
      General Consultation
     </h3>
     <p className="text-green-900">
      Expert advice and diagnosis for a wide range of health concerns.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Icon representing pediatrics with a child and a heart symbol in green" className="mb-4" height="96" src="/img/service2.jpg" width="96"/>
     <h3 className="text-xl font-semibold mb-2 text-green-700">
      Pediatrics
     </h3>
     <p className="text-green-900">
      Specialized care for infants, children, and adolescents.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Icon representing cardiology with a heart and heartbeat line in green" className="mb-4" height="96" src="/img/service3.jpg" width="96"/>
     <h3 className="text-xl font-semibold mb-2 text-green-700">
      Cardiology
     </h3>
     <p className="text-green-900">
      Advanced heart care and treatment from experienced cardiologists.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Icon representing dentistry with a tooth and dental tools in green" className="mb-4" height="96" src="/img/service4.jpg" width="96"/>
     <h3 className="text-xl font-semibold mb-2 text-green-700">
      Dentistry
     </h3>
     <p className="text-green-900">
      Comprehensive dental care including cleaning, whitening, and surgery.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Icon representing orthopedics with a bone and joint symbol in green" className="mb-4 rounded-full" height="96" src="/img/service5.jpg" width="96"/>
     <h3 className="text-xl font-semibold mb-2 text-green-700">
      Orthopedics
     </h3>
     <p className="text-green-900">
      Treatment for bone, joint, and muscle disorders and injuries.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Icon representing laboratory services with test tubes and microscope in green" className="mb-4" height="96" src="/img/service6.jpg" width="96"/>
     <h3 className="text-xl font-semibold mb-2 text-green-700">
      Laboratory Services
     </h3>
     <p className="text-green-900">
      Accurate and timely diagnostic testing for better health outcomes.
     </p>
    </div>
   </div>
  </section>
    </>
  )
}
