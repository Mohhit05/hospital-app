import React from "react";

export default function Contact() {
  return (
    <>
      <section className="py-20 px-6 sm:px-12 md:px-20 bg-white" id="contact">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-green-700">
            <h2 className="text-3xl font-extrabold mb-6">Contact Us</h2>
            <p className="mb-6 max-w-lg text-green-900">
              Have questions or need assistance? Reach out to us and we will be
              happy to help.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center space-x-4">
                <i className="fas fa-map-marker-alt text-green-700 text-2xl"></i>
                <span>123 Health St, Wellness City, Country</span>
              </li>
              <li className="flex items-center space-x-4">
                <i className="fas fa-phone-alt text-green-700 text-2xl"></i>
                <a
                  className="underline hover:text-green-900"
                  href="tel:+12345678900"
                >
                  +1 234 567 8900
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <i className="fas fa-envelope text-green-700 text-2xl"></i>
                <a
                  className="underline hover:text-green-900"
                  href="mailto:info@novahospital.com"
                >
                  info@novahospital.com
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <i className="fas fa-clock text-green-700 text-2xl"></i>
                <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
          <div>
            <div style={{ width: "100%" }}>
              <iframe
                width="100%"
                height="600"
                frameBorder="1" 
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sri%20Aurobindo%20Marg,%20Ansari%20Nagar,%20Ansari%20Nagar%20East,%20New%20Delhi,%20Delhi%20110029+(All%20India%20Institute%20of%20Medical%20Sciences,%20New%20Delhi)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <a href="https://www.gps.ie/collections/personal-trackers/">
                  Personal GPS
                </a>
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
