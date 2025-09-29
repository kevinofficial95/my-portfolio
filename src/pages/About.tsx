import { Container, Flex, Text, Button, Card, Heading } from "@radix-ui/themes";
import PageWrapper from "../components/PageWrapper";
import { useTheme } from "../context/ThemeContext";
import { backgrounds } from "../utils/backgrounds";
import { motion } from "framer-motion";

export default function About() {
  const { theme } = useTheme();

  return (
    <PageWrapper>
      <motion.div
        style={{
          background: backgrounds[theme].about, // 👈 use a different background key
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
              maxWidth: "900px", // wider than Contact
              margin: "0 auto",
            }}
          >
            <Flex
              direction={{ initial: "column", md: "row" }} // stack on mobile
              gap="6"
              align="center"
            >
              {/* Left side: Profile Image */}
              <motion.img
                src="/mypic.jpeg" // replace with your profile image
                alt="Kevin James"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Right side: Bio */}
              <Flex direction="column" gap="3" style={{ flex: 1 }}>
                <Heading size="6" weight="bold">
                  About Me
                </Heading>
                <Text size="4" color="gray">
                  Hi 👋 I’m Kevin James, a passionate software developer from Newport,
                  UK. I specialize in building scalable web applications with
                  **React, TypeScript, and Node.js**.
                </Text>
                <Text size="4" color="gray">
                  With experience in frontend and backend development, I enjoy solving
                  real-world problems and creating modern, responsive user experiences.
                </Text>

                <Flex gap="3" mt="3" wrap="wrap">
                  <Button asChild>
                    <a href="/Kevin_James_CV.pdf" download>
                      Download CV
                    </a>
                  </Button>
                  <Button variant="soft" asChild>
                    <a href="/contact">Let’s Connect</a>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Container>
      </motion.div>
    </PageWrapper>
  );
}
