// src/pages/Portfolio.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaUser,
  FaEnvelope,
  FaComment,
  FaPhone,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

import MyPhoto from "../assets/myphoto.jpg";
import ResumePDF from "../assets/Yokisha_Poudel_Resume.pdf";

/* ---------------- TYPES ---------------- */
type Project = {
  title: string;
  tech: string[];
  desc: string;
  github?: string;
};

type TimelineItem = {
  period: string;
  title: string;
  org: string;
  desc: string;
  tag: string;
};

/* ---------------- DATA ---------------- */
const skillCategories = {
  Frontend: ["React", "TypeScript", "Tailwind CSS"],
  Mobile: ["Flutter"],
  "ML / AI": ["Python", "PyTorch", "LSTM", "U‑Net", "U‑Net++", "Y‑Net"],
  Backend: ["Firebase", "Supabase"],
  Tools: ["Git", "VS Code", "Figma"],
};

const timeline: TimelineItem[] = [
  {
    period: "Nov 2025 – Present",
    title: "Intern",
    org: "Midas Health Services",
    desc: "Working in healthcare tech environment with medical software exposure.",
    tag: "Internship",
  },
  {
    period: "2022 – Present",
    title: "Bachelor in Computer Engineering ",
    org: "Advanced College of Engineering",
    desc: "Focused on software development, ML, and medical imaging projects.",
    tag: "College",
  },
  {
    period: "2019 – 2021",
    title: "+2 Science",
    org: "Uniglobe College, Kamaladi",
    desc: "Completed higher secondary education in science stream.",
    tag: "High School",
  },
  {
    period: "2009 – 2019",
    title: "Schooling (Grade 1–10)",
    org: "Triyog High School",
    desc: "Completed foundational education.",
    tag: "School",
  },
];

const projects: Project[] = [

  {
    title: "Expense Tracker",
    tech: ["Flutter", "Supabase"],
    desc: "Expense & budget splitting application.",
    github: "https://github.com/Yokisha/Expense-Splitter",
  },

  {
    title: "Snake and Ladder Game",
    tech: ["C++"],
    desc: "Console-based Snake & Ladder game.",
    github: "https://github.com/Yokisha/Snake-and-ladder",
  },
  {
    title: "Fruit in a Basket",
    tech: ["Python"],
    desc: "Interactive game with scoring and animations.",
    github: "https://github.com/Yokisha/Obstacle-game",
  },
  {
    title: "OvaRythm – Period Prediction App",
    tech: ["Flutter", "Firebase", "LSTM"],
    desc: "Chatbot-driven application for menstrual cycle prediction.",
    github: "https://github.com/Yokisha/Period-Tracker.git",
  },
  {
    title: "Attendance System",
    tech: ["React", "TypeScript", "Firebase"],
    desc: "Web app for attendance tracking with real-time DB.",
    github: "https://github.com/Yokisha/Attendance-System.git",
  },
  {
    title: "Retinal Disease Segmentation",
    tech: ["U‑Net", "U‑Net++", "Y‑Net"],
    desc: "Medical image segmentation of OCT scans.",
    github: "https://github.com/Yokisha/OCT-RETINAL-SEGMENTATION-.git",
  },
];

