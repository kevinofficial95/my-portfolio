import { Container, Flex, Text, Button, Card, TextField, TextArea, Heading } from "@radix-ui/themes";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { useTheme } from "../context/ThemeContext";
import { backgrounds } from "../utils/backgrounds";
import { motion, Variants } from "framer-motion";
import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export default function Contact() {
  const { theme } = useTheme();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const isLight = theme === "light";

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
    { href: "mailto:kevinofficial95@gmail.com", label: "Email", icon: <Mail size={16} /> },
    { href: "https://github.com/kevinofficial95", label: "GitHub", icon: <Github size={16} /> },
    { href: "https://linkedin.com/in/kevinjames95", label: "LinkedIn", icon: <Linkedin size={16} /> },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("https://formsubmit.co/ajax/kevinofficial95@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || "Not provided",
          message: form.message,
          _subject: `Portfolio inquiry from ${form.name}`,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit contact form.");
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

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
        <Container size="4" style={{ width: "100%", padding: "0 1rem" }}>
          <Card
            style={{
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              borderRadius: "18px",
              border: isLight ? "1px solid #eaecf0" : "1px solid #344054",
              background: isLight ? "rgba(255,255,255,0.82)" : "rgba(15,23,42,0.58)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Flex direction="column" gap="5" p="5">
              <Heading size="7" align="center">
                Recruiter-Friendly Contact Form
              </Heading>
              <Text size="3" align="center" style={{ color: isLight ? "#475467" : "#98a2b3" }}>
                Send your role details and I&apos;ll get back to you directly at the earliest.
              </Text>

              <form onSubmit={handleSubmit}>
                <Flex direction="column" gap="3">
                  <TextField.Root
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <TextField.Root
                    type="email"
                    placeholder="Your work email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                  <TextField.Root
                    placeholder="Company (optional)"
                    value={form.company}
                    onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                  />
                  <TextArea
                    placeholder="Message: role, team, location, or anything relevant..."
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    required
                    rows={6}
                  />

                  <Button type="submit" size="3" disabled={submitting}>
                    <Send size={16} />
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </Flex>
              </form>

              {status === "success" && (
                <Text size="2" align="center" color="green">
                  Message sent successfully. Thanks for reaching out.
                </Text>
              )}
              {status === "error" && (
                <Text size="2" align="center" color="red">
                  Could not send the form right now. Please use direct email below.
                </Text>
              )}

              <Flex gap="3" mt="1" wrap="wrap" justify="center">
                {buttons.map((btn, i) => (
                  <motion.div
                    key={btn.label}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{
                      delay: i * 0.15,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Button asChild variant={i === 0 ? "solid" : "soft"}>
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
