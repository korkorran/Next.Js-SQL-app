import Link from 'next/link'
import useAuth from "../contexts/auth"
import {useState} from 'react'

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  function toggleMenu() {
    setIsClicked(!isClicked);
  }

  return (
<nav className="navbar is-primary is-spaced" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
  <Link href="/">
    <a className="navbar-item" >
      <h1>
        <b> <span className="is-size-4" style={{verticalAlign:"middle"}}>🏛</span>
        Next.Js SQL App</b>
      </h1>
    </a>
  </Link>
  
  <a 
    role="button" 
    className={"navbar-burger burger " + (isClicked ? "is-active" : "")} 
    aria-label="menu" 
    aria-expanded="false" 
    onClick={toggleMenu}>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
  </div>
  
  <div className={"navbar-menu " + (isClicked ? "is-active" : "")}>
    {!isAuthenticated &&
    <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link href="/sign-up">
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
            </Link>
            <Link href="/log-in">
            <a className="button is-light">
              Log in
            </a>
            </Link>
          </div>
        </div>
    </div>
    }
    {isAuthenticated &&
    <div className="navbar-end">
        <div className="navbar-item has-dropdown is-hoverable">
          <div 
            className="loggedAvatar navbar-link is-arrowless" 
            style={{ backgroundImage: `url("${
              user.profilePictureURL ? user.profilePictureURL : '/undraw_male_avatar_323b.svg'
            }")`}} 
            >
                    
          </div>
          <div className="navbar-dropdown is-right">
            <Link href={`/profile/${user.username}`} >
              <a className="navbar-item">Profile</a>
            </Link>
            <hr className="navbar-divider"></hr>
            <Link href="/settings" >
              <a className="navbar-item">Settings</a>
            </Link>
            <hr className="navbar-divider"></hr>
            <a 
              className="navbar-item"
              onClick={logout}
              >
              Log out
            </a>
          </div>
          
        </div>
    </div>
    }
  </div>


</nav>
)}

export default NavBar
