import { Box, Container, Flex, Text, Button, IconButton } from "@radix-ui/themes";
import { Sun, Moon, Github, Linkedin } from "lucide-react";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Box>
      {/* Navbar */}
      <Flex justify="between" align="center" p="3" className="shadow-sm sticky top-0 bg-white dark:bg-gray-900">
        <Text size="5" weight="bold">My Portfolio</Text>
        <Flex gap="3" align="center">
          <Button variant="ghost" asChild><a href="#skills">Skills</a></Button>
          <Button variant="ghost" asChild><a href="#about">About</a></Button>
          <Button variant="ghost" asChild><a href="#contact">Contact</a></Button>
          <IconButton variant="soft" onClick={toggleTheme}>
            {theme === "light" ? <Moon /> : <Sun />}
          </IconButton>
        </Flex>
      </Flex>

      {/* Hero */}
      <Container size="3" py="8">
        <Flex direction="column" align="center" gap="4">
          <Text size="8" weight="bold">Hi, I’m Kevin 👋</Text>
          <Text size="4" color="gray">React Developer | DevOps Enthusiast | Cloud Learner</Text>
          <Flex gap="4" mt="4">
            <Button asChild><a href="https://github.com/kevinofficial95" target="_blank"><Github /> GitHub</a></Button>
            <Button asChild variant="soft"><a href="https://linkedin.com/in/yourlinkedin" target="_blank"><Linkedin /> LinkedIn</a></Button>
          </Flex>
        </Flex>
      </Container>

      {/* Placeholder Sections */}
      <Box id="skills" py="8" className="bg-gray-50 dark:bg-gray-800 text-center">
        <Text size="6" weight="bold">Skills Section</Text>
      </Box>

      <Box id="about" py="8" className="text-center">
        <Text size="6" weight="bold">About Section</Text>
      </Box>

      <Box id="contact" py="8" className="bg-gray-50 dark:bg-gray-800 text-center">
        <Text size="6" weight="bold">Contact Section</Text>
      </Box>

      {/* Footer */}
      <Box className="bg-gray-100 dark:bg-gray-900 py-4 text-center">
        <Text size="2" color="gray">© {new Date().getFullYear()} Kevin James</Text>
      </Box>
    </Box>
  );
}

export default App;
