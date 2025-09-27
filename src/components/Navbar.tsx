import { Flex, Text, Button, IconButton } from "@radix-ui/themes";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/skills", label: "Skills" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <Flex
      justify="between"
      align="center"
      p="3"
      className="shadow-sm sticky top-0 bg-white dark:bg-gray-900 z-50"
    >
      <Text size="5" weight="bold">My Portfolio</Text>

      <Flex gap="3" align="center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Button key={item.path} asChild variant="ghost" style={{ position: "relative" }}>
              <Link to={item.path}>
                {item.label}
                {/* Animated underline */}
                <motion.div
                  layoutId="underline"
                  initial={false}
                  animate={{
                    width: isActive ? "100%" : "0%",
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    height: "2px",
                    borderRadius: "2px",
                    backgroundColor: theme === "light" ? "#000" : "#fff",
                  }}
                />
              </Link>
            </Button>
          );
        })}

        {/* Animated Theme Toggle */}
        <IconButton variant="soft" onClick={toggleTheme}>
          <AnimatePresence mode="wait" initial={false}>
            {theme === "light" ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Moon />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun />
              </motion.div>
            )}
          </AnimatePresence>
        </IconButton>
      </Flex>
    </Flex>
  );
}
