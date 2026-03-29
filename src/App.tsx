import { Box } from "@radix-ui/themes";
import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { AnimatePresence } from "framer-motion";

const CinematicPage = lazy(
  () => import("./features/cinematic3d/CinematicPage")
);

function App() {
  const location = useLocation();
  const isCinematic =
    location.pathname === "/" || location.pathname === "/3d";

  if (isCinematic) {
    return (
      <Suspense fallback={null}>
        <CinematicPage />
      </Suspense>
    );
  }

  return (
    <Box>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/classic" element={<Home />} />
          <Route path="/classic/skills" element={<Skills />} />
          <Route path="/classic/about" element={<About />} />
          <Route path="/classic/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </Box>
  );
}

export default App;
