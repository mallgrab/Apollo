import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../backend/Auth";
import type { Project, Task } from "../types/Backend";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [projectRes, tasksRes] = await Promise.all([
          axiosInstance.get(`/projects/${id}`),
          axiosInstance.get(`/projects/${id}/tasks`),
        ]);

        setProject(projectRes.data);
        setTasks(tasksRes.data);
      } 
      catch {
        navigate("/dashboard");
      }
    })();
  }, []);

  const addTask = async (submitEvent: React.SubmitEvent) => {
    submitEvent.preventDefault();
    if (!newTask.trim()) 
      return;

    try {
      const res = await axiosInstance.post(`/projects/${id}/tasks`, { title: newTask, finished: false });
      setTasks([...tasks, res.data]);
      setNewTask("");
    }
    catch
    {
      // TODO: missing error here
    }
  };

  const toggleTask = async (task: Task) => {
    const res = await axiosInstance.patch(`/projects/${id}/tasks/${task.id}`, { finished: !task.finished });
    setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
  };

  const deleteTask = async (taskId: number) => {
    await axiosInstance.delete(`/projects/${id}/tasks/${taskId}`);
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-left">
          <Link to="/dashboard" className="btn-secondary">
            Go back to Projects
          </Link>
        </div>
      </header>

      <main className="main">
        <div className="page-header">
          <div>
            <h2>{project?.title}</h2>
            <p className="subtitle">{project?.description}</p>
          </div>
        </div>

        <form onSubmit={addTask} className="inline-form">
          <input
            type="text"
            placeholder="Add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <button type="submit" className="btn-primary">
            Add
          </button>
        </form>

        {
          <div className="task-list">{
            tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.finished ? "done" : ""}`}>
                <button className="task-check" onClick={() => toggleTask(task)}>
                  {task.finished ? "✓" : ""}
                </button>

                <span className="task-title">{task.title}</span>
                
                <button className="btn-danger" onClick={() => 
                  deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            ))
          }
          </div>
        }
      </main>
    </div>
  );
}
