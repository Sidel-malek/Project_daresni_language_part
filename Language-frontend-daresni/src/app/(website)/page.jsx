import Footer from "./_components/Footer";
import IntroductionSection from "./_components/introducingpage/page";
import ServicesSection from "./_components/servicespage/page";
import NavBar from "./_components/NavBar";


export default function HomePage() {
 

  return (
    <div>
      <NavBar></NavBar>
      <IntroductionSection></IntroductionSection>
      <ServicesSection></ServicesSection>
    </div>
  );
}
