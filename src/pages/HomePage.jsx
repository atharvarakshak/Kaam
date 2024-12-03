import Body from "../components/Body"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import NewsSection from "../components/NewsSection"

const HomePage = () => {
  return (
   <>
     <Navbar />
     <HeroSection />
     <Body />
     <NewsSection />
     <Footer />
   </>
  )
}

export default HomePage