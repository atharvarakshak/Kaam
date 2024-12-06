import Body from "../components/Body"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import Chatbot from "../components/Chatbot"
import NewsSection from "../components/NewsSection"

const HomePage = () => {
  return (
   <>
     <HeroSection />
     <Body />
     <Chatbot/>
     <NewsSection />
     <Footer />
   </>
  )
}

export default HomePage