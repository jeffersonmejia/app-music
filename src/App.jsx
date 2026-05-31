import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/Home/Home";
import { ContactPage } from "./pages/Contact/Contact";
import { AboutPage } from "./pages/About/About";
import { ServicesPage } from "./pages/Services/Services";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
