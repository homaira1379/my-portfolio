export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <img
        src={project.image}
        alt={project.name}
        style={{ width: "100%", borderRadius: "6px" }}
      />
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>
        {project.tech.map((t) => (
          <span key={t} className="badge">{t}</span>
        ))}
      </p>
      {project.featured && <span className="badge featured">🌟 Featured</span>}
      {project.link && (
        <p>
          <a href={project.link} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        </p>
      )}
    </div>
  );
}
