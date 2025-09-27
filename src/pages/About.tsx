import { Container, Card, Flex, Text } from "@radix-ui/themes";
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
          background: backgrounds[theme].about,
          minHeight: "70vh",
          padding: "80px 0",
          display: "flex",
          alignItems: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container size="3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-md p-6">
              <Flex direction="column" gap="4" align="center">
                <Text size="7" weight="bold">About Me</Text>
                <Text size="4" color="gray" align="center">
                  I’m Kevin, a <b>React Developer</b> and <b>DevOps Enthusiast</b> passionate
                  about building scalable apps and learning cloud tech.  
                  Skilled in <b>Azure</b>, <b>Google Cloud</b>, <b>Docker</b>, and <b>CI/CD</b>.  
                  Always curious, always learning 🚀.
                </Text>
              </Flex>
            </Card>
          </motion.div>
        </Container>
      </motion.div>
    </PageWrapper>
  );
}
