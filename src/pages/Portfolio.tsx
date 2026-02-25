// src/pages/Portfolio.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaDownload,
  FaPaperPlane,
  FaLaptopCode,
  FaReact,
  FaMobileAlt,
} from "react-icons/fa";
import {
  SiFlutter,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
  SiFigma,
  SiNextdotjs,
  SiPython,
} from "react-icons/si";
import { HiSparkles, HiArrowNarrowRight } from "react-icons/hi";

import MyPhoto from "../assets/myphoto.jpg";
import ResumePDF from "../assets/Yokisha_Poudel_Resume.pdf";
const roles = ["Frontend Architect", "Software Engineer", "UI/UX Visionary"];

const techStack = [
  { name: "React", icon: <FaReact className="text-blue-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "Flutter", icon: <SiFlutter className="text-cyan-400" /> },
  { name: "Python", icon: <SiPython className="text-yellow-400" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-300" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "Figma", icon: <SiFigma className="text-pink-400" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
];

const timeline = [
  {
    year: "Nov 2025 – Feb 2026",
    title: "Frontend Engineer (Intern)",
    org: "Midas Health Services",
    desc: "I didn't just write code; I built digital tools for Hospitals. I architected high-performance interfaces using React and TypeScript, focusing on reducing friction in medical workflows and ensuring patient data was both accessible and secure.",
  },
  {
    year: "2022 – 2026",
    title: "B.E. in Computer Engineering",
    org: "Advanced College of Engineering",
    desc: "My academic career is defined by a deep-dive into how software actually works. I’ve spent these years bridging the gap between heavy-duty engineering principles and the elegant frontend experiences that users love.",
  },
  {
    year: "2019 – 2021",
    title: "Science & Mathematics",
    org: "Uniglobe College",
    desc: "Developed the analytical foundation that allows me to solve complex logical problems today. Graduated with a focus on physics, which still influences my love for precision and structured systems.",
  },
];

const projects = [
  {
    title: "OvaRythm",
    category: "AI + Healthcare",
    desc: "Health tracking is personal, so I made it intelligent. I engineered a sophisticated mobile ecosystem that uses LSTM neural networks to predict cycles, paired with a custom Generative AI to provide users with empathetic, data-driven health insights.",
    tech: ["Flutter", "Firebase", "LSTM Model"],
    github: "https://github.com/Yokisha/Period-Tracker.git",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Retinal Disease AI",
    category: "Deep Learning Research",
    desc: "Can code save eyesight? I developed a medical-grade computer vision system using U-Net++ architectures to analyze OCT scans. This project automates the detection of retinal diseases, aiming to bring clinical-level diagnostic precision to software.",
    tech: ["Python", "PyTorch", "Computer Vision"],
    github: "https://github.com/Yokisha/OCT-RETINAL-SEGMENTATION-.git",
    color: "from-purple-600 to-indigo-600",
  },
  {
    title: "Attendance Pro",
    category: "Enterprise Solution",
    desc: "Eliminating the chaos of manual records. I built a real-time management engine that handles high-concurrency institutional data, giving administrators a clean, role-based dashboard to manage operations with zero lag.",
    tech: ["React", "TypeScript", "Firebase"],
    github: "https://github.com/Yokisha/Attendance-System.git",
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Smart Expense Splitter",
    category: "FinTech",
    desc: "Finance software is usually boring and difficult. I designed this to be the opposite: a friction-less, real-time app that handles complex bill-splitting logic with a UI so intuitive that managing money actually feels easy.",
    tech: ["Flutter", "Supabase", "Dart"],
    github: "https://github.com/Yokisha/Expense-Splitter",
    color: "from-emerald-500 to-teal-600",
  },
];

/* -------------------------------------------------------------------------- */
/*                           COMPONENTS                                       */
/* -------------------------------------------------------------------------- */

const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles: any[] = [];
    
    const properties = {
      particleColor: "rgba(167, 139, 250, 1)",
      lineColor: "rgba(167, 139, 250, 1)",
      particleRadius: 2.5,
      particleCount: 70,
      lineLength: 150,
    };

    class Particle {
      x: number; y: number; vX: number; vY: number;
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vX = (Math.random() - 0.5) * 1;
        this.vY = (Math.random() - 0.5) * 1;
      }
      move() {
        if (this.x > w || this.x < 0) this.vX *= -1;
        if (this.y > h || this.y < 0) this.vY *= -1;
        this.x += this.vX;
        this.y += this.vY;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < properties.particleCount; i++) particles.push(new Particle());
    };

    const drawLines = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.sqrt(Math.pow(particles[j].x - particles[i].x, 2) + Math.pow(particles[j].y - particles[i].y, 2));
          if (dist < properties.lineLength) {
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist/properties.lineLength})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.move(); p.draw(); });
      drawLines();
      requestAnimationFrame(loop);
    };

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    });

    init();
    loop();
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30 pointer-events-none" />;
};

