import Body from "../components/Body"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import Chatbot from "../components/Chatbot"
import NewsSection from "../components/NewsSection"
import AboutUs from "../components/AboutUs"

const HomePage = () => {
  return (
   <>
     <HeroSection />
     <Body />
     <Chatbot/>
     <NewsSection />

      <AboutUs />
     <Footer />
   </>
  )
}

export default HomePage