import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { skills } from "../../data/skills";
import "./cinematic.css";

const stats = [
  { label: "Projects Delivered", value: "12+" },
  { label: "Current Role", value: "Intuety Ltd" },
  { label: "Experience", value: "8 Years" },
];

const projects = [
  {
    title: "Church Circle App",
    summary:
      "Built a cross-platform mobile app with scalable APIs and production infrastructure, published for real users on the App Store and Play Store.",
    meta: "React Native / Expo / App Store / Play Store",
  },
  {
    title: "Portfolio on Google Cloud Run",
    summary:
      "Hosted and shipped a production portfolio with CI/CD, custom domain, SSL, budgets, alerts, and infrastructure built for dependable deployment.",
    meta: "Cloud Run / Cloud SQL / Docker / Cloud Build",
  },
  {
    title: "Reusable Frontend Systems",
    summary:
      "Designed modular, animated, theme-aware React UI systems focused on maintainability, performance, and a polished user experience.",
    meta: "React 19 / Radix UI / Framer Motion / Vite",
  },
];

const experience = [
  {
    role: "Web Developer",
    company: "Intuety Ltd",
    period: "Jan 2022 - Present",
    points: [
      "Led the migration of Intuety's platform to a modern stack using React 19, Vite, Radix UI, and TypeScript to improve performance and scalability.",
      "Designed and implemented REST and GraphQL APIs with Node.js, Express, and TypeORM.",
      "Integrated CKEditor 5 with advanced plugins for document editing, export, and collaboration workflows.",
      "Managed Google Cloud Platform storage for secure handling of documents and images.",
      "Introduced automated unit tests with Vitest and Jest, helping raise coverage above 90%.",
      "Collaborated with cross-functional teams and stakeholders to deliver projects on time.",
    ],
  },
  {
    role: "Software Developer",
    company: "Freelance / Self-Employed",
    period: "2018 - 2021",
    points: [
      "Delivered bespoke web applications for small businesses, including booking systems and e-commerce solutions.",
      "Built mobile apps with React Native for clients needing cross-platform delivery.",
      "Helped startups set up cloud infrastructure, authentication flows, and payment systems using services like Stripe and Firebase.",
      "Provided ongoing technical support, iteration, and maintenance after launch.",
    ],
  },
];

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export default function CinematicPage() {
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { scrollYProgress } = useScroll();
  const orbAY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const orbBY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.35], [0, 90]);
  const heroSideY = useTransform(scrollYProgress, [0, 0.35], [0, 140]);
  const shellY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/kevinofficial95@gmail.com",
        {
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
        }
      );

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
    <div className="glass-page">
      <div
        className="glass-cursor-glow"
        style={{ left: cursor.x, top: cursor.y }}
      />
      <motion.div className="glass-orb glass-orb-a" style={{ y: orbAY }} />
      <motion.div className="glass-orb glass-orb-b" style={{ y: orbBY }} />
      <div className="glass-orb glass-orb-c" />
      <div className="glass-noise" />

      <header className="glass-topbar">
        <div>
          <span className="glass-wordmark">Kevin James</span>
          <span className="glass-role">Software Engineer</span>
        </div>
        <nav className="glass-nav">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <a href="/classic">Classic</a>
        </nav>
      </header>

      <motion.main className="glass-shell" style={{ y: shellY }}>
        <section className="glass-hero glass-panel">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass-hero-copy"
            style={{ y: heroCopyY }}
          >
            <p className="glass-kicker">Premium Software Portfolio</p>
            <h1>
              I build reliable digital products with premium frontend craft and
              clean cloud delivery.
            </h1>
            <p className="glass-lead">
              React Engineer based in Newport, UK, focused on shipping polished
              user experiences with TypeScript, Node.js, and Google Cloud.
            </p>
            <div className="glass-inline-badges">
              <span>Web Developer at Intuety Ltd</span>
              <span>Jan 2022 - Present</span>
              <span>Newport, UK</span>
            </div>

            <div className="glass-actions">
              <a href="#work" className="glass-button glass-button-solid">
                View Projects
                <ArrowUpRight size={16} />
              </a>
              <a
                href="/Kevin_James_CV.html"
                target="_blank"
                rel="noreferrer"
                className="glass-button glass-button-ghost"
              >
                View CV
                <Download size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-hero-side"
            style={{ y: heroSideY }}
          >
            <div className="glass-premium-card">
              <p className="glass-kicker">Profile Snapshot</p>
              <h2>Frontend precision. Full-stack ownership. Production calm.</h2>
              <div className="glass-quote-line" />
              <p className="glass-premium-copy">
                I help teams move from concept to release with elegant UI,
                scalable architecture, and dependable delivery across web, mobile,
                and cloud infrastructure.
              </p>
            </div>
            <div className="glass-stat-grid">
              {stats.map((item) => (
                <div key={item.label} className="glass-mini-panel">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="about" className="glass-section-grid">
          <motion.article
            className="glass-panel glass-copy-panel"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="glass-kicker">About</p>
            <h2>Professional engineering with craft, pace, and clarity.</h2>
            <p>
              I specialize in building scalable web applications with React,
              TypeScript, and Node.js. My focus is delivering interfaces that feel
              refined while keeping the underlying architecture stable and practical.
            </p>
            <p>
              From frontend systems and React Native apps to cloud deployment and
              CI/CD, I like owning the full path from idea to production.
            </p>
          </motion.article>

          <motion.article
            className="glass-panel glass-copy-panel"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <p className="glass-kicker">What I Bring</p>
            <ul className="glass-feature-list">
              <li>Modern React and TypeScript systems with strong UI judgment</li>
              <li>Cross-platform app delivery using React Native and Expo</li>
              <li>Cloud deployment with Google Cloud, Docker, and CI/CD workflows</li>
              <li>Premium interaction design, motion, theming, and responsive UX</li>
            </ul>
          </motion.article>
        </section>

        <section id="experience" className="glass-section-stack">
          <div className="glass-section-head">
            <p className="glass-kicker">Experience</p>
            <h2>Professional experience across product engineering and delivery.</h2>
          </div>

          <div className="glass-experience-stack">
            {experience.map((item, index) => (
              <motion.article
                key={item.role + item.company}
                className="glass-panel glass-experience-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="glass-experience-head">
                  <div>
                    <p className="glass-experience-role">{item.role}</p>
                    <h3>{item.company}</h3>
                  </div>
                  <span>{item.period}</span>
                </div>
                <ul className="glass-experience-list">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="work" className="glass-section-stack">
          <div className="glass-section-head">
            <p className="glass-kicker">Selected Work</p>
            <h2>Projects built to ship fast and last in production.</h2>
          </div>

          <div className="glass-project-grid">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className="glass-panel glass-project-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="glass-project-tag">0{index + 1}</div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <span>{project.meta}</span>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="glass-section-stack">
          <div className="glass-section-head">
            <p className="glass-kicker">Skills</p>
            <h2>The stack I use to design, build, ship, and refine products.</h2>
          </div>

          <div className="glass-skill-grid">
            {skills.map((group, index) => (
              <motion.article
                key={group.category}
                className="glass-panel glass-skill-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <h3>{group.category}</h3>
                <div className="glass-chip-wrap">
                  {group.items.map((item) => (
                    <span key={item} className="glass-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="glass-contact-grid">
          <motion.article
            className="glass-panel glass-copy-panel"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="glass-kicker">Contact</p>
            <h2>Let&apos;s build something sharp, useful, and production-ready.</h2>
            <p>
              If you&apos;re hiring, planning a product, or need a developer who can
              move between UI, backend, and deployment, I&apos;d love to talk.
            </p>

            <div className="glass-contact-links">
              <a href="mailto:kevinofficial95@gmail.com">
                <Mail size={16} />
                Email
              </a>
              <a
                href="https://github.com/kevinofficial95"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/kevinjames95"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.article>

          <motion.article
            className="glass-panel glass-form-panel"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <form onSubmit={handleSubmit} className="glass-form">
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <input
                type="email"
                placeholder="Your work email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Company (optional)"
                value={form.company}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, company: e.target.value }))
                }
              />
              <textarea
                placeholder="Message: role, team, location, or project details..."
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                rows={6}
                required
              />
              <button type="submit" className="glass-button glass-button-solid" disabled={submitting}>
                <Send size={16} />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            {status === "success" && (
              <p className="glass-status glass-status-success">
                Message sent successfully. Thanks for reaching out.
              </p>
            )}
            {status === "error" && (
              <p className="glass-status glass-status-error">
                Could not send the form right now. Please use email above.
              </p>
            )}
          </motion.article>
        </section>
      </motion.main>
    </div>
  );
}
