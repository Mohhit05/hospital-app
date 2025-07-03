import React from 'react'
import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import Doctors from '../components/Doctors'
import Contact from '../components/Contact'
import Feedback from '../components/Feedback'


export default function Home() {
  return (
    <>
      <Hero/>
      <AboutUs/>
      <Services/>
      <WhyChooseUs/>
      <Doctors/>
      <Feedback/>
      <Contact/>
    </>
  )
}
