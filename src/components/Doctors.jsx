import React from 'react'

export default function Doctors() {
  return (
    <>
      <section className="py-20 px-6 sm:px-12 md:px-20 bg-green-50" id="doctors">
   <div className="max-w-7xl mx-auto text-center mb-16">
    <h2 className="text-3xl font-extrabold text-green-700 mb-4">
     Meet Our Doctors
    </h2>
    <p className="text-green-900 max-w-2xl mx-auto">
     Our team of highly qualified and experienced medical professionals.
    </p>
   </div>
   <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Portrait of Dr. Anita Sharma, female general physician with a warm smile wearing a white coat and stethoscope" className="rounded-full mb-4 w-40 h-40 object-cover" height="160" src="https://storage.googleapis.com/a1aa/image/7d0c607b-f065-4387-96e4-50a1d07ae89b.jpg" width="160"/>
     <h3 className="text-xl font-semibold mb-1 text-green-700">
      Dr. Anita Sharma
     </h3>
     <p className="font-medium mb-2 text-green-700">
      General Physician
     </p>
     <p className="text-green-900 text-sm">
      Over 15 years of experience in family medicine and preventive care.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Portrait of Dr. Raj Kumar, male cardiologist with a confident smile wearing a white coat and glasses" className="rounded-full mb-4 w-40 h-40 object-cover" height="160" src="https://storage.googleapis.com/a1aa/image/08b45e11-8e87-4a52-3be5-7b0725ee04f9.jpg" width="160"/>
     <h3 className="text-xl font-semibold mb-1 text-green-700">
      Dr. Raj Kumar
     </h3>
     <p className="font-medium mb-2 text-green-700">
      Cardiologist
     </p>
     <p className="text-green-900 text-sm">
      Specialist in heart diseases with 20 years of clinical experience.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Portrait of Dr. Meera Patel, female pediatrician smiling wearing a white coat and colorful scarf" className="rounded-full mb-4 w-40 h-40 object-cover" height="160" src="https://storage.googleapis.com/a1aa/image/7a57383f-b259-40ab-ff8c-366c5685d3af.jpg" width="160"/>
     <h3 className="text-xl font-semibold mb-1 text-green-700">
      Dr. Meera Patel
     </h3>
     <p className="font-medium mb-2 text-green-700">
      Pediatrician
     </p>
     <p className="text-green-900 text-sm">
      Dedicated to child health and wellness with 12 years of experience.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Portrait of Dr. Suresh Nair, male orthopedic surgeon with a friendly smile wearing a white coat" className="rounded-full mb-4 w-40 h-40 object-cover" height="160" src="https://storage.googleapis.com/a1aa/image/760b926d-f97b-416c-7902-019ab60d7b36.jpg" width="160"/>
     <h3 className="text-xl font-semibold mb-1 text-green-700">
      Dr. Suresh Nair
     </h3>
     <p className="font-medium mb-2 text-green-700">
      Orthopedic Surgeon
     </p>
     <p className="text-green-900 text-sm">
      Expert in bone and joint surgery with 18 years of practice.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Portrait of Dr. Lina Fernandez, female dentist with a bright smile wearing a white coat and dental tools" className="rounded-full mb-4 w-40 h-40 object-cover" height="160" src="https://storage.googleapis.com/a1aa/image/68017632-965c-4abd-9eb1-99720cc880fd.jpg" width="160"/>
     <h3 className="text-xl font-semibold mb-1 text-green-700">
      Dr. Lina Fernandez
     </h3>
     <p className="font-medium mb-2 text-green-700">
      Dentist
     </p>
     <p className="text-green-900 text-sm">
      Skilled in cosmetic and restorative dentistry with 10 years of experience.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Portrait of Dr. Arjun Singh, male lab specialist wearing a white coat and glasses" className="rounded-full mb-4 w-40 h-40 object-cover" height="160" src="https://storage.googleapis.com/a1aa/image/242c30b1-3b1e-4c72-cf07-fb06c494db6d.jpg" width="160"/>
     <h3 className="text-xl font-semibold mb-1 text-green-700">
      Dr. Arjun Singh
     </h3>
     <p className="font-medium mb-2 text-green-700">
      Laboratory Specialist
     </p>
     <p className="text-green-900 text-sm">
      Ensuring accurate diagnostics with 14 years in medical laboratory science.
     </p>
    </div>
   </div>
  </section>
    </>
  )
}
