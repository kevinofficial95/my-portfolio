import { Container, Flex, Text, Button, Card } from "@radix-ui/themes";
import { Mail, Github, Linkedin } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { useTheme } from "../context/ThemeContext";
import { backgrounds } from "../utils/backgrounds";
import { motion, Variants } from "framer-motion";

export default function Contact() {
  const { theme } = useTheme();

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.95 },
  };

  const buttons = [
    { href: "mailto:your@email.com", label: "Email", icon: <Mail size={16} /> },
    { href: "https://github.com/kevinofficial95", label: "GitHub", icon: <Github size={16} /> },
    { href: "https://linkedin.com/in/kevinjames95", label: "LinkedIn", icon: <Linkedin size={16} /> },
  ];

  return (
    <PageWrapper>
      <motion.div
        style={{
          background: backgrounds[theme].contact,
          minHeight: "70vh",
          padding: "80px 0",
          display: "flex",
          alignItems: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container
          size="3"
          style={{
            maxWidth: "100%",
            padding: "0 1rem",
          }}
        >
          <Card
            className="shadow-md p-6"
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <Flex direction="column" gap="4" align="center">
              <Text size="7" weight="bold" align="center">
                Get In Touch
              </Text>
              <Text size="4" color="gray" align="center">
                Open to new opportunities, collaborations, and projects. Let’s connect 👇
              </Text>

              <Flex
                gap="3"
                mt="4"
                wrap="wrap" 
                justify="center"
              >
                {buttons.map((btn, i) => (
                  <motion.div
                    key={btn.label}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{
                      delay: i * 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Button asChild variant={i === 2 ? "soft" : "solid"}>
                      <a href={btn.href} target="_blank" rel="noreferrer">
                        {btn.icon} {btn.label}
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </Flex>
            </Flex>
          </Card>
        </Container>
      </motion.div>
    </PageWrapper>
  );
}
