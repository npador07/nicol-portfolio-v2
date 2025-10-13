function Header(){
    return(
      
        <div className="container">
   <img id="profile-pic" src="images/profile.jpg" />   
            <div>
                <h1>Hi! I'm Nicol</h1>
                <p>An aspiring full-stack web developer</p>
            </div>
            <div id="header-div" className="header-div">
                <a className="header-btn" href="#projects"><i className="fa-solid fa-folder-open"></i>Projects</a>
                <a className="header-btn" href="#about-me"><i className="fa-solid fa-user"></i>About Me</a>
                <a className="header-btn" href="#skills"><i className="fa-solid fa-code"></i>Skills</a>
                <a className="header-btn" href="#contact"><i className="fa-solid fa-phone"></i>Contact</a>
            </div>
        
        </div>
        
    );

}
export default Header;