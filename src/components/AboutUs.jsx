import React from 'react'

export default function AboutUs() {
  return (
    <>
      <section className="py-20 px-6 sm:px-12 md:px-20 bg-green-50" id="about">
   <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
    <div className="md:w-1/2">
     <img alt="Interior of Nova Hospital showing modern medical equipment and a welcoming reception area" className="rounded-lg shadow-lg w-full max-w-lg mx-auto md:mx-0" height="400" src="https://storage.googleapis.com/a1aa/image/dadba1a8-440a-4b1a-d46a-428995da9ccb.jpg" width="600"/>
    </div>
    <div className="md:w-1/2 text-green-700">
     <h2 className="text-3xl font-extrabold mb-6">
      About Nova Hospital
     </h2>
     <p className="mb-6 text-lg text-green-900 leading-relaxed">
      Nova Hospital is dedicated to providing exceptional healthcare services with a focus on compassion, innovation, and patient-centered care. Our team of experienced medical professionals is committed to improving your health and well-being through personalized treatment plans and state-of-the-art technology.
     </p>
     <p className="mb-6 text-green-900 text-lg leading-relaxed">
      Since our founding, we have strived to create a welcoming and supportive environment where patients feel valued and cared for. From general consultations to specialized treatments, Nova Hospital is your trusted partner in health.
     </p>
     <ul className="list-disc list-inside space-y-3 text-green-900 text-lg">
      <li>Experienced and compassionate medical staff</li>
      <li>Advanced diagnostic and treatment technology</li>
      <li>Comprehensive range of healthcare services</li>
      <li>Patient-focused approach ensuring comfort and trust</li>
      <li>Convenient location and flexible appointment scheduling</li>
     </ul>
    </div>
   </div>
  </section>
    </>
  )
}
