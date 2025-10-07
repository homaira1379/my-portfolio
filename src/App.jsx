import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, Star, Code2, Palette, Moon, Sun, Check, Search, ArrowLeft, ExternalLink } from 'lucide-react';

// Reusable Components
function TechBadge({ tech }) {
  return (
    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
      {tech}
    </span>
  );
}

function StatusBadge({ status }) {
  const colors = {
    'Completed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Live': 'bg-purple-100 text-purple-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded text-sm ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
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
    <article 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      role="article"
      aria-labelledby={`project-${project.id}`}
    >
      <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex items-center justify-center text-white">
        <Code2 size={80} aria-hidden="true" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <h3 id={`project-${project.id}`} className="text-2xl font-bold text-purple-900">{project.name}</h3>
          {project.featured && (
            <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium" aria-label="Featured project">
              <Star size={16} fill="currentColor" aria-hidden="true" />
              Featured
            </span>
          )}
          <StatusBadge status={project.status} />
        </div>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        {project.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{project.progress}%</span>
            </div>
            <div 
              className="h-2 bg-gray-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={project.progress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`Project completion: ${project.progress}%`}
            >
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        )}
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-purple-600 hover:text-purple-700 text-sm mb-4 flex items-center gap-1"
          aria-expanded={expanded}
          aria-controls={`details-${project.id}`}
        >
          {expanded ? 'Hide' : 'Show'} More Info
        </button>
        
        {expanded && (
          <div id={`details-${project.id}`} className="mb-4 text-sm text-gray-500 animate-fade-in">
            {project.details}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, idx) => (
            <TechBadge key={idx} tech={tech} />
          ))}
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleViewDetails}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label={`View details for ${project.name}`}
          >
            View Details
          </button>
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 inline-flex items-center gap-2"
              aria-label={`View live demo of ${project.name}`}
            >
              Live Demo
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// Project Data
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
    details: "Full CRUD operations with inventory management, user authentication, and order tracking system.",
    longDescription: "A comprehensive desktop application built with Python and Tkinter that allows users to browse through a catalog of books, search by various criteria, manage their shopping cart, and complete purchases. The system includes admin features for inventory control and order management."
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
    longDescription: "A full-featured web application for educational institutions. Includes dashboards for administrators, teachers, and students. Features include attendance tracking, grade management, class scheduling, and comprehensive reporting tools."
  },
  {
    id: 3,
    name: "Invoice & Client Management",
    description: "App for managing invoices and clients.",
    techStack: ["HTML", "CSS", "JavaScript"],
    featured: false,
    status: "Live",
    progress: 100,
    liveLink: "https://homaira1379.github.io/five/",
    codeRepo: "https://github.com/homaira1379",
    details: "Invoice generation, payment tracking, and client database.",
    longDescription: "A responsive web application designed for freelancers and small businesses. Features include client management, invoice generation with customizable templates, payment status tracking, and export to PDF functionality."
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
    longDescription: "A comprehensive HR management system with support for multiple roles (Admin, HR, Finance). Includes features for employee data management, automated payroll processing with tax calculations, leave management, and payslip generation."
  }
];

// App Content
function AppContent() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'ocean'];
    const currentIndex = themes.indexOf(theme);
    setTheme(themes[(currentIndex + 1) % themes.length]);
  };

  const bgClass = theme === 'dark' ? 'bg-gray-900' : theme === 'ocean' ? 'bg-gradient-to-b from-blue-900 to-teal-900' : 'bg-gradient-to-b from-purple-50 to-pink-50';

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <Navbar theme={theme} cycleTheme={cycleTheme} />
      <Routes>
        <Route path="/" element={<HomePage theme={theme} />} />
        <Route path="/about" element={<AboutPage theme={theme} />} />
        <Route path="/projects" element={<ProjectsPage theme={theme} />} />
        <Route path="/projects/:id" element={<ProjectDetailPage theme={theme} />} />
        <Route path="/contact" element={<ContactPage theme={theme} />} />
        <Route path="*" element={<NotFoundPage theme={theme} />} />
      </Routes>
      <Footer theme={theme} />
    </div>
  );
}

