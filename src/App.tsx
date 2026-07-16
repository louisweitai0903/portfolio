import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

const polaroidImages = [
  { alt: "Car Enthusiast", src: "./imgs/cars.png" },
  { alt: "Gaming Setup", src: "./imgs/sl.png" },
  { alt: "Travel and Food", src: "./imgs/chongqing.png" },
  { alt: "Gaming Setup", src: "./imgs/jiuzaigou.jpg" },
  { alt: "Gaming Setup", src: "./imgs/bkk_temple.jpg" },
  { alt: "Gaming Setup", src: "./imgs/bkk_city.jpg" },
  { alt: "Gaming Setup", src: "./imgs/panda.JPG" },
  { alt: "Gaming Setup", src: "./imgs/langkawi_sunset.png" },
  { alt: "Gaming Setup", src: "./imgs/chongqing.png" }
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [polaroidIndex, setPolaroidIndex] = useState(0);

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
        // Compensate for fixed top navbar height (64px)
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
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-in-view");
          entry.target.classList.remove("section-out-view");
        } else {
          entry.target.classList.add("section-out-view");
          entry.target.classList.remove("section-in-view");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("section-out-view");
      section.classList.add("scroll-section");
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const getLinkClass = (id: string) => {
    return activeSection === id
      ? "text-on-surface pb-1 transition-all border-b-2 border-on-surface font-bold text-body-md"
      : "hover:text-on-surface transition-colors duration-200 font-label-md text-on-surface-variant text-body-md";
  };

  return (
    <div className="font-body-md text-body-md text-on-surface-variant selection:bg-primary-fixed selection:text-on-primary-fixed bg-background overflow-x-hidden">
      {/* TopNavBar - Fixed permanently at the top of the viewport */}
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-sm border-b border-outline-variant h-16">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-gutter h-full">
          <div className="font-headline-md text-headline-md font-bold text-on-surface">
            TAI YOONG WEI
          </div>
          <div className="hidden md:flex space-x-8">
            <a className={getLinkClass("home")} href="#home">HOME</a>
            <a className={getLinkClass("about")} href="#about">ABOUT ME</a>
            <a className={getLinkClass("stack")} href="#stack">MY STACK</a>
            <a className={getLinkClass("projects")} href="#projects">PROJECTS</a>
            <a className={getLinkClass("contact")} href="#contact">CONTACT</a>
          </div>
          <a className="px-6 py-2 bg-on-surface text-surface font-medium rounded-sm hover:opacity-90 transition-opacity uppercase text-label-md" href="/latest_resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-16 bg-surface-container-low" id="home">
          <div className="relative z-10 text-center px-gutter max-w-4xl mx-auto">
            <span className="font-label-md text-on-surface-variant tracking-[0.2em] block mb-4 uppercase">LOUIS</span>
            <h1 className="font-headline-lg text-[48px] md:text-[64px] text-on-surface mb-6 uppercase leading-tight flex flex-wrap justify-center gap-x-4">
              <span>Tai</span>
              <span>Yoong</span>
              <span>Wei</span>
            </h1>
            <p className="font-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto border-y border-outline-variant py-6">
              I’m a <span className="text-on-surface font-bold underline decoration-1 underline-offset-4">Fullstack Software Engineer</span> and a lover of cars, gaming, food and travel. Currently based in Petaling Jaya, Malaysia working at Ouch!
            </p>
            <div className="flex items-center justify-center gap-3 bg-surface border border-outline px-6 py-3 rounded-sm inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-surface opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-label-md text-on-surface uppercase tracking-wider">Open to Relocation</span>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-24 bg-surface" id="about">
          <div className="max-w-7xl mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <h2 className="font-headline-lg text-on-surface mb-8 uppercase border-b-2 border-on-surface inline-block pb-2 text-[36px] md:text-[48px]">A little bit about me</h2>
              <div className="space-y-6 text-on-surface-variant font-body-lg leading-relaxed">
                <p>Hi! I'm a Fullstack Software Engineer graduated from Sunway University in April 2025. I am currently based in <strong className="text-on-surface">Petaling Jaya, Malaysia</strong>, where I build seamless and accessible fintech products at <strong className="text-on-surface">Ouch!</strong>. I enjoy bridging the gap between clean backend architecture and intuitive frontend experiences using modern technologies like <span className="text-on-surface font-medium italic">React</span>, <span className="text-on-surface font-medium italic">Django</span> and <span className="text-on-surface font-medium italic">VueJs</span>.</p>
                <p>When I'm not in front of a code editor, you can usually find me:</p>
                <div className="pt-4 border-t border-outline-variant">
                  <ul className="space-y-4 font-body-md">
                    <li className="flex gap-4 items-start"><span className="text-on-surface font-bold">01.</span><span className=""><strong>On the road:</strong> Exploring local car culture, driving dynamics, or planning my next road trip.</span></li>
                    <li className="flex gap-4 items-start"><span className="text-on-surface font-bold">02.</span><span className=""><strong>In a lobby:</strong> Diving into games like Dota2 or CS2.</span></li>
                    <li className="flex gap-4 items-start"><span className="text-on-surface font-bold">03.</span><span className=""><strong>Exploring:</strong> Traveling to new destinations and hunting down the best local eats.</span></li>
                  </ul>
                </div>
                <p className="pt-4 border-t border-outline-variant">I love connecting with fellow developers, car enthusiasts, and gamers. Let's chat!</p>
                <div className="flex gap-6 pt-8 border-t border-outline-variant">
                  <a className="text-on-surface hover:text-on-surface-variant transition-colors" href="mailto:louisweitai@gmail.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faEnvelope} size="lg" /></a>
                  <a className="text-on-surface hover:text-on-surface-variant transition-colors" href="https://www.linkedin.com/in/yoong-wei-tai-b4a403306/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
                  <a className="text-on-surface hover:text-on-surface-variant transition-colors" href="https://www.instagram.com/louis.tai/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                  <a className="text-on-surface hover:text-on-surface-variant transition-colors" href="https://github.com/Louis-tai0309" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
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

        {/* Experience & Stack Section */}
        <section className="py-24 bg-surface-container-low" id="stack">
          <div className="max-w-7xl mx-auto px-gutter">
            <div className="text-center mb-20">
              <h2 className="font-headline-lg text-on-surface uppercase tracking-widest text-[32px] md:text-[48px]">My Technical Universe</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
              {/* Left Column: Work Experiences */}
              <div>
                <h3 className="font-headline-md text-on-surface mb-12 flex items-center gap-3 uppercase border-l-4 border-on-surface pl-4">
                  Work Experiences
                </h3>
                <div className="relative space-y-12 pl-12">
                  {/* Current Job */}
                  <div className="relative">
                    <div className="absolute -left-8 top-1">
                      <div className="timeline-dot active"></div>
                      <div className="timeline-line"></div>
                    </div>
                    <div className="bg-surface p-6 border border-outline-variant">
                      <h4 className="font-headline-md text-on-surface mb-1">Junior Fullstack Software Engineer</h4>
                      <div className="font-label-md text-on-surface-variant mb-4 uppercase">Ouch! | April 2025 - Present</div>
                      <p className="text-on-surface-variant font-body-md">Building digital-first insurtech solutions focusing on core system maintenance and feature development.</p>
                    </div>
                  </div>
                  {/* Internship */}
                  <div className="relative">
                    <div className="absolute -left-8 top-1">
                      <div className="timeline-dot"></div>
                    </div>
                    <div className="bg-surface p-6 border border-outline-variant">
                      <h4 className="font-headline-md text-on-surface mb-1">Software Engineer Intern</h4>
                      <div className="font-label-md text-on-surface-variant mb-4 uppercase">Ouch! | Jan 2025 - April 2025</div>
                      <p className="text-on-surface-variant font-body-md">Contributed to internal tools and the Pokedex project using Django and VueJS.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-16">
                  <h3 className="font-headline-md text-on-surface mb-8 uppercase border-l-4 border-on-surface pl-4">Languages</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-surface-container-high text-on-surface font-label-md border border-outline-variant">ENGLISH</span>
                    <span className="px-4 py-2 bg-surface-container-high text-on-surface font-label-md border border-outline-variant">MANDARIN</span>
                    <span className="px-4 py-2 bg-surface-container-high text-on-surface font-label-md border border-outline-variant">CANTONESE</span>
                    <span className="px-4 py-2 bg-surface-container-high text-on-surface font-label-md border border-outline-variant">MALAY</span>
                  </div>
                </div>
              </div>
              {/* Right Column: Dev Stack */}
              <div>
                <h3 className="font-headline-md text-on-surface mb-12 flex items-center gap-3 uppercase border-l-4 border-on-surface pl-4">
                  Dev Stack
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-surface p-6 border border-outline-variant">
                    <h4 className="font-label-md text-on-surface font-bold mb-4 border-b border-outline-variant pb-2 uppercase">Languages</h4>
                    <ul className="font-body-md space-y-2 text-on-surface-variant">
                      <li>Python</li>
                      <li>JavaScript</li>
                      <li>TypeScript</li>
                    </ul>
                  </div>
                  <div className="bg-surface p-6 border border-outline-variant">
                    <h4 className="font-label-md text-on-surface font-bold mb-4 border-b border-outline-variant pb-2 uppercase">Frameworks</h4>
                    <ul className="font-body-md space-y-2 text-on-surface-variant">
                      <li>Django, FastAPI</li>
                      <li>NodeJs, React</li>
                      <li>VueJs, Tailwind</li>
                    </ul>
                  </div>
                  <div className="bg-surface p-6 border border-outline-variant">
                    <h4 className="font-label-md text-on-surface font-bold mb-4 border-b border-outline-variant pb-2 uppercase">Infrastructure</h4>
                    <ul className="font-body-md space-y-2 text-on-surface-variant">
                      <li>Docker, GCP</li>
                      <li>Nginx, CI/CD</li>
                    </ul>
                  </div>
                  <div className="bg-surface p-6 border border-outline-variant">
                    <h4 className="font-label-md text-on-surface font-bold mb-4 border-b border-outline-variant pb-2 uppercase">AI / ML</h4>
                    <ul className="font-body-md space-y-2 text-on-surface-variant">
                      <li>Gemini, Codex</li>
                      <li>RAG Pipelines</li>
                    </ul>
                  </div>
                  <div className="bg-surface p-6 border border-outline-variant sm:col-span-2">
                    <h4 className="font-label-md text-on-surface font-bold mb-4 border-b border-outline-variant pb-2 uppercase">Tools &amp; Systems</h4>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 font-body-md text-on-surface-variant">
                      <span>Git / Github</span>
                      <span>PostgreSQL</span>
                      <span>Prisma ORM</span>
                      <span>Redis</span>
                      <span>Postman</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 bg-surface" id="projects">
          <div className="max-w-7xl mx-auto px-gutter">
            <div className="mb-16 border-b-2 border-on-surface pb-6 text-center">
              <h2 className="font-headline-lg text-on-surface uppercase text-[48px]">Selected Projects</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Project 1 */}
              <div className="bg-surface border border-outline-variant hover:border-on-surface transition-all duration-300 flex flex-col group">
                <div className="aspect-video overflow-hidden border-b border-outline-variant">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVjQx6J_DNBfr0HcrwzvPSZz_wpGfKcelbSC2joqdW_ZLDgrocwW16dNqJNBrTxiixK2pNsMVjHFtz3RsslFj7nu1F8nW6pi3pHQnx9jKepmHZEmNIZfq9Lqj2N0j1-UEnJ3cHDaQJFqdUqlId4ZeZkTzZet8PvBhrCcTKGimIRqjQejNFT9NsoTHE_jEOzJYQTgsGxl9pT2Ta1v44g3JlVK9dLs3kSk6sFJ-FfqZB9RrTda0oJD9v" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline-md text-on-surface uppercase">AI Risk Surveyor Tool</h3>
                    <span className="font-label-md text-on-surface-variant">2026</span>
                  </div>
                  <p className="text-on-surface-variant font-body-md mb-8 flex-grow">
                    An intelligent document processing and site analysis application built for risk surveyors. Powered by Gemini and a RAG pipeline.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">React</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">FastAPI</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">Gemini</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">GCP</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 bg-on-surface text-surface font-bold uppercase text-label-md hover:opacity-90">Visit Site</button>
                    <button className="px-6 py-2 border border-on-surface text-on-surface font-bold uppercase text-label-md hover:bg-surface-container">Github</button>
                  </div>
                </div>
              </div>
              {/* Project 2 */}
              <div className="bg-surface border border-outline-variant hover:border-on-surface transition-all duration-300 flex flex-col group">
                <div className="aspect-video overflow-hidden border-b border-outline-variant bg-surface-container-low flex items-center justify-center">
                  <img className="w-full h-auto" src="/imgs/ouch.png"/>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline-md text-on-surface uppercase">Ouch Core System</h3>
                    <span className="font-label-md text-on-surface-variant">PRESENT</span>
                  </div>
                  <p className="text-on-surface-variant font-body-md mb-8 flex-grow">
                    Core Maintainer of Ouch!'s central insurtech engine, driving the automated infrastructure that powers the policy lifecycle and claims processing for our digital-first insurance platform.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">Django</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">PostgreSQL</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">Docker</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">GCP</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="https://ouch.my/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-on-surface text-surface font-bold uppercase text-label-md hover:opacity-90 block text-center">Visit Website</a>
                  </div>
                </div>
              </div>
              {/* Project 3 */}
              <div className="bg-surface border border-outline-variant hover:border-on-surface transition-all duration-300 flex flex-col group">
                <div className="aspect-video bg-inverse-surface p-6 font-body-md overflow-hidden flex flex-col">
                  <div className="flex items-center gap-2 mb-4 border-b border-surface-variant pb-2">
                    <span className="text-surface font-bold">pokedex.vue</span>
                  </div>
                  <pre className="text-surface-dim text-xs overflow-hidden">
                    <code className="italic">
                      {`export default {
  data() {
    return {
      pokemon: [],
      loading: true
    }
  },
  async mounted() {
    this.pokemon = await api.get('/pokemon');
  }
}`}
                    </code>
                  </pre>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-headline-md text-on-surface uppercase mb-4">Pokedex Fullstack</h3>
                  <p className="text-on-surface-variant font-body-md mb-8 flex-grow">
                    A fullstack web application featuring a Django backend that integrates with the PokeAPI and dynamic Vue.js frontend.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">VueJS</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">Django</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">Nginx</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">Github Action</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 border border-on-surface text-on-surface font-bold uppercase text-label-md hover:bg-surface-container">View Repo</button>
                  </div>
                </div>
              </div>
              {/* Project 4 */}
              <div className="bg-surface border border-outline-variant hover:border-on-surface transition-all duration-300 flex flex-col group">
                <div className="aspect-video overflow-hidden border-b border-outline-variant">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSRo6X4qJO9DWavQWf0AvRFGgGgfFLJuzoirX56WeifXMzASpzOKtW450nqYo_KVtWee4hXki9RXXWKPFKOjtAGaK6Mew3ZXCkVDGNMohaCGfrKLttWHtxRPYQVKX0qVx8iA6C98-OLjr7zN5Y0KHl5_V7oBpKzsRKK3I9uA6SEAc-5SM2SJW0TnghAokzt6IU8SmxZRh6hBV6gxaejnFzAMZ0TB5qzw4oOYD8F0cZE5xnqJQ1_WyD" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-headline-md text-on-surface uppercase mb-4">LLM Course Recommender</h3>
                  <p className="text-on-surface-variant font-body-md mb-8 flex-grow">
                    Machine learning-powered application helping students make data-driven decisions on university courses.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">Flask</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">Python</span>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface font-label-md uppercase">LLMs</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 border border-on-surface text-on-surface font-bold uppercase text-label-md hover:bg-surface-container">Github</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-surface-container-low" id="contact">
          <div className="max-w-7xl mx-auto px-gutter text-center">
            <h2 className="font-headline-lg text-on-surface mb-6 uppercase text-[48px]">Get In Touch</h2>
            <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto mb-16 italic">
              Whether you have a job opportunity, a project you’d like to collaborate on, or simply want to connect with a fellow software engineer, feel free to reach out.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              <a className="group flex flex-col items-center gap-4" href="mailto:louisweitai@gmail.com" target="_blank" rel="noopener noreferrer">
                <div className="w-16 h-16 rounded-sm bg-surface flex items-center justify-center text-on-surface border border-outline-variant group-hover:bg-on-surface group-hover:text-surface transition-all duration-300">
                  <FontAwesomeIcon icon={faEnvelope} size="2x" />
                </div>
                <span className="font-label-md text-on-surface uppercase font-bold tracking-widest">Email</span>
              </a>
              <a className="group flex flex-col items-center gap-4" href="https://github.com/Louis-tai0309" target="_blank" rel="noopener noreferrer">
                <div className="w-16 h-16 rounded-sm bg-surface flex items-center justify-center text-on-surface border border-outline-variant group-hover:bg-on-surface group-hover:text-surface transition-all duration-300">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </div>
                <span className="font-label-md text-on-surface uppercase font-bold tracking-widest">Github</span>
              </a>
              <a className="group flex flex-col items-center gap-4" href="https://www.linkedin.com/in/yoong-wei-tai-b4a403306/" target="_blank" rel="noopener noreferrer">
                <div className="w-16 h-16 rounded-sm bg-surface flex items-center justify-center text-on-surface border border-outline-variant group-hover:bg-on-surface group-hover:text-surface transition-all duration-300">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </div>
                <span className="font-label-md text-on-surface uppercase font-bold tracking-widest">LinkedIn</span>
              </a>
              <a className="group flex flex-col items-center gap-4" href="https://www.instagram.com/louis.tai/" target="_blank" rel="noopener noreferrer">
                <div className="w-16 h-16 rounded-sm bg-surface flex items-center justify-center text-on-surface border border-outline-variant group-hover:bg-on-surface group-hover:text-surface transition-all duration-300">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </div>
                <span className="font-label-md text-on-surface uppercase font-bold tracking-widest">Instagram</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-outline-variant bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-gutter gap-6">
          <div className="font-headline-md text-on-surface font-bold uppercase">
            Tai Yoong Wei
          </div>
          <div className="flex gap-6">
            <p className="font-label-md text-on-surface-variant uppercase">
              © 2026 Tai Yoong Wei
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
