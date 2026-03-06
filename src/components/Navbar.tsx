import { Flex, Text, Button, IconButton, Box } from "@radix-ui/themes";
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
    <Box className="site-nav-wrap">
      <Flex justify="between" align="center" className="site-nav">
        <Link to="/" className="site-brand">
          <Text size="5" weight="bold">
            Kevin James
          </Text>
          <Text size="2" className="site-brand-sub">
            Software Engineer
          </Text>
        </Link>

        <Flex gap="2" align="center" wrap="wrap" justify="end">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                asChild
                variant="ghost"
                radius="full"
                className="nav-item-btn"
                style={{ position: "relative" }}
              >
                <Link to={item.path}>
                  {item.label}
                  <motion.div
                    layoutId="underline"
                    initial={false}
                    animate={{
                      width: isActive ? "100%" : "0%",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      height: "2px",
                      borderRadius: "2px",
                      backgroundColor: theme === "light" ? "#0f172a" : "#f2f4f7",
                    }}
                  />
                </Link>
              </Button>
            );
          })}

          <IconButton variant="soft" radius="full" onClick={toggleTheme} className="theme-btn">
            <AnimatePresence mode="wait" initial={false}>
              {theme === "light" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                >
                  <Moon size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                >
                  <Sun size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
}
