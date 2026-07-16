import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

import imgCars from "./assets/imgs/cars.png";
import imgSl from "./assets/imgs/sl.png";
import imgChongqing from "./assets/imgs/chongqing.png";
import imgJiuzaigou from "./assets/imgs/jiuzaigou.JPG";
import imgBkkTemple from "./assets/imgs/bkk_temple.JPG";
import imgBkkCity from "./assets/imgs/bkk_city.JPG";
import imgPanda from "./assets/imgs/panda.JPG";
import imgLangkawi from "./assets/imgs/langkawi_sunset.png";
import imgOuch from "./assets/imgs/ouch.png";
import resumePdf from "./assets/resume.pdf?url";

const polaroidImages = [
  { alt: "Car Enthusiast", src: imgCars },
  { alt: "Gaming Setup", src: imgSl },
  { alt: "Travel and Food", src: imgChongqing },
  { alt: "Jiuzaigou", src: imgJiuzaigou },
  { alt: "Bangkok Temple", src: imgBkkTemple },
  { alt: "Bangkok City", src: imgBkkCity },
  { alt: "Panda", src: imgPanda },
  { alt: "Langkawi Sunset", src: imgLangkawi },
  { alt: "Chongqing", src: imgChongqing },
];

// ─── Project data ────────────────────────────────────────────────────────────
type ProjectThumbnail =
  | { type: "image"; src: string; alt?: string }
  | { type: "code"; filename: string; snippet: string };

type ProjectLink = { label: string; href?: string; variant: "primary" | "outline" };

interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  thumbnail: ProjectThumbnail;
  links: ProjectLink[];
}

const projects: Project[] = [
  {
    title: "AI Risk Surveyor Tool",
    year: "2026",
    description:
      "An intelligent document processing and site analysis application built for risk surveyors. Powered by Gemini and a RAG pipeline.",
    tags: ["React", "FastAPI", "Gemini", "GCP"],
    thumbnail: {
      type: "image",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVjQx6J_DNBfr0HcrwzvPSZz_wpGfKcelbSC2joqdW_ZLDgrocwW16dNqJNBrTxiixK2pNsMVjHFtz3RsslFj7nu1F8nW6pi3pHQnx9jKepmHZEmNIZfq9Lqj2N0j1-UEnJ3cHDaQJFqdUqlId4ZeZkTzZet8PvBhrCcTKGimIRqjQejNFT9NsoTHE_jEOzJYQTgsGxl9pT2Ta1v44g3JlVK9dLs3kSk6sFJ-FfqZB9RrTda0oJD9v",
      alt: "AI Risk Surveyor Tool",
    },
    links: [
      { label: "Visit Site", variant: "primary" },
      { label: "Github", variant: "outline" },
    ],
  },
  {
    title: "Ouch Core System",
    year: "PRESENT",
    description:
      "Core Maintainer of Ouch!'s central insurtech engine, driving the automated infrastructure that powers the policy lifecycle and claims processing for our digital-first insurance platform.",
    tags: ["Django", "PostgreSQL", "Docker", "GCP"],
    thumbnail: { type: "image", src: imgOuch, alt: "Ouch Core System" },
    links: [{ label: "Visit Website", href: "https://ouch.my/", variant: "primary" }],
  },
  {
    title: "Pokedex Fullstack",
    year: "2024",
    description:
      "A fullstack web application featuring a Django backend that integrates with the PokeAPI and dynamic Vue.js frontend.",
    tags: ["VueJS", "Django", "Nginx", "Github Action"],
    thumbnail: {
      type: "code",
      filename: "pokedex.vue",
      snippet: `export default {
  data() {
    return {
      pokemon: [],
      loading: true
    }
  },
  async mounted() {
    this.pokemon = await api.get('/pokemon');
  }
}`,
    },
    links: [{ label: "View Repo", variant: "outline" }],
  },
  {
    title: "LLM Course Recommender",
    year: "2024",
    description:
      "Machine learning-powered application helping students make data-driven decisions on university courses.",
    tags: ["Flask", "Python", "LLMs"],
    thumbnail: {
      type: "image",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSRo6X4qJO9DWavQWf0AvRFGgGgfFLJuzoirX56WeifXMzASpzOKtW450nqYo_KVtWee4hXki9RXXWKPFKOjtAGaK6Mew3ZXCkVDGNMohaCGfrKLttWHtxRPYQVKX0qVx8iA6C98-OLjr7zN5Y0KHl5_V7oBpKzsRKK3I9uA6SEAc-5SM2SJW0TnghAokzt6IU8SmxZRh6hBV6gxaejnFzAMZ0TB5qzw4oOYD8F0cZE5xnqJQ1_WyD",
      alt: "LLM Course Recommender",
    },
    links: [{ label: "Github", variant: "outline" }],
  },
];

