import { Container, Flex, Text, Button } from "@radix-ui/themes";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { backgrounds } from "../utils/backgrounds";
import { Download, Eye } from "lucide-react";

export default function Home() {
  const words = ["React Developer", "DevOps Enthusiast", "Cloud Learner 🚀"];
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();

  // 👀 Visitor counter state
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Fetch visitor count from Azure Function
  useEffect(() => {
    fetch("/api/visitorCounter")
      .then((res) => res.json())
      .then((data) => setVisits(data.count))
      .catch(() => setVisits(null));
  }, []);

  return (
    <PageWrapper>
      <motion.div
        style={{
          background: backgrounds[theme].home,
          color: theme === "light" ? "black" : "white",
          padding: "100px 0",
          textAlign: "center",
          minHeight: "70vh",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container size="3">
          <Flex direction="column" align="center" gap="6">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Text size="9" weight="bold">
                Hi, I’m Kevin 👋
              </Text>
            </motion.div>

            {/* Rotating titles */}
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Text size="5">{words[index]}</Text>
            </motion.div>

            {/* Download CV button */}
            <Button asChild variant="solid" size="3" style={{ marginTop: "20px" }}>
              <a href="/Kevin_James_CV.pdf" download>
                <Download size={16} /> Download CV
              </a>
            </Button>

            {/* Visitor Counter Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: "16px" }}
            >
              <Button
                variant="outline"
                size="2"
                style={{
                  borderRadius: "9999px", // pill shape
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "default",
                }}
              >
                <Eye size={16} />
                {visits !== null
                  ? `${visits} visitors`
                  : "Loading..."}
              </Button>
            </motion.div>
          </Flex>
        </Container>
      </motion.div>
    </PageWrapper>
  );
}
