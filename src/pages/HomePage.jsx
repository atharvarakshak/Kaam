import Body from "../components/Body"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import Chatbot from "../components/Chatbot"

const HomePage = () => {
  return (
   <>
     <Navbar />
     <HeroSection />
     <Body />
     <Chatbot/>
     <Footer />
   </>
  )
}

export default HomePage