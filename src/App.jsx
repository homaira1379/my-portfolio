// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  Star,
  Code2,
  Palette,
  Moon,
  Sun,
  Check,
  Search,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

// ---------- Images (filenames must match your src/assets folder) ----------
import profileImg from "./assets/profile.png"; // your profile image
import bookstoreImg from "./assets/bookstore.png";
import invoiceImg from "./assets/invoice.png";
import schoolImg from "./assets/school-management.png";
import movieImg from "./assets/movie-theater.png";
import studyImg from "./assets/study-journal.png";

import cert1 from "./assets/certificates/cert1.png";
import cert2 from "./assets/certificates/cert2.png";
import cert3 from "./assets/certificates/cert3.png";
import cert4 from "./assets/certificates/cert4.png";
import cert5 from "./assets/certificates/cert5.png";
import cert6 from "./assets/certificates/cert6.png";
import cert7 from "./assets/certificates/cert7.png";
import cert8 from "./assets/certificates/cert8.png";

// ---------- Formspree endpoint ----------
const FORM_ENDPOINT = "https://formspree.io/f/mrbrkddg";

// =======================================================
// Reusable small components
// =======================================================

function TechBadge({ tech }) {
  return <span className="badge">{tech}</span>;
}

function StatusBadge({ status }) {
  const colors = {
    Completed: { bg: "#dcfce7", color: "#166534" },
    "In Progress": { bg: "#dbeafe", color: "#1d4ed8" },
    Live: { bg: "#f3e8ff", color: "#6b21a8" },
  };

  const style = colors[status] || { bg: "#f3f4f6", color: "#374151" };

  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: "0.15rem 0.5rem",
        borderRadius: "0.5rem",
        fontSize: "0.8rem",
      }}
    >
      {status}
    </span>
  );
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <article className="project-card" aria-labelledby={`project-${project.id}`}>
      <div style={{ height: "180px", overflow: "hidden", borderRadius: "6px" }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Code2 size={64} />
          </div>
        )}
      </div>

      <h3
        id={`project-${project.id}`}
        style={{ marginTop: "1rem", marginBottom: "0.5rem", fontSize: "1.25rem" }}
      >
        {project.name}{" "}
        {project.featured && (
          <span
            style={{
              fontSize: "0.8rem",
              marginLeft: "0.4rem",
              backgroundColor: "gold",
              padding: "0.1rem 0.4rem",
              borderRadius: "0.4rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <Star size={12} fill="currentColor" />
            Featured
          </span>
        )}{" "}
        <StatusBadge status={project.status} />
      </h3>

      <p style={{ marginBottom: "0.75rem" }}>{project.description}</p>

      {project.progress !== undefined && (
        <div style={{ marginBottom: "0.75rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.8rem",
              marginBottom: "0.25rem",
            }}
          >
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div
            style={{
              height: "6px",
              backgroundColor: "#e5e7eb",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${project.progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #a855f7, #ec4899)",
              }}
            />
          </div>
        </div>
      )}

      {project.details && (
        <>
          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              border: "none",
              background: "none",
              color: "#7c3aed",
              cursor: "pointer",
              fontSize: "0.85rem",
              marginBottom: "0.5rem",
            }}
          >
            {expanded ? "Hide" : "Show"} more info
          </button>
          {expanded && (
            <p style={{ fontSize: "0.85rem", color: "#4b5563" }}>
              {project.details}
            </p>
          )}
        </>
      )}

      <div style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}>
        {project.techStack.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <button
          onClick={handleViewDetails}
          style={{
            border: "none",
            padding: "0.4rem 0.75rem",
            borderRadius: "0.4rem",
            backgroundColor: "#7c3aed",
            color: "white",
            cursor: "pointer",
          }}
        >
          View Details
        </button>
        {/* Live Demo only appears if liveLink is not empty */}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "0.4rem 0.75rem",
              borderRadius: "0.4rem",
              backgroundColor: "#ec4899",
              color: "white",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            Live Demo <ExternalLink size={14} />
          </a>
        )}
      </div>
    </article>
  );
}

