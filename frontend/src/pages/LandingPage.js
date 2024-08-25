
import Landing from "../components/LandingSection/Landing";
import HowItWorks from "../components/LandingSection/HowItWorks";
import Features from "../components/LandingSection/Features";
import Testimonials from "../components/LandingSection/Testmonials";
import Footer from "../components/Footer";
import bg from "../media/bg/Frame 1000001375.png"
export default function Home() {
    return (
      <div>
         <div class="bg-[#D3D4FF] min-h-screen relative overflow-hidden p-4">
        <Landing/>
        <div class="absolute bottom-0 right-0 ">
            <img src={bg} alt="Backgroud" srcset="" />
          </div>
          
        </div>
        <HowItWorks/>
        <Features/>
        <Testimonials/>
        <Footer/>
        </div>
    );
  }