function Navbar({ theme, cycleTheme }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-blue-800' : 'bg-purple-900';

  return (
    <nav className={`${navBg} text-white p-4 sticky top-0 z-50 shadow-lg relative`} role="navigation" aria-label="Main navigation">
      <div style={{ position: 'absolute', top: 0, left: 0, height: '3px', width: `${scrollProgress}%`, backgroundColor: '#ec4899' }} />
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:text-pink-300 transition">Homaira Yousufi</Link>
        </h1>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <NavLink 
                to="/" 
                className={({isActive}) => `hover:text-pink-300 transition ${isActive ? 'text-pink-300 font-semibold' : ''}`}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({isActive}) => `hover:text-pink-300 transition ${isActive ? 'text-pink-300 font-semibold' : ''}`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/projects" 
                className={({isActive}) => `hover:text-pink-300 transition ${isActive ? 'text-pink-300 font-semibold' : ''}`}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({isActive}) => `hover:text-pink-300 transition ${isActive ? 'text-pink-300 font-semibold' : ''}`}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <button 
            onClick={cycleTheme} 
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={`Switch theme`}
          >
            {theme === 'light' ? <Moon size={20} /> : theme === 'dark' ? <Sun size={20} /> : <span>🌊</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

function HomePage({ theme }) {
  const [displayedText, setDisplayedText] = useState('');
  const quote = "Every expert was once a beginner.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= quote.length) {
        setDisplayedText(quote.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const headerBg = theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-800' : theme === 'ocean' ? 'bg-gradient-to-r from-teal-600 to-blue-600' : 'bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700';
  const cardBg = theme === 'dark' ? 'bg-gray-800 text-white' : theme === 'ocean' ? 'bg-teal-800 text-white' : 'bg-white';

  return (
    <main>
      <header className={`${headerBg} text-white py-20 text-center`}>
        <h1 className="text-5xl font-bold mb-4">Homaira Yousufi</h1>
        <p className="text-xl mb-4">Welcome to my developer journey!</p>
        <p className="text-lg italic opacity-90 min-h-8">"{displayedText}<span className="animate-pulse">|</span>"</p>
      </header>

      <section className="max-w-4xl mx-auto my-16 px-4">
        <div className={`flex flex-col md:flex-row items-center gap-8 ${cardBg} rounded-lg shadow-lg p-8`}>
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-6xl font-bold">
              HY
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' || theme === 'ocean' ? 'text-purple-300' : 'text-purple-900'}`}>Frontend Developer</h2>
            <p className={theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-700'}>I'm a passionate Computer Science student from Afghanistan who enjoys building creative and user-friendly websites.</p>
            <div className="mt-4">
              <Link to="/projects" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition inline-block">
                View My Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutPage({ theme }) {
  const [showMore, setShowMore] = useState(false);
  
  const hobbies = [
    "Learning new languages and exploring different cultures",
    "Reading motivational books",
    "Designing visuals and working on creative projects",
    "Teaching and helping others learn technology"
  ];

  const skills = [
    { name: 'React', level: 75 },
    { name: 'JavaScript', level: 80 },
    { name: 'Python', level: 85 },
    { name: 'Django', level: 70 },
    { name: 'HTML/CSS', level: 90 }
  ];

  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800 text-white' : theme === 'ocean' ? 'bg-teal-800 text-white' : 'bg-white';
  const textColor = theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-700';
  
  return (
    <main className="max-w-4xl mx-auto my-16 px-4">
      <h1 className={`text-4xl font-bold mb-8 text-center ${titleColor}`}>About Me</h1>
      
      <section className={`${cardBg} rounded-lg shadow-lg p-8 mb-8`}>
        <h2 className="text-2xl font-bold mb-4">My Journey</h2>
        <p className={`mb-4 ${textColor}`}>
          I'm a passionate Computer Science student from Afghanistan who enjoys building creative and user-friendly websites.
        </p>
        <p className={`mb-4 ${textColor}`}>
          Currently learning <span className="font-semibold text-purple-400">JavaScript, React.js, and Django</span> for web development.
        </p>
        
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-purple-600 hover:text-purple-700"
          aria-expanded={showMore}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
        
        {showMore && (
          <div className="mt-4 animate-fade-in">
            <h3 className={`text-xl font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' || theme === 'ocean' ? 'text-purple-300' : 'text-purple-800'}`}>
              <Palette size={24} />
              Fun Facts & Hobbies
            </h3>
            <ul className={`list-disc list-inside space-y-2 ${textColor}`}>
              {hobbies.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        )}
      </section>

      <section className={`${cardBg} rounded-lg shadow-lg p-8`}>
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="space-y-4">
          {skills.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className={`font-semibold ${textColor}`}>{skill.name}</span>
                <span className={textColor}>{skill.level}%</span>
              </div>
              <div 
                className="h-3 bg-gray-200 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectsPage({ theme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const allTechs = ['All', ...new Set(projectsData.flatMap(p => p.techStack))];
  
  const filteredProjects = projectsData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || p.techStack.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white' : theme === 'ocean' ? 'bg-teal-700 text-white' : 'bg-white';

  return (
    <main className="max-w-6xl mx-auto my-16 px-4">
      <h1 className={`text-4xl font-bold mb-8 text-center ${titleColor}`}>My Projects</h1>
      
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg ${inputBg}`}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {allTechs.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedFilter(tech)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedFilter === tech 
                  ? 'bg-purple-600 text-white scale-105' 
                  : theme === 'dark' ? 'bg-gray-700 text-white' : theme === 'ocean' ? 'bg-teal-700 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className={`text-center ${titleColor} text-lg mt-8`}>No projects found.</p>
      )}
    </main>
  );
}

function ProjectDetailPage({ theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return <NotFoundPage theme={theme} />;
  }

  const cardBg = theme === 'dark' ? 'bg-gray-800 text-white' : theme === 'ocean' ? 'bg-teal-800 text-white' : 'bg-white';
  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';

  return (
    <main className="max-w-4xl mx-auto my-16 px-4">
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Projects
      </button>

      <article className={`${cardBg} rounded-lg shadow-lg p-8`}>
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <h1 className={`text-4xl font-bold ${titleColor}`}>{project.name}</h1>
          {project.featured && (
            <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-2 rounded">
              <Star size={20} fill="currentColor" />
              Featured
            </span>
          )}
          <StatusBadge status={project.status} />
        </div>

        <div className="h-64 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 rounded-lg flex items-center justify-center text-white mb-6">
          <Code2 size={120} />
        </div>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3">Description</h2>
          <p className={theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-700'}>
            {project.longDescription}
          </p>
        </section>

        {project.progress !== undefined && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">Project Progress</h2>
            <div 
              className="h-4 bg-gray-200 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={project.progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="text-sm mt-2 text-gray-600">{project.progress}% Complete</p>
          </section>
        )}

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <TechBadge key={idx} tech={tech} />
            ))}
          </div>
        </section>

        <section className="flex gap-4 flex-wrap">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition inline-flex items-center gap-2"
            >
              View Live Demo
              <ExternalLink size={18} />
            </a>
          )}
          <a
            href={project.codeRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800 transition inline-flex items-center gap-2"
          >
            <Github size={18} />
            View Code
          </a>
        </section>
      </article>
    </main>
  );
}

function ContactPage({ theme }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name required';
    if (!form.email.trim()) newErrors.email = 'Email required';
    if (!form.message.trim()) newErrors.message = 'Message required';
    
    if (Object.keys(newErrors).length === 0) {
      setShowModal(true);
      setTimeout(() => {
        setForm({ name: '', email: '', message: '' });
        setShowModal(false);
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-teal-800' : 'bg-white';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-white' : theme === 'ocean' ? 'bg-teal-700 text-white' : 'bg-white';

  return (
    <main className="max-w-4xl mx-auto my-16 px-4">
      <h1 className={`text-4xl font-bold mb-8 text-center ${titleColor}`}>Contact Me</h1>
      
      <form onSubmit={handleSubmit} className={`${cardBg} rounded-lg shadow-lg p-8`}>
        <div className="mb-4">
          <label className={`block mb-2 font-semibold ${theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-gray-700'}`}>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full px-4 py-2 border rounded ${inputBg}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className={`block mb-2 font-semibold ${theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-gray-700'}`}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-4 py-2 border rounded ${inputBg}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className={`block mb-2 font-semibold ${theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-gray-700'}`}>Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows="5"
            className={`w-full px-4 py-2 border rounded ${inputBg}`}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 hover:scale-105 transition">
          Send Message
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md animate-scale-in">
            <Check size={64} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-center">Thank you, {form.name}!</h2>
            <p className="text-gray-600 text-center">Your message was sent successfully.</p>
          </div>
        </div>
      )}
    </main>
  );
}

function NotFoundPage({ theme }) {
  const titleColor = theme === 'dark' || theme === 'ocean' ? 'text-white' : 'text-purple-900';
  
  return (
    <main className="max-w-4xl mx-auto my-16 px-4 text-center">
      <h1 className={`text-6xl font-bold mb-4 ${titleColor}`}>404</h1>
      <p className={`text-2xl mb-8 ${titleColor}`}>Page Not Found</p>
      <p className={theme === 'dark' || theme === 'ocean' ? 'text-gray-300' : 'text-gray-600'}>
        The page you're looking for doesn't exist.
      </p>
      <Link 
        to="/" 
        className="inline-block mt-8 bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
      >
        Go Home
      </Link>
    </main>
  );
}

function Footer({ theme }) {
  const footerBg = theme === 'dark' ? 'bg-gray-800' : theme === 'ocean' ? 'bg-blue-800' : 'bg-purple-900';

  return (
    <footer className={`${footerBg} text-white py-12 mt-20`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-6">
          <a 
            href="https://github.com/homaira1379" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-pink-300 transition transform hover:scale-110"
            aria-label="Visit my GitHub"
          >
            <Github size={28} />
          </a>
          <a 
            href="https://linkedin.com/in/homaira-yousufi-6983311b5" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-pink-300 transition transform hover:scale-110"
            aria-label="Visit my LinkedIn"
          >
            <Linkedin size={28} />
          </a>
          <a 
            href="mailto:humaira.yousufi@gmail.com" 
            className="hover:text-pink-300 transition transform hover:scale-110"
            aria-label="Send me an email"
          >
            <Mail size={28} />
          </a>
        </div>
        <p className="text-purple-200">
          © {new Date().getFullYear()} Homaira Yousufi. All rights reserved.
        </p>
        <p className="text-purple-300 text-sm mt-2">
          Built with React & Passion
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}