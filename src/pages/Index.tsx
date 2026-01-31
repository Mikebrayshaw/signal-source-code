import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Agitation from "@/components/landing/Agitation";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import SampleOpportunity from "@/components/landing/SampleOpportunity";
import ValueStack from "@/components/landing/ValueStack";
import WhoIsFor from "@/components/landing/WhoIsFor";
import Guarantee from "@/components/landing/Guarantee";
import MidCTA from "@/components/landing/MidCTA";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import PS from "@/components/landing/PS";
import Footer from "@/components/landing/Footer";
import EmailPopup from "@/components/landing/EmailPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Agitation />
        <Solution />
        <HowItWorks />
        <SampleOpportunity />
        <ValueStack />
        <WhoIsFor />
        <Guarantee />
        <MidCTA />
        <FAQ />
        <FinalCTA />
        <PS />
      </main>
      <Footer />
      <EmailPopup />
    </div>
  );
};

export default Index;
