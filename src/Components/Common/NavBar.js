import React from 'react'
import styles from "./NavBarStyles.module.css"

import { useNavigate } from 'react-router-dom';

function NavBar() {
  let navigate = useNavigate();

  const handleEvent = () => {
    navigate(`ReportIntegrating`);
  }
  return (
    <>
      <nav>
        <a href="index.html">
        <img src={require("../../Images/evemlogo.png")} height="35px" alt="evem" id="evemlogo"/>
        </a>
        <div>
          <ul id={styles.NavBarEl}>
            <li><a href="index.html">HOME</a></li>
            <li onClick={handleEvent}><a>EVENT</a></li>
            <li><a href="index.html">GALLERY</a></li>
            <li><input class={styles.searchbar} type="text" placeholder="Search"></input></li>
          </ul>
        </div>
      </nav>
    </>
  )
}
export default NavBar