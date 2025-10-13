// Projects.js
import { useEffect, useState } from "react";
import "../styles/Projects.css";

function Projects() {
  const owner = "npador07";
  const repo = "nicol-portfolio";
  const getProjectsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/`;

  const [htmlProjects, setHtmlProjects] = useState([]);
  const [jsProjects, setJsProjects] = useState([]);


 useEffect(() => {
  async function fetchProjects(path = `projects`) {
    let results = [];
    try {
      const response = await fetch(`${getProjectsUrl}${path}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      for (const item of data) {
        if (item.type === "dir") {
          const subResults = await fetchProjects(item.path);
          if (Array.isArray(subResults)) results = results.concat(subResults);
        } else if (item.name.toLowerCase() === "index.html") {
          results.push(item.path);
        }
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
    return results;
  }

  async function loadProjects() {
    const allProjects = await fetchProjects();

    const htmlList = [];
    const jsList = [];

    for (const projectPath of allProjects) {
      const parts = projectPath.split("/");
      const projectName = parts[parts.length - 2];
      const projectLink = `https://npador07.github.io/nicol-portfolio/${projectPath}`;

      let description = "";
      try {
        const response = await fetch(projectLink);
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const meta = doc.querySelector('meta[name="description"]');
        if (meta) description = meta.getAttribute("content");
      } catch {
        console.warn(`No description found for ${projectName}`);
      }

      const project = { name: projectName, link: projectLink, description };

      if (parts[parts.length - 3] === "HTML and CSS (Responsive Web Design)") {
        htmlList.push(project);
      } else if (parts[parts.length - 3] === "JavaScript Algorithms and Data Structures") {
        jsList.push(project);
      }
    }

    setHtmlProjects(htmlList);
    setJsProjects(jsList);
  }

  loadProjects();
}, [getProjectsUrl]); // ✅ Safe dependency


  return (
    <div className="container">
      <section id="projects" className="projects">
        <h2>Projects</h2>
        <div className="grid-section">
          <details>
            <summary id="summaryLabelHTML">HTML and CSS (Responsive Web Design)</summary>
            <div id="grid-container-HTML" className="grid-container">
              {htmlProjects.map((proj, idx) => (
                <a key={idx} href={proj.link} className="grid-item" target="_blank" rel="noopener noreferrer">
                  <h3>{proj.name}</h3>
                  <p>{proj.description || "No description available."}</p>
                </a>
              ))}
            </div>
          </details>

          <details>
            <summary id="summaryLabelJSCRIPT">JavaScript Algorithms and Data Structures</summary>
            <div id="grid-container-javascript" className="grid-container">
              {jsProjects.map((proj, idx) => (
                <a key={idx} href={proj.link} className="grid-item" target="_blank" rel="noopener noreferrer">
                  <h3>{proj.name}</h3>
                  <p>{proj.description || "No description available."}</p>
                </a>
              ))}
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}

export default Projects;