const AtomProfile = () => (
  <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, type: "spring" }}
      className="relative z-20 w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-indigo-400/50 shadow-[0_0_60px_rgba(129,140,248,0.4)] bg-black"
    >
      <img src={MyPhoto} alt="Yokisha" className="w-full h-full object-cover" />
    </motion.div>
    {/* Animated Rings */}
    {[8, 10, 12].map((dur, i) => (
      <motion.div
        key={i}
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border border-white/20"
        style={{ 
          width: `${100 + i * 20}%`, 
          height: `${100 + i * 20}%`,
          rotateX: 60,
          rotateY: i * 15
        }}
      />
    ))}
  </div>
);

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragElastic={0.16}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileHover={{ cursor: "grab", scale: 1.02 }}
      className={`relative transform-gpu perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="fixed top-0 inset-x-0 z-50 flex justify-center py-6 pointer-events-none"
  >
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 pointer-events-auto flex items-center gap-8 shadow-2xl">
      <span className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">YP.</span>
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
        {["About", "Projects", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
        ))}
      </div>
      <a href={ResumePDF} target="_blank" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-xs font-bold text-white transition flex items-center gap-2">
        Resume <FaDownload size={10} />
      </a>
    </div>
  </motion.nav>
);

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function Portfolio() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: "bfde73a0-a5f7-42d7-93fb-9c9cd13e557e", ...formData }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("Success! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong. Try again?");
      }
    } catch {
      setStatus("Error sending message.");
    } finally {
      setSending(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <div className="bg-[#0b0b15] min-h-screen text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      <NeuralNetworkBackground />
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 px-4">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center z-10">
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-medium"
            >
              <HiSparkles className="animate-pulse" /> Engineering the Future
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 filter drop-shadow-[0_0_20px_rgba(167,139,250,0.3)]">
                Yokisha Poudel
              </span>
            </h1>

            <div className="h-8 text-xl md:text-2xl text-gray-300 font-medium">
              I am a{" "}
              <AnimatePresence mode="wait">
                <motion.span key={roleIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="inline-block text-indigo-400 font-bold">
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed text-lg">
              I build <strong>high-performance digital products</strong> that bridge the gap between human needs and technical excellence. 
              Currently specializing in <strong>React, Flutter, and AI implementation.</strong>
            </p>

            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <SocialBtn href="https://github.com/Yokisha" icon={<FaGithub />} />
              <SocialBtn href="https://www.linkedin.com/in/yokisha-p-873a382a0" icon={<FaLinkedin />} />
              <SocialBtn href="mailto:yokishaa.poudel@gmail.com" icon={<FaEnvelope />} />
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <AtomProfile />
          </div>
        </div>

        {/* Tech Marquee */}
        <div className="w-full mt-20 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden py-6 z-10">
          <motion.div className="flex gap-16 min-w-max" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            {[...techStack, ...techStack].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-400 font-semibold text-lg opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-2xl">{t.icon}</span> {t.name}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT & TIMELINE */}
      <section id="about" className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">My Evolution</h2>
            <div className="h-1.5 w-20 bg-indigo-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1 bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl h-full flex flex-col justify-center">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                <FaLaptopCode size={24}/>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Focused on Impact</h3>
              <p className="text-gray-400 leading-relaxed">
                I believe code is only as good as the problem it solves. My approach combines <strong>engineering rigor</strong> with 
                <strong> empathetic design</strong> to create software that feels as natural as it is powerful.
              </p>
            </div>

            <div className="md:col-span-2 space-y-6">
              {timeline.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="group relative bg-gray-900/30 backdrop-blur-md border border-white/5 hover:border-indigo-500/30 p-6 rounded-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                    <span className="text-xs font-mono text-indigo-400 bg-indigo-900/20 px-3 py-1 rounded-full">{item.year}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-300 mb-3">{item.org}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS */}
      <section id="projects" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-bold">Selected Works</h2>
              <p className="text-gray-400 mt-3 text-lg">Solving complex problems with elegant solutions.</p>
            </div>
            <a href="https://github.com/Yokisha" target="_blank" className="flex items-center gap-2 text-indigo-400 hover:text-white transition font-bold">
              Full Archive <HiArrowNarrowRight/>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((p, i) => (
              <TiltCard key={i} className="h-full">
                <div className="relative h-full bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${p.color}`} />
                  <div className="p-8 flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">{p.category}</span>
                      <a href={p.github} target="_blank" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 transition text-white">
                        <FaGithub size={24}/>
                      </a>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">{p.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-8 flex-grow">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {p.tech.map(t => (
                        <span key={t} className="text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br ${p.color} opacity-0 blur-[100px] group-hover:opacity-20 transition duration-700`} />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTACT */}
      <section id="contact" className="py-24 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="relative bg-gray-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-20 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="text-5xl font-bold leading-tight">Let's build <br/><span className="text-indigo-400">something great.</span></h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  I'm currently open to new opportunities and ambitious projects. Whether you have a question or just want to say hi, my inbox is always open.
                </p>
                <div className="space-y-5 pt-4">
                  {[
                    { icon: <FaEnvelope className="text-indigo-400"/>, text: "yokishaa.poudel@gmail.com" },
                    { icon: <FaMobileAlt className="text-purple-400"/>, text: "+977 9810292911" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5 text-gray-300">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">{item.icon}</div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-6">
                  <SocialBtn href="https://www.linkedin.com/in/yokisha-p-873a382a0" icon={<FaLinkedin />} />
                  <SocialBtn href="https://github.com/Yokisha" icon={<FaGithub />} />
                  <SocialBtn href="https://www.instagram.com/yokishaaa" icon={<FaInstagram />} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 bg-white/5 p-8 rounded-[2rem] border border-white/10">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 ml-2 uppercase tracking-widest">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 transition-all text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 ml-2 uppercase tracking-widest">Email Address</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 transition-all text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 ml-2 uppercase tracking-widest">Your Message</label>
                  <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 transition-all text-white resize-none" />
                </div>
                <button type="submit" disabled={sending} className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-white shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-1 transition-all disabled:opacity-50 flex justify-center items-center gap-3">
                  {sending ? "TRANSMITTING..." : <>SEND MESSAGE <FaPaperPlane/></>}
                </button>
                {status && <p className={`text-center font-bold text-sm mt-4 ${status.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>{status}</p>}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/5 relative z-10 bg-[#0b0b15]">
        <p className="font-medium italic">"Precision in code, empathy in design."</p>
        <p className="mt-2">© {new Date().getFullYear()} Yokisha Poudel. Built with Passion & React.</p>
      </footer>
    </div>
  );
}

const SocialBtn = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300">
    {icon}
  </a>
);