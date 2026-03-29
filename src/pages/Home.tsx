import { Container, Flex, Text, Button, Card, Box, Heading, Badge } from "@radix-ui/themes";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { backgrounds } from "../utils/backgrounds";
import { ArrowRight, Download, Rocket, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const words = [
    "React Engineer",
    "TypeScript + Node.js Builder",
    "Cloud-Native Product Developer",
    "React Native + Expo Developer",
    "Frontend Performance Optimizer",
    "DevOps-Minded Problem Solver",
  ];
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const stats = [
    { label: "Projects Delivered", value: "12+" },
    { label: "Core Stack", value: "React • TS • Node" },
    { label: "Cloud Platform", value: "Google Cloud" },
  ];

  const caseStudies = [
    {
      title: "Church Circle App",
      summary:
        "Built Church Circle, a cross-platform app with scalable APIs and production infrastructure, published for users on App Store and Play Store.",
      highlights: ["React Native", "Expo", "App Store + Play Store"],
    },
    {
      title: "Portfolio on Google Cloud Run",
      summary:
        "Hosted portfolio on Google Cloud Run with custom domain, managed SSL, CI/CD automation, cost budgets, alerting, and production-ready scaling architecture.",
      highlights: ["Cloud Run", "Cloud SQL", "Alerts + Budgets"],
    },
    {
      title: "Reusable Frontend Systems",
      summary:
        "Designed animated, theme-aware React UI architecture with modular components and clean route transitions for maintainable growth.",
      highlights: ["Framer Motion", "Radix UI", "Responsive UX"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper>
      <Box
        style={{
          background: backgrounds[theme].home,
          color: isLight ? "#111111" : "#f5f5f5",
          minHeight: "70vh",
          padding: "80px 0 110px",
        }}
      >
        <Container size="4">
          <Flex direction="column" gap="8">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Badge size="3" radius="full" color="teal" variant="soft" style={{ padding: "8px 12px" }}>
                <Sparkles size={14} />
                Product-Focused Software Engineer
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              style={{ maxWidth: "860px" }}
            >
              <Heading
                size="9"
                style={{ fontSize: "clamp(2.2rem, 5.8vw, 4.6rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                Hi, I&apos;m Kevin James.
                <br />
                I build reliable web products that ship fast.
              </Heading>
            </motion.div>

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Text size="6" style={{ color: isLight ? "#344054" : "#d0d5dd" }}>
                {words[index]}
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Text size="4" style={{ maxWidth: "760px", color: isLight ? "#475467" : "#98a2b3" }}>
                I design and deliver full-stack experiences with thoughtful UX, scalable architecture, and clean cloud delivery.
                From product idea to deployment, I focus on impact, speed, and maintainability.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
            >
              <Flex gap="3" wrap="wrap">
                <Button asChild size="3">
                  <a href="#case-studies">
                    <Rocket size={16} />
                    View Case Studies
                  </a>
                </Button>
                <Button asChild variant="surface" size="3">
                  <a href="/Kevin_James_CV.html" target="_blank" rel="noreferrer">
                    <Download size={16} />
                    View CV
                  </a>
                </Button>
                <Button asChild variant="outline" size="3">
                  <Link to="/classic/contact">
                    Let&apos;s Connect
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </Flex>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
            >
              <Flex gap="3" wrap="wrap">
                {stats.map((item) => (
                  <Card
                    key={item.label}
                    variant="surface"
                    style={{
                      minWidth: "200px",
                      borderRadius: "14px",
                      padding: "14px 16px",
                      background: isLight ? "rgba(255,255,255,0.72)" : "rgba(20,20,20,0.52)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Text size="5" weight="bold">
                      {item.value}
                    </Text>
                    <Text size="2" style={{ color: isLight ? "#667085" : "#98a2b3" }}>
                      {item.label}
                    </Text>
                  </Card>
                ))}
              </Flex>
            </motion.div>

            <motion.div
              id="case-studies"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
              style={{ marginTop: "28px" }}
            >
              <Heading size="7" style={{ marginBottom: "16px" }}>
                Selected Case Studies
              </Heading>
              <Flex direction="column" gap="3">
                {caseStudies.map((study, i) => (
                  <motion.div
                    key={study.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                  >
                    <Card
                      style={{
                        borderRadius: "16px",
                        padding: "18px",
                        background: isLight ? "rgba(255,255,255,0.8)" : "rgba(20,20,20,0.55)",
                        border: isLight ? "1px solid #eaecf0" : "1px solid #344054",
                      }}
                    >
                      <Flex direction="column" gap="3">
                        <Heading size="5">{study.title}</Heading>
                        <Text size="3" style={{ color: isLight ? "#475467" : "#98a2b3" }}>
                          {study.summary}
                        </Text>
                        <Flex gap="2" wrap="wrap">
                          {study.highlights.map((item) => (
                            <Badge key={item} variant="outline" color="teal">
                              {item}
                            </Badge>
                          ))}
                        </Flex>
                      </Flex>
                    </Card>
                  </motion.div>
                ))}
              </Flex>
            </motion.div>
          </Flex>
        </Container>
      </Box>
    </PageWrapper>
  );
}
