import './App.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Projects from './components/Projects';
import DarkMode from './components/DarkMode';


function App() {
  return (
    <div>
      <DarkMode />
      <Header />
      <Projects />
      <About />
      <Skills /> 
      <Contact />

    </div>
  );
}
export default App;