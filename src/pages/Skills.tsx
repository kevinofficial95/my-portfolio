import { Container, Flex, Text, Card } from "@radix-ui/themes";
import { skills } from "../data/skills";
import PageWrapper from "../components/PageWrapper";
import { useTheme } from "../context/ThemeContext";
import { backgrounds } from "../utils/backgrounds";
import { motion } from "framer-motion";

export default function Skills() {
  const { theme } = useTheme();

  return (
    <PageWrapper>
      <motion.div
        style={{
          background: backgrounds[theme].skills,
          minHeight: "70vh",
          padding: "80px 0",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container size="3">
          <Text size="7" weight="bold" mb="6">Skills</Text>
          <Flex direction="column" gap="6">
            {skills.map(({ category, items }, idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <Card className="shadow-md p-4">
                  <Text size="5" weight="medium" mb="3">{category}</Text>
                  <Flex gap="2" wrap="wrap">
                    {items.map((item) => (
                      <motion.span
                        key={item}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          backgroundColor: theme === "light" ? "#f0f0f0" : "#2d2d2d",
                          cursor: "default",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </Flex>
                </Card>
              </motion.div>
            ))}
          </Flex>
        </Container>
      </motion.div>
    </PageWrapper>
  );
}
