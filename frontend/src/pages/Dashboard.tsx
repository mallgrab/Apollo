import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../backend/Auth";
import type { Project } from "../types/Backend";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/projects");
        setProjects(res.data);
      } 
      catch {
        navigate("/login");
      }
    })();
  }, []);

  const createProject = async (submitEvent: React.SubmitEvent) => {
    // stop default browser form submission since we want to not have the browser refresh the page
    submitEvent.preventDefault();

    try {
      const res = await axiosInstance.post("/projects", form);
      setProjects([...projects, res.data]);
      setForm({ title: "", description: "" });
    }
    catch
    {
      // TODO: missing error here
    }
  };

  const deleteProject = async (id: number) => {
    await axiosInstance.delete(`/projects/${id}`);
    setProjects(projects.filter((p) => p.id !== id));
  };

  const logout = async () => {
    await axiosInstance.post("/logout");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-left">
          <span className="logo">Dashboard</span>
        </div>
        
        <button className="btn-secondary" onClick={logout}>
          Logout
        </button>
      </header>

      <main className="main">
        <div className="page-header">
          <div>
            <h2>Projects</h2>
          </div>
        </div>

        <form onSubmit={createProject} className="inline-form">
          <input
            type="text"
            placeholder="Project name"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />

          <button type="submit" className="btn-primary">
            {"Create"}
          </button>
        </form>

        <div className="project-grid">
          {
            projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-card-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <div className="project-card-footer">
                  <Link to={`/projects/${project.id}`} className="btn-secondary">
                    View tasks
                  </Link>
                  
                  <button className="btn-danger" onClick={() => deleteProject(project.id)}>
                    Delete
                  </button>
                </div>

              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}