/* ---------------- COMPONENT ---------------- */
export default function Portfolio() {
  const [typed, setTyped] = useState("");
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll progress for timeline dot
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"],
  });
  const dotY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const dotTop = useTransform(dotY, (v) => `${v * 100}%`);

  const fullText = "Frontend Developer • App & ML Enthusiast";

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  // Initialize EmailJS
  emailjs.init("xBHB1bXJocPwGVLTb");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    try {
      await emailjs.send(
        "service_s1uip75",
        "template_tt3w2ud",
        {
          title: "Contact Form Submission",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "xBHB1bXJocPwGVLTb"
      );
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("Failed to send message. Try again.");
      setTimeout(() => setStatus(""), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white font-sans overflow-x-hidden">

      {/* HERO */}
      <section className="relative flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-32 bg-gradient-to-r from-indigo-900 via-gray-900 to-indigo-800 overflow-visible">
        <motion.div
          className="absolute -top-16 -left-16 w-72 h-72 bg-indigo-700 rounded-full opacity-20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-16 w-96 h-96 bg-indigo-600 rounded-full opacity-15"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="md:w-1/2 text-center md:text-left space-y-6 z-20">
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Yokisha Poudel
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {typed}
          </motion.p>

          <div className="flex gap-4 mt-6 justify-center md:justify-start flex-wrap relative">

            <motion.a
              href={ResumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full shadow-lg transition transform hover:-translate-y-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 120 }}
            >
              View Resume
            </motion.a>

            <div className="relative group z-50">
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full shadow-lg transition transform hover:-translate-y-1">
                Skills
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[28rem] max-w-[90vw] max-h-96 bg-gray-800 rounded-xl p-6 shadow-2xl overflow-y-auto opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transform transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <h2 className="text-xl text-indigo-400 font-bold mb-3 text-center">My Skills</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.entries(skillCategories).map(([cat, skills]) => (
                    <div key={cat}>
                      <h3 className="text-indigo-400 font-semibold">{cat}</h3>
                      <ul className="text-sm text-gray-300 list-disc list-inside">
                        {skills.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <motion.div
          className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-indigo-500 z-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={MyPhoto} className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-20 max-w-5xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center mb-6">About Me</h2>
        <div className="text-gray-300 text-lg leading-relaxed space-y-4">
          <p>
            Hello! I'm <strong>Yokisha Poudel</strong>, a passionate <strong>Frontend Developer</strong> and <strong>App & ML Enthusiast</strong> dedicated to building intuitive, responsive, and impactful applications.
          </p>
          <p>
            I enjoy blending <strong>technology and creativity</strong> to solve real-world problems. My work ranges from mobile apps to medical AI projects.
          </p>
          <p>
            Adaptable, collaborative, and always learning, I strive to deliver <strong>clean code, seamless UX, and functional designs</strong>.
          </p>
          <p className="text-center italic">
            "I believe that creativity + technology can make a meaningful impact."
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-6 py-12 max-w-4xl mx-auto relative" ref={timelineRef}>
        <h2 className="text-4xl font-bold mb-10 text-center">Experience & Education</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 rounded-full bg-gradient-to-b from-indigo-400 via-indigo-600 to-indigo-400"></div>

          <motion.div
            style={{ top: dotTop }}
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 shadow-lg z-10"
          />

          {timeline.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const containerClass = isLeft ? "justify-start" : "justify-end";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`mb-10 w-full flex ${containerClass} relative`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 shadow-lg z-10" />

                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}
                  className={`w-5/12 px-4 py-4 bg-gray-800 rounded-xl relative ${isLeft ? "text-right" : "text-left"}`}
                >
                  <div className="flex justify-center mb-2">
                    <span className="text-xs bg-indigo-800 px-3 py-1 rounded">{item.tag}</span>
                  </div>

                  <p className="text-sm text-gray-400">{item.period}</p>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.org}</p>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
            >
              <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="text-xs font-medium bg-gray-700 px-2 py-1 rounded-full text-gray-200">
                    {t}
                  </span>
                ))}
              </div>
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-400 hover:underline mt-2"
                >
                  View Code <FaGithub />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 py-12">
        <motion.div
          className="max-w-md mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-indigo-400">Contact Me</h2>
          <p className="text-center text-gray-400 mb-6">
            Feel free to reach out for collaboration or just a friendly hello!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition"
                placeholder="Your Name"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition"
                placeholder="Your Email"
              />
            </div>
            <div className="relative">
              <FaComment className="absolute left-3 top-3 text-gray-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full pl-10 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition"
                placeholder="Your Message"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition font-semibold shadow-lg"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status && (
            <p className="text-center mt-2 text-sm text-yellow-400">{status}</p>
          )}

          <div className="flex flex-col items-center mt-6 text-gray-300 space-y-1">
            <div className="flex items-center gap-2">
              <FaPhone /> 9810292911
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope /> yokishaa.poudel@gmail.com
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <a href="https://www.instagram.com/yokishaaa?igsh=d3cyNHphNWFtMGpj" target="_blank" className="text-2xl text-pink-500 hover:scale-110 transition-transform">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/share/1CLU7MDEkq/?mibextid=wwXIfr" target="_blank" className="text-2xl text-blue-600 hover:scale-110 transition-transform">
              <FaFacebook />
            </a>
            <a href="https://github.com/Yokisha" target="_blank" className="text-2xl text-gray-200 hover:scale-110 transition-transform">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/yokisha-p-873a382a0" target="_blank" className="text-2xl text-blue-400 hover:scale-110 transition-transform">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="text-center py-8 text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} Yokisha Poudel
      </footer>

    </div>
  );
}