// ─── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT ME" },
  { id: "stack", label: "MY STACK" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [polaroidIndex, setPolaroidIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPolaroidIndex((prev) => (prev + 1) % polaroidImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const getPolaroidClass = (index: number) => {
    const len = polaroidImages.length;
    const position = (index - polaroidIndex + len) % len;
    if (position === 0) return "polaroid polaroid-top";
    if (position === 1) return "polaroid polaroid-middle";
    if (position === 2) return "polaroid polaroid-bottom";
    return "polaroid polaroid-hidden";
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          const id = section.getAttribute("id");
          if (id) current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const heroSection = document.querySelector("section#home");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-in-view");
            entry.target.classList.remove("section-out-view");
          } else {
            entry.target.classList.add("section-out-view");
            entry.target.classList.remove("section-in-view");
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.15 }
    );

    heroSection.classList.add("section-out-view", "scroll-section");
    observer.observe(heroSection);

    return () => observer.unobserve(heroSection);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const close = () => setMobileMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  const getLinkClass = (id: string) => {
    return activeSection === id
      ? "text-on-surface pb-1 transition-all border-b-2 border-on-surface font-bold text-body-md"
      : "hover:text-on-surface transition-colors duration-200 font-label-md text-on-surface-variant text-body-md";
  };

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <div className="font-body-md text-body-md text-on-surface-variant selection:bg-primary-fixed selection:text-on-primary-fixed bg-background overflow-x-hidden">

      {/* ── Top Nav ── */}
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-sm border-b border-outline-variant h-16">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-8 h-full">
          {/* Logo */}
          <div className="font-headline-md text-headline-md font-bold text-on-surface text-sm md:text-base">
            TAI YOONG WEI
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <a key={link.id} className={getLinkClass(link.id)} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              className="px-4 py-2 md:px-6 bg-on-surface text-surface font-medium rounded-sm hover:opacity-90 transition-opacity uppercase text-label-md"
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-b border-outline-variant shadow-lg">
            <div className="flex flex-col px-4 py-4 gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={handleNavClick}
                  className={`${getLinkClass(link.id)} text-base py-1`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-screen flex items-center justify-center pt-16 bg-surface-container-low" id="home">
          <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
            <span className="font-label-md text-on-surface-variant tracking-[0.2em] block mb-4 uppercase">LOUIS</span>
            <h1 className="font-headline-lg text-[40px] sm:text-[52px] md:text-[64px] text-on-surface mb-6 uppercase leading-tight flex flex-wrap justify-center gap-x-4">
              <span>Tai</span>
              <span>Yoong</span>
              <span>Wei</span>
            </h1>
            <p className="font-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto border-y border-outline-variant py-6 text-sm md:text-base">
              I'm a{" "}
              <span className="text-on-surface font-bold underline decoration-1 underline-offset-4">
                Fullstack Software Engineer
              </span>{" "}
              and a lover of cars, gaming, food and travel. Currently based in Petaling Jaya, Malaysia working at Ouch!
            </p>
            <div className="flex items-center justify-center gap-3 bg-surface border border-outline px-5 py-3 rounded-sm inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-surface opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-label-md text-on-surface uppercase tracking-wider text-xs md:text-sm">
                Open to Relocation
              </span>
            </div>
          </div>
        </section>

        {/* ── About Me ── */}
        <section className="py-16 md:py-24 bg-surface" id="about">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <div className="lg:col-span-7">
              <h2 className="font-headline-lg text-on-surface mb-6 md:mb-8 uppercase border-b-2 border-on-surface inline-block pb-2 text-[22px] sm:text-[32px] md:text-[48px]">
                A little bit about me
              </h2>
              <div className="space-y-5 text-on-surface-variant font-body-lg leading-relaxed">
                <p className="text-sm md:text-base">
                  Hi! I'm a Fullstack Software Engineer graduated from Sunway University in April 2025. I am currently
                  based in <strong className="text-on-surface">Petaling Jaya, Malaysia</strong>, where I build seamless
                  and accessible fintech products at <strong className="text-on-surface">Ouch!</strong>. I enjoy
                  bridging the gap between clean backend architecture and intuitive frontend experiences using modern
                  technologies like{" "}
                  <span className="text-on-surface font-medium italic">React</span>,{" "}
                  <span className="text-on-surface font-medium italic">Django</span> and{" "}
                  <span className="text-on-surface font-medium italic">VueJs</span>.
                </p>
                <p className="text-sm md:text-base">When I'm not in front of a code editor, you can usually find me:</p>
                <div className="pt-4 border-t border-outline-variant">
                  <ul className="space-y-4 font-body-md text-sm md:text-base">
                    <li className="flex gap-4 items-start">
                      <span className="text-on-surface font-bold shrink-0">01.</span>
                      <span>
                        <strong>On the road:</strong> Car spotting or planning my next
                        road trip.
                      </span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="text-on-surface font-bold shrink-0">02.</span>
                      <span>
                        <strong>In a lobby:</strong> Diving into games like Dota2 or CS2.
                      </span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="text-on-surface font-bold shrink-0">03.</span>
                      <span>
                        <strong>Exploring:</strong> Traveling to new destinations and hunting down the best local eats.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="pt-4 border-t border-outline-variant text-sm md:text-base">
                  I love connecting with fellow developers, car enthusiasts, and gamers. Let's chat!
                </p>
                <div className="flex gap-6 pt-6 md:pt-8 border-t border-outline-variant">
                  <a className="text-on-surface hover:text-on-surface-variant transition-colors" href="mailto:louisweitai@gmail.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  </a>
                  <a className="text-on-surface hover:text-on-surface-variant transition-colors" href="https://www.linkedin.com/in/yoong-wei-tai-b4a403306/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                  <a className="text-on-surface hover:text-on-surface-variant transition-colors" href="https://www.instagram.com/louis.tai/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                  </a>
                  <a className="text-on-surface hover:text-on-surface-variant transition-colors" href="https://github.com/Louis-tai0309" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                </div>
              </div>
            </div>

            {/* Polaroid stack — hidden on mobile, visible on lg+ */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="polaroid-stack">
                {polaroidImages.map((img, idx) => (
                  <div key={idx} className={getPolaroidClass(idx)}>
                    <img alt={img.alt} src={img.src} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience & Stack ── */}
        <section className="py-16 md:py-24 bg-surface-container-low" id="stack">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="font-headline-lg text-on-surface uppercase tracking-normal md:tracking-widest text-[22px] sm:text-[32px] md:text-[48px]">
                My Technical Universe
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
              {/* Left: Work Experience */}
              <div>
                <h3 className="font-headline-md text-on-surface mb-8 md:mb-12 flex items-center gap-3 uppercase border-l-4 border-on-surface pl-4 text-lg md:text-2xl">
                  Work Experiences
                </h3>
                <div className="relative space-y-10 md:space-y-12 pl-10 md:pl-12">
                  {/* Current */}
                  <div className="relative">
                    <div className="absolute -left-8 top-1">
                      <div className="timeline-dot active"></div>
                      <div className="timeline-line"></div>
                    </div>
                    <div className="bg-surface p-5 md:p-6 border border-outline-variant">
                      <h4 className="font-headline-md text-on-surface mb-1 text-base md:text-2xl">
                        Junior Fullstack Software Engineer
                      </h4>
                      <div className="font-label-md text-on-surface-variant mb-3 md:mb-4 uppercase text-xs">
                        Ouch! | April 2025 - Present
                      </div>
                      <p className="text-on-surface-variant font-body-md text-sm">
                        Building digital-first insurtech solutions focusing on core system maintenance and feature
                        development.
                      </p>
                    </div>
                  </div>
                  {/* Internship */}
                  <div className="relative">
                    <div className="absolute -left-8 top-1">
                      <div className="timeline-dot"></div>
                    </div>
                    <div className="bg-surface p-5 md:p-6 border border-outline-variant">
                      <h4 className="font-headline-md text-on-surface mb-1 text-base md:text-2xl">
                        Software Engineer Intern
                      </h4>
                      <div className="font-label-md text-on-surface-variant mb-3 md:mb-4 uppercase text-xs">
                        Ouch! | Jan 2025 - April 2025
                      </div>
                      <p className="text-on-surface-variant font-body-md text-sm">
                        Contributed to internal tools and the Pokedex project using Django and VueJS.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 md:mt-16">
                  <h3 className="font-headline-md text-on-surface mb-6 md:mb-8 uppercase border-l-4 border-on-surface pl-4 text-lg md:text-2xl">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["ENGLISH", "MANDARIN", "CANTONESE", "MALAY"].map((lang) => (
                      <span key={lang} className="px-4 py-2 bg-surface-container-high text-on-surface font-label-md border border-outline-variant text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Dev Stack */}
              <div>
                <h3 className="font-headline-md text-on-surface mb-8 md:mb-12 flex items-center gap-3 uppercase border-l-4 border-on-surface pl-4 text-lg md:text-2xl">
                  Dev Stack
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {[
                    { title: "Languages", items: ["Python", "JavaScript", "TypeScript"] },
                    { title: "Frameworks", items: ["Django, FastAPI", "NodeJs, React", "VueJs, Tailwind"] },
                    { title: "Infrastructure", items: ["Docker, GCP", "Nginx, CI/CD"] },
                    { title: "AI / ML", items: ["Gemini, Codex", "RAG Pipelines", "Claude Code"] },
                  ].map((card) => (
                    <div key={card.title} className="bg-surface p-5 md:p-6 border border-outline-variant">
                      <h4 className="font-label-md text-on-surface font-bold mb-3 md:mb-4 border-b border-outline-variant pb-2 uppercase text-xs">
                        {card.title}
                      </h4>
                      <ul className="font-body-md space-y-2 text-on-surface-variant text-sm">
                        {card.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="bg-surface p-5 md:p-6 border border-outline-variant sm:col-span-2">
                    <h4 className="font-label-md text-on-surface font-bold mb-3 md:mb-4 border-b border-outline-variant pb-2 uppercase text-xs">
                      Tools &amp; Systems
                    </h4>
                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 font-body-md text-on-surface-variant text-sm">
                      {["Git / Github", "PostgreSQL", "Prisma ORM", "Redis", "Postman"].map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="py-16 md:py-24 bg-surface" id="projects">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="mb-10 md:mb-16 border-b-2 border-on-surface pb-4 md:pb-6 text-center">
              <h2 className="font-headline-lg text-on-surface uppercase text-[22px] sm:text-[32px] md:text-[48px]">
                Selected Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="bg-surface border border-outline-variant hover:border-on-surface transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail */}
                  {project.thumbnail.type === "image" ? (
                    <div className="aspect-video overflow-hidden border-b border-outline-variant bg-surface-container-low flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover"
                        src={project.thumbnail.src}
                        alt={project.thumbnail.alt ?? project.title}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-inverse-surface p-4 md:p-6 font-body-md overflow-hidden flex flex-col">
                      <div className="flex items-center gap-2 mb-3 md:mb-4 border-b border-surface-variant pb-2">
                        <span className="text-surface font-bold text-xs md:text-sm">{project.thumbnail.filename}</span>
                      </div>
                      <pre className="text-surface-dim text-xs overflow-hidden">
                        <code className="italic">{project.thumbnail.snippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Body */}
                  <div className="p-5 md:p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3 md:mb-4 gap-2">
                      <h3 className="font-headline-md text-on-surface uppercase text-base md:text-2xl leading-snug">
                        {project.title}
                      </h3>
                      <span className="font-label-md text-on-surface-variant shrink-0 text-xs">{project.year}</span>
                    </div>
                    <p className="text-on-surface-variant font-body-md mb-6 md:mb-8 flex-grow text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 md:px-3 bg-surface-container-high text-on-surface font-label-md uppercase text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.links.map((link) =>
                        link.href ? (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                              link.variant === "primary"
                                ? "px-5 py-2 bg-on-surface text-surface font-bold uppercase text-label-md hover:opacity-90 text-center text-xs"
                                : "px-5 py-2 border border-on-surface text-on-surface font-bold uppercase text-label-md hover:bg-surface-container text-xs"
                            }
                          >
                            {link.label}
                          </a>
                        ) : (
                          <button
                            key={link.label}
                            className={
                              link.variant === "primary"
                                ? "px-5 py-2 bg-on-surface text-surface font-bold uppercase text-label-md hover:opacity-90 text-xs"
                                : "px-5 py-2 border border-on-surface text-on-surface font-bold uppercase text-label-md hover:bg-surface-container text-xs"
                            }
                          >
                            {link.label}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="py-24 md:py-40 min-h-[60vh] bg-surface-container-low flex items-center" id="contact">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center w-full">
            <h2 className="font-headline-lg text-on-surface mb-4 md:mb-6 uppercase text-[22px] sm:text-[32px] md:text-[48px]">
              Get In Touch
            </h2>
            <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto mb-10 md:mb-16 italic text-sm md:text-base">
              Whether you have a job opportunity, a project you'd like to collaborate on, or simply want to connect with
              a fellow software engineer, feel free to reach out.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {[
                { href: "mailto:louisweitai@gmail.com", icon: faEnvelope, label: "Email" },
                { href: "https://github.com/Louis-tai0309", icon: faGithub, label: "Github" },
                { href: "https://www.linkedin.com/in/yoong-wei-tai-b4a403306/", icon: faLinkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com/louis.tai/", icon: faInstagram, label: "Instagram" },
              ].map(({ href, icon, label }) => (
                <a key={label} className="group flex flex-col items-center gap-3 md:gap-4" href={href} target="_blank" rel="noopener noreferrer">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-sm bg-surface flex items-center justify-center text-on-surface border border-outline-variant group-hover:bg-on-surface group-hover:text-surface transition-all duration-300">
                    <FontAwesomeIcon icon={icon} size="xl" />
                  </div>
                  <span className="font-label-md text-on-surface uppercase font-bold tracking-widest text-xs">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-8 md:py-12 border-t border-outline-variant bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 md:px-8 gap-4 md:gap-6">
          <div className="font-headline-md text-on-surface font-bold uppercase text-sm md:text-base">
            Tai Yoong Wei
          </div>
          <div className="flex gap-6">
            <p className="font-label-md text-on-surface-variant uppercase text-xs">© 2026 Tai Yoong Wei</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
