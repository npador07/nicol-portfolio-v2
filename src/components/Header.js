import '../styles/Header.css';
function Header(){
    return(
      
        <div className="container">
             <section id="header-section" className="header-section"> 
   <img
   id="profile-pic"
  className="profile-pic"
  src={`${process.env.PUBLIC_URL}/images/profile.jpg`}
  alt="Nicol Pador"
/>  
   
            <div id="intro-div" className="intro-div">
                <h1>Hi! I'm Nicol</h1>
                <p>An aspiring full-stack web developer</p> </div>
            <nav id="header-div" className="header-div">
                <a className="header-btn" href="#projects"><i className="fa-solid fa-folder-open"></i>Projects</a>
                <a className="header-btn" href="#about-me"><i className="fa-solid fa-user"></i>About Me</a>
                <a className="header-btn" href="#skills"><i className="fa-solid fa-code"></i>Skills</a>
                <a className="header-btn" href="#contact"><i className="fa-solid fa-phone"></i>Contact</a>
            </nav>
        
    </section>
        </div>
        
    );

}
export default Header;