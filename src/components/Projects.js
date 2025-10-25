import { useEffect, useState } from "react";
import "../styles/Projects.css";

function Projects() {
  const owner = "npador07";
  const repo = "nicol-portfolio-v2";
  const getProjectsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/`;

  const [htmlProjects, setHtmlProjects] = useState([]);
  const [jsProjects, setJsProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchProjects(path = `docs/projects`) {
      let results = [];
      try {
        // Fetch folder contents from GitHub API
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

        // GitHub Pages URL for users to open
        const projectLink = encodeURI(
  `https://${owner}.github.io/${repo}/${projectPath
    .replace("docs/", "")
    .replace("/index.html", "")}`
);
        
        /*const projectLink = encodeURI(
  `https://npador07.github.io/${repo}/${projectPath
    .replace("docs/", "")
    .replace("/index.html", "")}`
);*/ //for other option


        // Raw GitHub URL for fetching HTML safely
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${projectPath}`;

        let description = "";
        try {
          const rawResponse = await fetch(rawUrl);
          if (rawResponse.ok) {
            const htmlText = await rawResponse.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");
            const meta = doc.querySelector('meta[name="description"]');
            description = meta ? meta.getAttribute("content") : `A project titled ${projectName}`;
          } else {
            description = `A project titled ${projectName}`;
          }
        } catch {
          description = `A project titled ${projectName}`;
          console.warn(`No description found for ${projectName}`);
        }

        const project = { name: projectName, link: projectLink, description };

        if (parts.includes("HTML and CSS (Responsive Web Design)")) {
          htmlList.push(project);
        } else if (parts.includes("JavaScript Algorithms and Data Structures")) {
          jsList.push(project);
        }
      }

      setHtmlProjects(htmlList);
      setJsProjects(jsList);

        setLoading(false);
    }

    loadProjects();
  }, [getProjectsUrl]);

  return (
    <div className="container">
      <section id="projects" className="projects">
        <h2>Projects</h2>
         {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      ) : (
        <div className="grid-section">
          <details open>
            <summary id="summaryLabelHTML">HTML and CSS (Responsive Web Design)</summary>
            <div id="grid-container-HTML" className="grid-container">
              {htmlProjects.map((proj, idx) => (
                <a key={idx} href={proj.link} className="grid-item" target="_blank" rel="noopener noreferrer">
                  <h3>{proj.name}</h3>
                  <p>{proj.description}</p>
                </a>
              ))}
            </div>
          </details>

          <details open>
            <summary id="summaryLabelJSCRIPT">JavaScript Algorithms and Data Structures</summary>
            <div id="grid-container-javascript" className="grid-container">
              {jsProjects.map((proj, idx) => (
                <a key={idx} href={proj.link} className="grid-item" target="_blank" rel="noopener noreferrer">
                  <h3>{proj.name}</h3>
                  <p>{proj.description}</p>
                </a>
              ))}
            </div>
          </details>
         
        </div>
          )}
      </section>
    </div>
  );
}

export default Projects;
