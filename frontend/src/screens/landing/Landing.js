import HeroSection from "./components/HeroSection"
import HowToPlay from "./components/HowToPlay"
import Footer from "./components/Footer"
import "./Landing.css"

const Landing = () => {
    return <div className="landing">
        <HeroSection />
        <HowToPlay />
        <Footer />
    </div>
}

export default Landing