"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15): [
  React.RefObject<HTMLDivElement | null>,
  boolean
] {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SlideIn({
  children,
  delay = 0,
  direction = "left",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: string;
}) {
  const [ref, inView] = useInView();
  const x = direction === "left" ? "-40px" : "40px";
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : `translateX(${x})`,
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const techColors = {
  Python: "bg-blue-900/50 text-blue-300 border-blue-700",
  SQLite: "bg-slate-800 text-slate-300 border-slate-600",
  "OpenSky API": "bg-indigo-900/50 text-indigo-300 border-indigo-700",
  Matplotlib: "bg-cyan-900/50 text-cyan-300 border-cyan-700",
  Folium: "bg-teal-900/50 text-teal-300 border-teal-700",
  Figma: "bg-pink-900/50 text-pink-300 border-pink-700",
  "UX Research": "bg-rose-900/50 text-rose-300 border-rose-700",
  Wireframing: "bg-fuchsia-900/50 text-fuchsia-300 border-fuchsia-700",
  Prototyping: "bg-purple-900/50 text-purple-300 border-purple-700",
  PHP: "bg-violet-900/50 text-violet-300 border-violet-700",
  MySQL: "bg-orange-900/50 text-orange-300 border-orange-700",
  HTML: "bg-red-900/50 text-red-300 border-red-700",
  CSS: "bg-sky-900/50 text-sky-300 border-sky-700",
  JavaScript: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
  "C#": "bg-green-900/50 text-green-300 border-green-700",
  "SQL Server Management Studio (SSMS)": "bg-slate-800 text-slate-300 border-slate-600",
  "Web Development": "bg-cyan-900/50 text-cyan-300 border-cyan-700",
  "Database Management": "bg-emerald-900/50 text-emerald-300 border-emerald-700",
  "UI/UX Design": "bg-pink-900/50 text-pink-300 border-pink-700",
  "E-Commerce Development": "bg-amber-900/50 text-amber-300 border-amber-700",
  "Software Development": "bg-green-900/50 text-green-300 border-green-700",
  "User Interface Design": "bg-fuchsia-900/50 text-fuchsia-300 border-fuchsia-700",
  "Data Management": "bg-indigo-900/50 text-indigo-300 border-indigo-700",
  "Problem Solving": "bg-orange-900/50 text-orange-300 border-orange-700",
  "Software Integration": "bg-teal-900/50 text-teal-300 border-teal-700",
  "AI Integration": "bg-violet-900/50 text-violet-300 border-violet-700",
  "Authentication Systems": "bg-red-900/50 text-red-300 border-red-700",
  "Team Collaboration": "bg-blue-900/50 text-blue-300 border-blue-700",
};

function TagBadge({ tag }: { tag: string }) {
  const cls = techColors[tag] || "bg-zinc-800 text-zinc-300 border-zinc-600";
  return (
    <span className={`inline-block text-xs px-2.5 py-1 rounded-full border ${cls} font-medium tracking-wide`}>
      {tag}
    </span>
  );
}

const projects = [
  {
    title: "Aircraft Monitoring & Analytics System",
    icon: "✈️",
    desc: [
      "Developed an IoT-based aircraft monitoring and analytics system using Python, SQLite, and the OpenSky Network API to collect and analyze real-time aircraft telemetry data.",
      "Designed a data collection pipeline for aircraft information including location, altitude and movement data.",
      "Implemented Matplotlib and Folium visualizations including traffic trends, airport detection and altitude analytics.",
    ],
    tags: ["DBMS", "Matplotlib", "SQLite", "Data Visualization", "API", "IoT", "Python", "Data Analytics"],
    highlight: false,
  },
  {
    title: "SHEIN+ UX Redesign Project",
    icon: "🎨",
    desc: [
      "Human-Computer Interaction project focused on redesigning the SHEIN platform and improving user experience.",
      "Conducted usability analysis, identified pain points, designed wireframes and interactive prototypes in Figma.",
      "Participated in user testing and evaluation to validate design improvements.",
    ],
    tags: ["UX Design", "Wireframing", "Usability Testing", "User Research", "HCI", "UI Design", "Figma", "Prototyping", "UX Research", "Design Thinking"],
    highlight: false,
  },
  {
    title: "Flower Shop E-Commerce Website",
    icon: "🌸",
    desc: [
      "Developed a full-stack flower shop e-commerce website that enables customers to browse and purchase floral products online.",
      "Designed and implemented a responsive user interface, shopping cart functionality, and database integration using PHP, MySQL, HTML, CSS, and JavaScript.",
      "The system supports product management, order processing, and seamless user interactions, demonstrating practical experience in web development, database management, and software design.",
      "Successfully completed the project with an A grade.",
    ],
    tags: ["PHP", "CSS", "DBMS", "JavaScript", "MySQL", "UI Design", "HTML"],
    highlight: false,
  },
  {
    title: "Issue Reporting Management System",
    icon: "🗂️",
    desc: [
      "Developed a desktop-based Issue Reporting Management System using C# and SQL Server Management Studio to streamline the submission and management of user-reported issues.",
      "Designed and implemented features that allow users to categorize issues, assign priority levels, provide detailed descriptions, and submit reports directly to a connected database.",
      "The system improves issue tracking and organization by enabling efficient data storage, retrieval, and management, while demonstrating practical experience in software development, database integration, and user interface design.",
    ],
    tags: ["DBMS", "Software Development", "Data Management", "Problem Solving", "SQL Management Studio", "UI Design", "C#"],
    highlight: false,
  },
  {
    title: "Drone Monitoring System",
    subtitle: "Invent for the Planet 2025",
    icon: "🏆",
    desc: [
      "Achieved 4th place at Invent for the Planet 2025, an international innovation hackathon organized by Universiti Teknologi PETRONAS and Texas A&M University.",
      "Collaborated with a multidisciplinary team to develop a drone-integrated monitoring platform designed to provide users with real-time access to drone data and system insights.",
      "Led the development and management of the website/software component of the project, implementing secure user authentication, real-time drone readings, and an AI-powered assistant feature to enhance user interaction and accessibility.",
      "Worked closely with team members throughout the ideation, development, testing, and presentation phases, demonstrating strong technical, problem-solving, and teamwork skills in a fast-paced competitive environment.",
    ],
    tags: ["PHP", "AI", "CSS", "DBMS", "Software Integration", "JavaScript", "Team Coordination", "Problem Solving", "MySQL", "Web Development", "HTML"],
    highlight: true,
  },
];

const certifications = [
  {
    provider: "BrightCHAMPS",
    type: "Certificate of Excellence",
    typeColor: "amber",
    items: [
      { name: "Python Advanced Level", date: "5 August 2024", icon: "🐍" },
    ],
  },
  {
    provider: "BrightCHAMPS",
    type: "Certificate of Achievement",
    typeColor: "cyan",
    items: [
      { name: "Web Development", date: "9 August 2024", icon: "🌐" },
      { name: "App Development", date: "26 June 2024", icon: "📱" },
      { name: "Python Beginner Level", date: "26 June 2024", icon: "🐍" },
    ],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: any;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
    }}>
      <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${project.highlight ? "border-amber-500/60 bg-gradient-to-br from-amber-950/30 to-zinc-900 shadow-lg shadow-amber-900/20" : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-600"}`}>
        <button onClick={() => setOpen(!open)} className="w-full text-left p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{project.icon}</span>
            <div>
              <h3 className={`text-xl font-semibold leading-snug ${project.highlight ? "text-amber-300" : "text-white"}`}>{project.title}</h3>
              {project.subtitle && <p className="text-amber-500/80 text-sm mt-0.5">{project.subtitle}</p>}
            </div>
          </div>
          <span className={`text-zinc-400 text-xl transition-transform duration-300 shrink-0 ${open ? "rotate-45" : "rotate-0"}`}>+</span>
        </button>
        <div style={{ maxHeight: open ? "800px" : "0", overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
          <div className="px-6 pb-6 border-t border-zinc-800/80 pt-5">
            <div className="space-y-3 text-zinc-300 leading-relaxed mb-5">
              {project.desc.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
  };

  const navItems = ["About", "Education", "Skills", "Projects", "Achievements", "Experience", "Certifications", "Contact"];

  return (
    <main className="bg-zinc-950 text-white min-h-screen overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/60 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-5xl mx-auto flex justify-center gap-6 flex-wrap px-4">
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())}
              className="text-zinc-400 hover:text-cyan-400 text-sm tracking-widest uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer">
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-zinc-400 text-sm tracking-wider">Available for opportunities</span>
          </div>
        </div>
        <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s" }}>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-5" style={{ background: "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Chava Fahmy<br />Abid
          </h1>
        </div>
        <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s ease 0.6s, transform 1s ease 0.6s" }}>
          <h2 className="text-xl md:text-2xl text-cyan-400 font-medium tracking-wider mb-6">Information Technology Student</h2>
          <p className="max-w-xl text-zinc-400 text-lg leading-relaxed">IT Student at Universiti Teknologi PETRONAS passionate about software development, databases, UI/UX, and emerging technologies.</p>
        </div>
        <div style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 1s ease 1s" }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-14 mx-auto bg-gradient-to-b from-zinc-600 to-transparent animate-pulse" />
        </div>
      </section>

      <Divider />

      {/* ABOUT */}
      <section id="about" className="max-w-5xl mx-auto py-28 px-6">
        <FadeIn>
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-medium">Who I am</span>
          <h2 className="text-5xl font-bold mt-3 mb-10">About Me</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <SlideIn delay={0.1} direction="left">
            <div className="space-y-5 text-zinc-300 leading-8 text-[1.05rem]">
              <p>I am currently pursuing a <span className="text-white font-medium">Bachelor of Information Technology (Hons)</span> at Universiti Teknologi PETRONAS, now in my sixth semester.</p>
              <p>I am adaptable, curious, and eager to learn new technologies while continuously improving existing skills. My personal values are rooted in remaining open to progress.</p>
              <p>I am currently seeking an <span className="text-cyan-400 font-medium">IT internship opportunity</span> and planning to pursue further studies — eager to bring a fresh perspective, technical aptitude, and rapid learning ability to a dynamic IT team.</p>
              <p>I am excited about the opportunity to contribute meaningfully and grow within a spacious, forward-thinking environment.</p>
            </div>
          </SlideIn>
          <SlideIn delay={0.2} direction="right">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 divide-y divide-zinc-800">
              {[
                { label: "Full Name", value: "Chava Fahmy Abid" },
                { label: "Nickname", value: "Chava" },
                { label: "Date of Birth", value: "2 November 2006, Makassar" },
                { label: "Nationality", value: "Indonesian" },
                { label: "Gender", value: "Male" },
                { label: "Driving License", value: "Class A (SIM A) — Indonesia" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start py-3 gap-4">
                  <span className="text-zinc-500 text-sm shrink-0 pt-0.5">{label}</span>
                  <span className="text-zinc-200 text-sm text-right">{value}</span>
                </div>
              ))}
            </div>
          </SlideIn>
        </div>
        <FadeIn delay={0.25}>
          <h3 className="text-xl font-semibold text-white mb-5">Personal Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "📱", label: "Mobile (MY)", value: "+60 193 028 240" },
              { icon: "💬", label: "WhatsApp (ID)", value: "+62 822 7608 4624" },
              { icon: "✉️", label: "University Email", value: "m_24004897@utp.edu.my" },
              { icon: "✉️", label: "Personal Email", value: "chavaabid.2006@gmail.com" },
              { icon: "📍", label: "Current Address", value: "Student Dorm, Universiti Teknologi Petronas, 32610 Seri Iskandar, Perak, Malaysia" },
              { icon: "🏠", label: "Home Address", value: "Jl. Kiwi, Komp. Taman Kasuari Indah Tahap II No. M-43, Medan Sunggal, Medan, Indonesia 20122" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 transition-colors duration-200">
                <span className="text-lg mt-0.5 shrink-0">{icon}</span>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-zinc-200 text-sm leading-relaxed">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {/* Sports */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-600 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-rose-950/70 border border-rose-800/60 flex items-center justify-center text-lg">🥊</div>
                <h3 className="text-white font-semibold text-lg">Sports</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Muaythai", icon: "🥊" },
                  { name: "Kickboxing", icon: "🦵" },
                  { name: "Boxing", icon: "🥋" },
                  { name: "Basketball", icon: "🏀" },
                  { name: "Table Tennis", icon: "🏓" },
                  { name: "Swimming", icon: "🏊" },
                ].map(({ name, icon }) => (
                  <span key={name} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border bg-rose-950/30 text-rose-300 border-rose-800/60 font-medium">
                    <span>{icon}</span>{name}
                  </span>
                ))}
              </div>
            </div>

            {/* Hobbies */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-600 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-purple-950/70 border border-purple-800/60 flex items-center justify-center text-lg">🎯</div>
                <h3 className="text-white font-semibold text-lg">Hobbies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Chess", icon: "♟️" },
                  { name: "Cafe Hopping", icon: "☕" },
                  { name: "Fashion", icon: "👔" },
                  { name: "Strategy Gaming", icon: "🎮" },
                  { name: "Cinema", icon: "🎬" },
                  { name: "Marvel Comics", icon: "📚" },
                ].map(({ name, icon }) => (
                  <span key={name} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border bg-purple-950/30 text-purple-300 border-purple-800/60 font-medium">
                    <span>{icon}</span>{name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <Divider />

      {/* EDUCATION */}
      <section id="education" className="max-w-5xl mx-auto py-28 px-6">
        <FadeIn>
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-medium">Background</span>
          <h2 className="text-5xl font-bold mt-3 mb-10">Education</h2>
        </FadeIn>
        <div className="space-y-5">
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 overflow-hidden hover:border-zinc-600 transition-colors duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-cyan-400 to-cyan-700" />
              <div className="pl-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Universiti Teknologi PETRONAS</h3>
                    <p className="text-zinc-400 mt-1">Malaysia</p>
                  </div>
                  <span className="text-zinc-500 text-sm mt-1">September 2024 – Present</span>
                </div>
                <p className="text-cyan-300 font-medium mt-3">Bachelor of Information Technology (Hons)</p>
                <p className="text-zinc-500 text-sm mt-1">Current Semester: 5th</p>
                <div className="flex flex-wrap gap-3 mt-5">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/50 border border-cyan-800/60">
                    <span className="text-cyan-400 text-xs uppercase tracking-wider font-medium">CGPA</span>
                    <span className="text-white font-bold">3.32</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-800/50">
                    <span className="text-amber-400 text-xs uppercase tracking-wider font-medium">Dean&apos;s List</span>
                    <span className="text-white font-bold">January 2025</span>
                    <span className="text-zinc-400 text-sm">· GPA 3.64</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 overflow-hidden hover:border-zinc-600 transition-colors duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-violet-500 to-violet-800" />
              <div className="pl-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">SMA Swasta Batari Polonia</h3>
                    <p className="text-zinc-400 mt-1">Medan, Indonesia</p>
                  </div>
                  <span className="text-zinc-500 text-sm mt-1">June 2021 – May 2024</span>
                </div>
                <p className="text-violet-300 font-medium mt-3">Senior High School</p>
                <p className="text-zinc-500 text-sm mt-1">Mathematics and Science Program</p>
                <div className="flex flex-wrap gap-3 mt-5">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-950/50 border border-violet-800/60">
                    <span className="text-violet-400 text-xs uppercase tracking-wider font-medium">Average Grade</span>
                    <span className="text-white font-bold">89.68</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* SKILLS */}
      <section id="skills" className="max-w-5xl mx-auto py-28 px-6">
        <FadeIn>
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-medium">What I bring</span>
          <h2 className="text-5xl font-bold mt-3 mb-12">Skills</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Languages */}
          <FadeIn delay={0.05}>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-600 transition-colors duration-300 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/70 border border-cyan-800/60 flex items-center justify-center text-lg">🌐</div>
                <h3 className="text-white font-semibold text-lg">Languages</h3>
              </div>
              <div className="space-y-3">
                {[
                  { lang: "Bahasa Indonesia", level: "Native", pct: 100, color: "bg-cyan-500" },
                  { lang: "English", level: "Proficient", pct: 80, color: "bg-blue-500" },
                  { lang: "Bahasa Melayu", level: "Proficient", pct: 75, color: "bg-teal-500" },
                ].map(({ lang, level, pct, color }) => (
                  <div key={lang}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-zinc-200 text-sm">{lang}</span>
                      <span className="text-zinc-500 text-xs">{level}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Computer Skills */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-600 transition-colors duration-300 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-violet-950/70 border border-violet-800/60 flex items-center justify-center text-lg">💻</div>
                <h3 className="text-white font-semibold text-lg">Computer</h3>
              </div>

              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Basic Tools</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["MS Word", "MS Excel", "PowerPoint", "Google Docs", "Google Sheets", "Google Drive", "Zoom", "MS Teams", "Canva", "Figma"].map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full border bg-zinc-800/80 text-zinc-300 border-zinc-700">{t}</span>
                ))}
              </div>

              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Programming</p>
              <div className="flex flex-wrap gap-1.5">
                {["Wireframing", "UX Research", "Usability Testing", "Prototyping", "User Research", "Design Thinking", "UX Design", "Human Computer Interaction", "API", "Matplotlib", "IoT", "SQLite", "Data Visualization", "Data Analytics", "AI", "Software Integration", "Web Development", "SQL Server Management Studio", "Software Development", "Data Management", "UI Design", "MySQL", "DBMS", "XML", "PHP", "JavaScript", "CSS", "HTML", "Python", "C#", "C++"].map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full border bg-zinc-800/80 text-zinc-300 border-zinc-700">{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Interpersonal */}
          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-600 transition-colors duration-300 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center text-lg">🤝</div>
                <h3 className="text-white font-semibold text-lg">Interpersonal</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { skill: "Communication", icon: "💬" },
                  { skill: "Teamwork & Collaboration", icon: "👥" },
                  { skill: "Active Listening", icon: "👂" },
                  { skill: "Problem Solving", icon: "🧩" },
                  { skill: "Adaptability", icon: "🔄" },
                  { skill: "Leadership", icon: "🎯" },
                ].map(({ skill, icon }) => (
                  <div key={skill} className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <span className="text-sm">{icon}</span>
                    <span className="text-zinc-200 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto py-28 px-6">
        <FadeIn>
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-medium">What I&apos;ve built</span>
          <h2 className="text-5xl font-bold mt-3 mb-12">Projects</h2>
        </FadeIn>
        <div className="space-y-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="max-w-5xl mx-auto py-28 px-6">
        <FadeIn>
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-medium">Recognition</span>
          <h2 className="text-5xl font-bold mt-3 mb-12">Achievements</h2>
        </FadeIn>

        {/* UTP */}
        <FadeIn delay={0.05}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Universiti Teknologi PETRONAS</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
        </FadeIn>

        <div className="space-y-4 mb-12">
          {/* Dean List */}
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl border border-cyan-800/50 bg-cyan-950/20 p-6 hover:border-cyan-600/60 transition-colors duration-300">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">🎓</span>
                  <div>
                    <p className="text-white font-semibold text-lg">Dean&apos;s List</p>
                    <p className="text-cyan-400 text-sm mt-0.5">Universiti Teknologi PETRONAS</p>
                  </div>
                </div>
                <span className="text-zinc-500 text-sm">January 2025</span>
              </div>
              <p className="text-zinc-400 text-sm mt-3 pl-10">GPA 3.64 — Academic excellence recognition for outstanding semester performance.</p>
            </div>
          </FadeIn>

          {/* Invent for the Planet */}
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl border border-amber-600/50 bg-amber-950/20 p-6 hover:border-amber-500/60 transition-colors duration-300">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">🏆</span>
                  <div>
                    <p className="text-white font-semibold text-lg">4th Place — Invent for the Planet 2025</p>
                    <p className="text-amber-400 text-sm mt-0.5">UTP & Texas A&amp;M University · 9 February 2025</p>
                  </div>
                </div>
              </div>
              <p className="text-zinc-400 text-sm mt-3 pl-10">Developed and managed a website/software system integrated with drone hardware. Built a secure login system, displayed real-time drone readings, and integrated an AI-powered assistant feature for users.</p>
            </div>
          </FadeIn>
        </div>

        {/* High School */}
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-zinc-500 text-xs uppercase tracking-widest">SMA Swasta Batari Polonia, Medan</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-600 transition-colors duration-300">
            <div className="space-y-0 divide-y divide-zinc-800/80">
              {[
                { award: "Loyalty Award", date: "7 June 2024", icon: "🏅" },
                { award: "Most Relevant Project — Science Fair 2024", date: "6 March 2024", icon: "🔬" },
                { award: "Best Presentation & Best Project — IDP Week", date: "1 March 2024", icon: "🥇" },
                { award: "Best New Talent — Arts Festival 2023", date: "5 December 2023", icon: "🌟" },
                { award: "Captain — Sports Day 2023", date: "13 October 2023", icon: "🎖️" },
                { award: "2nd Place in Relay Race — Sports Day 2023", date: "13 October 2023", icon: "🥈" },
                { award: "Artistic Performance — Arts Festival 2023", date: "5 June 2023", icon: "🎭" },
                { award: "Best Project Presentation — IDP Week", date: "2 September 2022", icon: "🥇" },
                { award: "Participation — Pusat Olimpiade Sains Indonesia 2022", date: "21 August 2022", icon: "🔭" },
                { award: "3rd Place in Fashion Show — Family Day", date: "16 August 2022", icon: "🥉" },
                { award: "1st Runner Up in Basketball 3-on-3 CBD — Arts & Sports Festival 2022", date: "8 June 2022", icon: "🏀" },
                { award: "Debate Finalist — English Week", date: "18 February 2022", icon: "🎤" },
                { award: "Most Innovative Project — Project Week", date: "3 September 2021", icon: "💡" },
              ].map(({ award, date, icon }) => (
                <div key={award} className="flex items-center justify-between gap-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-base shrink-0">{icon}</span>
                    <span className="text-zinc-200 text-sm">{award}</span>
                  </div>
                  <span className="text-zinc-600 text-xs shrink-0">{date}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <Divider />

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-5xl mx-auto py-28 px-6">
        <FadeIn>
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-medium">Involvement</span>
          <h2 className="text-5xl font-bold mt-3 mb-12">Experience</h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Universiti Teknologi PETRONAS</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative rounded-2xl border border-emerald-700/50 bg-emerald-950/20 p-6 hover:border-emerald-500/60 transition-colors duration-300">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">☀️</span>
                <div>
                  <p className="text-white font-semibold text-lg">Treasurer (HICOM)</p>
                  <p className="text-emerald-400 text-sm mt-0.5">Native Power Project · MPU4 Community Project</p>
                </div>
              </div>
              <span className="text-zinc-500 text-sm shrink-0">25–26 April 2026</span>
            </div>
            <p className="text-zinc-400 text-sm mt-3 pl-10 leading-relaxed">
              Served as Treasurer in the Higher Committee (HICOM) for the Native Power Project, a community initiative focused on installing solar-powered lighting systems in a rural village in Malaysia. Responsible for managing the project's finances, budgeting, and fund allocation throughout the planning and execution phases.
            </p>
            <div className="mt-4 pl-10 flex flex-wrap gap-2">
              {["Community Service", "Project Management", "Treasurer", "Solar Energy", "Rural Development"].map(tag => (
                <span key={tag} className="inline-block text-xs px-2.5 py-1 rounded-full border bg-emerald-950/40 text-emerald-300 border-emerald-800/60 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <Divider />

      {/* CERTIFICATIONS */}
      <section id="certifications" className="max-w-5xl mx-auto py-28 px-6">
        <FadeIn>
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-medium">Credentials</span>
          <h2 className="text-5xl font-bold mt-3 mb-12">Certifications</h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-zinc-500 text-xs uppercase tracking-widest">BrightCHAMPS Online Program</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
        </FadeIn>

        <div className="space-y-5">
          {certifications.map((group, gi) => (
            <FadeIn key={group.type} delay={0.1 + gi * 0.1}>
              <div className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
                group.typeColor === "amber"
                  ? "border-amber-600/50 bg-amber-950/20 hover:border-amber-500/60"
                  : "border-cyan-800/50 bg-cyan-950/20 hover:border-cyan-600/60"
              }`}>
                {/* Group header */}
                <div className="px-6 pt-5 pb-4 flex items-center gap-3 border-b border-zinc-800/60">
                  <span className="text-xl">{group.typeColor === "amber" ? "🏅" : "📜"}</span>
                  <div>
                    <p className={`font-semibold text-base ${group.typeColor === "amber" ? "text-amber-300" : "text-cyan-300"}`}>
                      {group.type}
                    </p>
                    <p className="text-zinc-500 text-xs mt-0.5">{group.provider}</p>
                  </div>
                </div>
                {/* Cert items */}
                <div className="divide-y divide-zinc-800/60">
                  {group.items.map(({ name, date, icon }) => (
                    <div key={name} className="flex items-center justify-between gap-4 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-base shrink-0">{icon}</span>
                        <span className="text-zinc-200 text-sm font-medium">{name}</span>
                      </div>
                      <span className="text-zinc-500 text-xs shrink-0">{date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider />

      {/* CONTACT */}
      <section id="contact" className="max-w-5xl mx-auto py-28 px-6">
        <FadeIn>
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-medium">Get in touch</span>
          <h2 className="text-5xl font-bold mt-3 mb-10">Contact</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: "✉️", label: "University Email", value: "m_24004897@utp.edu.my", href: "mailto:m_24004897@utp.edu.my", delay: 0.1 },
            { icon: "✉️", label: "Personal Email", value: "chavaabid.2006@gmail.com", href: "mailto:chavaabid.2006@gmail.com", delay: 0.15 },
            { icon: "📱", label: "Mobile (Malaysia)", value: "+60 193 028 240", href: "tel:+601930282400", delay: 0.2 },
            { icon: "💬", label: "WhatsApp (Indonesia)", value: "+62 822 7608 4624", href: "https://wa.me/628227608462", delay: 0.25 },
            { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/chava-fahmy-abid-693783411", href: "https://linkedin.com/in/chava-fahmy-abid-693783411", delay: 0.3 },
          ].map(({ icon, label, value, href, delay }) => (
            <FadeIn key={label} delay={delay}>
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="flex gap-3 items-start p-4 rounded-xl border border-zinc-700 bg-zinc-900/60 hover:border-cyan-600 hover:bg-cyan-950/20 transition-all duration-300 group">
                <span className="text-lg mt-0.5 shrink-0">{icon}</span>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-zinc-300 group-hover:text-white text-sm transition-colors break-all">{value}</p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800/60 py-8 text-center text-zinc-600 text-sm">
        © {new Date().getFullYear()} Chava Fahmy Abid
      </footer>

    </main>
  );
}