// =======================================================
// Data
// =======================================================

const projectsData = [
  {
    id: 1,
    name: "Online Book Store",
    description: "Desktop app for browsing and purchasing books.",
    techStack: ["Python", "MySQL", "Tkinter"],
    featured: true,
    status: "Completed",
    progress: 100,
    liveLink: "",
    codeRepo: "https://github.com/homaira1379",
    details:
      "Full CRUD operations with inventory management, user authentication, and order tracking system.",
    longDescription:
      "A comprehensive desktop application built with Python and Tkinter that allows users to browse through a catalog of books, search by various criteria, manage their shopping cart, and complete purchases. The system includes admin features for inventory control and order management.",
    image: bookstoreImg,
  },
  {
    id: 2,
    name: "School Management System",
    description: "Web app for managing students and teachers.",
    techStack: ["Django", "HTML", "CSS", "JavaScript"],
    featured: true,
    status: "Completed",
    progress: 100,
    liveLink: "",
    codeRepo: "https://github.com/homaira1379",
    details: "Role-based access, attendance tracking, and reporting features.",
    longDescription:
      "A full-featured web application for educational institutions. Includes dashboards for administrators, teachers, and students. Features include attendance tracking, grade management, class scheduling, and comprehensive reporting tools.",
    image: schoolImg,
  },
  {
    id: 3,
    name: "Invoice & Client Management",
    description: "App for managing invoices and clients.",
    techStack: ["HTML", "CSS", "JavaScript"],
    featured: false,
    status: "Completed", // now Completed
    progress: 100,
    liveLink: "", // no live demo button
    codeRepo: "https://github.com/homaira1379",
    details: "Invoice generation, payment tracking, and client database.",
    longDescription:
      "A responsive web application designed for freelancers and small businesses. Features include client management, invoice generation with customizable templates, payment status tracking, and export to PDF functionality.",
    image: invoiceImg,
  },
  {
    id: 4,
    name: "Employee Payroll System",
    description: "HR and payroll management system.",
    techStack: ["Django", "HTML", "CSS", "Bootstrap"],
    featured: false,
    status: "In Progress",
    progress: 75,
    liveLink: "",
    codeRepo: "https://github.com/homaira1379",
    details: "Salary calculation, payslip generation, and employee records.",
    longDescription:
      "A comprehensive HR management system with support for multiple roles (Admin, HR, Finance). Includes features for employee data management, automated payroll processing with tax calculations, leave management, and payslip generation.",
  },
  {
    id: 5,
    name: "Movie Theater Web Page",
    description: "Responsive movie theater website UI.",
    techStack: ["HTML", "CSS", "JavaScript"],
    featured: false,
    status: "Completed",
    progress: 100,
    liveLink: "",
    codeRepo: "https://github.com/homaira1379",
    details: "Modern, responsive design for browsing movies and showtimes.",
    longDescription:
      "A fully responsive landing page for a movie theater with sections for now showing, coming soon, and a clear booking call-to-action.",
    image: movieImg,
  },
  {
    id: 6,
    name: "Study Journal",
    description: "Personal study journal and tracker UI.",
    techStack: ["HTML", "CSS", "JavaScript"],
    featured: false,
    status: "Completed",
    progress: 100,
    liveLink: "",
    codeRepo: "https://github.com/homaira1379",
    details: "Helps track daily learning, notes, and goals in a clean layout.",
    longDescription:
      "A simple, aesthetic interface to organize study sessions, topics, and reflections. Designed to keep daily learning consistent and motivating.",
    image: studyImg,
  },
];

const certificates = [
  { id: 1, image: cert1, title: "Certificate 1" },
  { id: 2, image: cert2, title: "Certificate 2" },
  { id: 3, image: cert3, title: "Certificate 3" },
  { id: 4, image: cert4, title: "Certificate 4" },
  { id: 5, image: cert5, title: "Certificate 5" },
  { id: 6, image: cert6, title: "Certificate 6" },
  { id: 7, image: cert7, title: "Certificate 7" },
  { id: 8, image: cert8, title: "Certificate 8" },
];

