import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Layout
import Layout from './layouts/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import AboutCompany from './pages/AboutCompany';
import AboutFounder from './pages/AboutFounder';
import AboutPartners from './pages/AboutPartners';
import Services from './pages/Services';
import AIConsulting from './pages/AIConsulting';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import BookNow from './pages/BookNow';
import IntakeForms from './pages/IntakeForms';
import NotFound from './pages/NotFound';
import FAQ from './pages/FAQ';
import DownloadServicesGuide from './pages/DownloadServicesGuide';
import StartHere from './pages/StartHere';
import ServiceBundles from './pages/ServiceBundles';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import BlogManager from './pages/admin/BlogManager';
import BlogEditor from './pages/admin/BlogEditor';
import WhitePaperManager from './pages/admin/WhitePaperManager';
import WhitePaperEditor from './pages/admin/WhitePaperEditor';

// Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Resources & Tools
import Resources from './pages/Resources';
import ExecutivesGuide from './pages/resources/ExecutivesGuide';
import ROICalculator from './pages/tools/ROICalculator';
import ReadinessAssessment from './pages/tools/ReadinessAssessment';
import TaxSavingsChecklist from './pages/resources/TaxSavingsChecklist';
import InsuranceGapChecklist from './pages/resources/InsuranceGapChecklist';
import TaxSavingsSnapshot from './pages/resources/TaxSavingsSnapshot';
import AdviceEducation from './pages/AdviceEducation';

// Location Pages
import NewYorkNY from './pages/locations/NewYorkNY';
import Manhattan from './pages/locations/Manhattan';

// Case Studies
import CaseStudies from './pages/CaseStudies';

import TaxServices from './pages/services/TaxServices';
import BusinessConsulting from './pages/services/BusinessConsulting';
import InsuranceServices from './pages/services/InsuranceServices';
import InvestmentManagement from './pages/services/InvestmentManagement';
import DigitalMarketing from './pages/services/DigitalMarketing';
import BookkeepingAccounting from './pages/services/BookkeepingAccounting';
import TaxPreparation from './pages/services/TaxPreparation';
import TaxStrategy from './pages/services/TaxStrategy';
import StrategicTaxPlanning from './pages/services/StrategicTaxPlanning';
import RiskArchitecture from './pages/services/RiskArchitecture';
import AIDrivenGrowth from './pages/services/AIDrivenGrowth';
import Technology from './pages/services/Technology';
import GraphicDesign from './pages/services/GraphicDesign';
import VideoProduction from './pages/services/VideoProduction';
import IndustriesHub from './pages/IndustriesHub';
import Contractors from './pages/industries/Contractors';
import MedicalPractices from './pages/industries/MedicalPractices';
import RealEstate from './pages/industries/RealEstate';
import ProfessionalServices from './pages/industries/ProfessionalServices';
import Ecommerce from './pages/industries/Ecommerce';
import LegalServices from './pages/industries/LegalServices';
import Products from './pages/Products';

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
      delay: 0,
      anchorPlacement: 'top-bottom',
      disable: false,
      startEvent: 'DOMContentLoaded',
      disableMutationObserver: false,
      throttleDelay: 99,
      debounceDelay: 50,
    });

    // Refresh AOS on route change
    return () => {
      AOS.refresh();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="about/company" element={<AboutCompany />} />
          <Route path="about/founder" element={<AboutFounder />} />
          <Route path="about/partners" element={<AboutPartners />} />
          <Route path="services" element={<Services />} />
          <Route path="products" element={<Products />} />
          <Route path="service-bundles" element={<ServiceBundles />} />
          <Route path="services/business-consulting" element={<BusinessConsulting />} />
          <Route path="services/insurance" element={<InsuranceServices />} />
          <Route path="services/tax-services" element={<TaxServices />} />
          <Route path="services/investment-management" element={<InvestmentManagement />} />

          <Route path="services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="services/ai-automation" element={<AIConsulting />} />
          <Route path="services/bookkeeping-accounting" element={<BookkeepingAccounting />} />
          <Route path="services/tax-preparation" element={<TaxPreparation />} />
          <Route path="services/tax-strategy" element={<TaxStrategy />} />
          <Route path="services/strategic-tax-planning" element={<StrategicTaxPlanning />} />
          <Route path="services/risk-architecture" element={<RiskArchitecture />} />
          <Route path="services/ai-driven-growth" element={<AIDrivenGrowth />} />
          <Route path="services/technology" element={<Technology />} />
          <Route path="services/graphic-design" element={<GraphicDesign />} />
          <Route path="services/video-production" element={<VideoProduction />} />
          <Route path="ai-consulting" element={<AIConsulting />} />

          <Route path="industries" element={<IndustriesHub />} />
          <Route path="industries/contractors" element={<Contractors />} />
          <Route path="industries/medical-practices" element={<MedicalPractices />} />
          <Route path="industries/real-estate" element={<RealEstate />} />
          <Route path="industries/professional-services" element={<ProfessionalServices />} />
          <Route path="industries/ecommerce" element={<Ecommerce />} />
          <Route path="industries/legal-services" element={<LegalServices />} />

          <Route path="testimonials" element={<Testimonials />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="advice-education" element={<AdviceEducation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="download-services-guide" element={<DownloadServicesGuide />} />
          <Route path="start-here" element={<StartHere />} />
          <Route path="book-now" element={<BookNow />} />
          <Route path="intake-forms" element={<IntakeForms />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="resources" element={<Resources />} />
          <Route path="resources/executives-guide-to-ai" element={<ExecutivesGuide />} />
          <Route path="resources/tax-savings-checklist" element={<TaxSavingsChecklist />} />
          <Route path="resources/insurance-gap-checklist" element={<InsuranceGapChecklist />} />
          <Route path="resources/tax-savings-snapshot" element={<TaxSavingsSnapshot />} />
          <Route path="tools/roi-calculator" element={<ROICalculator />} />
          <Route path="tools/readiness-assessment" element={<ReadinessAssessment />} />
          
          {/* Location Pages */}
          <Route path="locations/new-york-ny" element={<NewYorkNY />} />
          <Route path="locations/manhattan" element={<Manhattan />} />
          
          {/* Case Studies */}
          <Route path="case-studies" element={<CaseStudies />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/blogs" element={<BlogManager />} />
        <Route path="/admin/blogs/new" element={<BlogEditor />} />
        <Route path="/admin/blogs/edit/:id" element={<BlogEditor />} />
        <Route path="/admin/white-papers" element={<WhitePaperManager />} />
        <Route path="/admin/white-papers/new" element={<WhitePaperEditor />} />
        <Route path="/admin/white-papers/edit/:id" element={<WhitePaperEditor />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