// =======================================================
// Layout & pages
// =======================================================

function AppContent() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    const modes = ["light", "dark", "ocean"];
    const i = modes.indexOf(theme);
    setTheme(modes[(i + 1) % modes.length]);
  };

  const bg =
    theme === "dark"
      ? "#111827"
      : theme === "ocean"
      ? "linear-gradient(to bottom, #0f172a, #0f766e)"
      : "#f7f7f7";

  return (
    <div style={{ minHeight: "100vh", background: bg }}>
      <Navbar theme={theme} cycleTheme={cycleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function Navbar({ theme, cycleTheme }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const value = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(value);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg =
    theme === "dark"
      ? "#111827"
      : theme === "ocean"
      ? "#0f172a"
      : "#111827";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: navBg,
        color: "white",
      }}
    >
      <div
        style={{
          height: "3px",
          width: `${scrollProgress}%`,
          backgroundColor: "#ec4899",
        }}
      />
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand acts as Home link */}
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1.05rem",
            marginRight: "1.5rem",
          }}
        >
          Home
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.75rem",
          }}
        >
          <NavLink to="/about">
            {({ isActive }) => (
              <span style={{ color: isActive ? "#f472b6" : "white" }}>
                About
              </span>
            )}
          </NavLink>
          <NavLink to="/projects">
            {({ isActive }) => (
              <span style={{ color: isActive ? "#f472b6" : "white" }}>
                Projects
              </span>
            )}
          </NavLink>
          <NavLink to="/contact">
            {({ isActive }) => (
              <span style={{ color: isActive ? "#f472b6" : "white" }}>
                Contact
              </span>
            )}
          </NavLink>

          <button
            onClick={cycleTheme}
            style={{
              border: "none",
              background: "transparent",
              color: "white",
              cursor: "pointer",
            }}
            aria-label="Change theme"
          >
            {theme === "light" ? (
              <Moon size={20} />
            ) : theme === "dark" ? (
              <Sun size={20} />
            ) : (
              "🌊"
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  const [displayed, setDisplayed] = useState("");
  const quote = "Every expert was once a beginner.";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i <= quote.length) {
        setDisplayed(quote.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <header
        style={{
          background: "linear-gradient(90deg, #4c1d95, #ec4899, #7c3aed)",
          color: "white",
          textAlign: "center",
          padding: "4rem 1rem",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Homaira Yousufi
        </h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Welcome to my developer journey!
        </p>
        <p style={{ fontStyle: "italic", minHeight: "1.5rem" }}>
          "{displayed}
          <span style={{ opacity: 0.7 }}>|</span>"
        </p>
      </header>

      <section
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: "170px",
              height: "170px",
              borderRadius: "999px",
              overflow: "hidden",
              border: "4px solid #a855f7",
              flexShrink: 0,
            }}
          >
            <img
              src={profileImg}
              alt="Homaira Yousufi"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: "220px" }}>
            <h2 style={{ marginBottom: "0.5rem" }}>Frontend Developer</h2>
            <p style={{ marginBottom: "0.75rem" }}>
              I'm a Computer Science student from Afghanistan, focused on
              building clean, responsive, and user-friendly web applications. I
              love turning ideas into interactive interfaces that feel simple
              and comfortable for users.
            </p>
            <Link
              to="/projects"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "0.4rem",
                backgroundColor: "#7c3aed",
                color: "white",
                textDecoration: "none",
              }}
            >
              View My Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutPage() {
  const [showMore, setShowMore] = useState(false);

  const hobbies = [
    "Learning new languages and exploring different cultures",
    "Reading motivational books",
    "Designing visuals and working on creative projects",
    "Teaching and helping others learn technology",
  ];

  const skills = [
    { name: "React", level: 75 },
    { name: "JavaScript", level: 80 },
    { name: "Python", level: 85 },
    { name: "Django", level: 70 },
    { name: "HTML/CSS", level: 90 },
  ];

  return (
    <main style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        About Me
      </h1>

      <section className="project-card" style={{ marginBottom: "1.5rem" }}>
        <h2>My Journey</h2>
        <p>
          I was born and raised in Afghanistan, where access to technology and
          opportunities is not always easy. Despite that, I discovered a strong
          passion for computers and problem-solving. Studying Computer Science
          opened a new world for me, and I quickly fell in love with frontend
          development — especially the way design and logic come together.
        </p>
        <p>
          Alongside my studies, I have been building projects to practice real
          skills: school management systems, online stores, and tools that help
          people organize their work and learning. Each project teaches me
          something new about writing clean code, planning features, and
          thinking about users first.
        </p>
        <p>
          My goal is to grow as a professional developer, work with
          international teams, and use my skills to create products that make
          life easier for others — especially students and women who want to
          step into tech.
        </p>
        <button
          onClick={() => setShowMore((v) => !v)}
          style={{
            border: "none",
            background: "none",
            color: "#7c3aed",
            cursor: "pointer",
            marginTop: "0.5rem",
          }}
        >
          {showMore ? "Show less" : "Show more personal side"}
        </button>
        {showMore && (
          <div style={{ marginTop: "0.5rem" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Palette size={20} /> Fun facts & hobbies
            </h3>
            <ul>
              {hobbies.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="project-card" style={{ marginBottom: "1.5rem" }}>
        <h2>Skills</h2>
        {skills.map((skill) => (
          <div key={skill.name} style={{ marginBottom: "0.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.9rem",
              }}
            >
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div
              style={{
                height: "6px",
                backgroundColor: "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${skill.level}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #a855f7, #ec4899)",
                }}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="project-card">
        <h2>Certificates</h2>
        <p style={{ marginBottom: "0.75rem" }}>
          Some of the certificates I have earned from online courses and
          trainings:
        </p>
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          }}
        >
          {certificates.map((c) => (
            <div
              key={c.id}
              style={{
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "130px",
                  backgroundColor: "#f9fafb",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div style={{ padding: "0.4rem", fontSize: "0.85rem" }}>
                {c.title}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const allTech = ["All", ...new Set(projectsData.flatMap((p) => p.techStack))];

  const filtered = projectsData.filter((p) => {
    const search =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const tech =
      selectedFilter === "All" || p.techStack.includes(selectedFilter);
    return search && tech;
  });

  return (
    <main style={{ maxWidth: "1100px", margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        My Projects
      </h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ position: "relative", marginBottom: "0.75rem" }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.4rem 0.75rem 0.4rem 2.2rem",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
            }}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {allTech.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedFilter(t)}
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  selectedFilter === t ? "#7c3aed" : "#e5e7eb",
                color: selectedFilter === t ? "white" : "#374151",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          No projects found.
        </p>
      )}
    </main>
  );
}

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === parseInt(id, 10));

  if (!project) return <NotFoundPage />;

  return (
    <main style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
      <button
        onClick={() => navigate("/projects")}
        style={{
          border: "none",
          background: "none",
          color: "#7c3aed",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          marginBottom: "1rem",
        }}
      >
        <ArrowLeft size={18} /> Back to projects
      </button>

      <section className="project-card">
        <h1 style={{ marginBottom: "0.5rem" }}>
          {project.name} <StatusBadge status={project.status} />
        </h1>

        <div
          style={{
            height: "220px",
            borderRadius: "0.5rem",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg,#a855f7,#ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Code2 size={64} />
            </div>
          )}
        </div>

        <p style={{ marginBottom: "1rem" }}>{project.longDescription}</p>

        {project.progress !== undefined && (
          <div style={{ marginBottom: "1rem" }}>
            <strong>Project progress:</strong>
            <div
              style={{
                height: "6px",
                backgroundColor: "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden",
                marginTop: "0.25rem",
              }}
            >
              <div
                style={{
                  width: `${project.progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg,#a855f7,#ec4899)",
                }}
              />
            </div>
            <div style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
              {project.progress}% complete
            </div>
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <strong>Technologies:</strong>
          <div style={{ marginTop: "0.4rem" }}>
            {project.techStack.map((t) => (
              <TechBadge key={t} tech={t} />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.4rem",
                backgroundColor: "#7c3aed",
                color: "white",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              View live demo <ExternalLink size={16} />
            </a>
          )}
          <a
            href={project.codeRepo}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.4rem",
              backgroundColor: "#374151",
              color: "white",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <Github size={16} />
            View code
          </a>
        </div>
      </section>
    </main>
  );
}

// =============== CONTACT PAGE WITH FORMSPREE ==================

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Name required";
    if (!form.email.trim()) next.email = "Email required";
    if (!form.message.trim()) next.message = "Message required";

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setShowModal(true);
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setShowModal(false), 2500);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main style={{ maxWidth: "700px", margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Contact Me
      </h1>

      <form className="project-card" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              width: "100%",
              padding: "0.4rem 0.6rem",
              borderRadius: "0.4rem",
              border: "1px solid #e5e7eb",
            }}
          />
          {errors.name && (
            <div style={{ color: "#dc2626", fontSize: "0.85rem" }}>
              {errors.name}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={{
              width: "100%",
              padding: "0.4rem 0.6rem",
              borderRadius: "0.4rem",
              border: "1px solid #e5e7eb",
            }}
          />
          {errors.email && (
            <div style={{ color: "#dc2626", fontSize: "0.85rem" }}>
              {errors.email}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Message
          </label>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            style={{
              width: "100%",
              padding: "0.4rem 0.6rem",
              borderRadius: "0.4rem",
              border: "1px solid #e5e7eb",
            }}
          />
          {errors.message && (
            <div style={{ color: "#dc2626", fontSize: "0.85rem" }}>
              {errors.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            borderRadius: "0.4rem",
            border: "none",
            backgroundColor: "#7c3aed",
            color: "white",
            cursor: status === "sending" ? "default" : "pointer",
            opacity: status === "sending" ? 0.7 : 1,
          }}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </form>

      {status === "error" && (
        <p
          style={{
            color: "#dc2626",
            fontSize: "0.9rem",
            marginTop: "0.75rem",
            textAlign: "center",
          }}
        >
          Something went wrong. You can also email me directly at{" "}
          <a href="mailto:humaira.yousufi@gmail.com">
            humaira.yousufi@gmail.com
          </a>
          .
        </p>
      )}

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              textAlign: "center",
              maxWidth: "320px",
            }}
          >
            <Check
              size={48}
              style={{ color: "#16a34a", marginBottom: "0.5rem" }}
            />
            <h2>Thank you, {form.name || "Friend"}!</h2>
            <p>Your message was sent to my inbox.</p>
          </div>
        </div>
      )}
    </main>
  );
}

// ================= 404 =================

function NotFoundPage() {
  return (
    <main style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>404</h1>
      <p style={{ marginBottom: "1rem" }}>Page not found.</p>
      <Link
        to="/"
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "0.4rem",
          backgroundColor: "#7c3aed",
          color: "white",
          textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </main>
  );
}

// ================= Footer =================

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111827",
        color: "white",
        padding: "1.5rem 1rem",
        marginTop: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div style={{ fontWeight: 600 }}>Homaira Yousufi</div>

        <div>
          <a
            href="https://github.com/homaira1379"
            target="_blank"
            rel="noreferrer"
            style={{ margin: "0 0.5rem", color: "white" }}
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/homaira-yousufi-6983311b5"
            target="_blank"
            rel="noreferrer"
            style={{ margin: "0 0.5rem", color: "white" }}
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:humaira.yousufi@gmail.com"
            style={{ margin: "0 0.5rem", color: "white" }}
          >
            <Mail size={24} />
          </a>
        </div>

        <div style={{ fontSize: "0.85rem", textAlign: "right" }}>
          <div>© {new Date().getFullYear()} Homaira Yousufi</div>
          <div>All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

// =======================================================
// Root App – wrapped with BrowserRouter
// =======================================================

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
