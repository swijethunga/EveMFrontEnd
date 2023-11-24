import React from "react";
import styles from "../Components/Gallery/GalleryStyles.module.css";
import { BiSlider } from "react-icons/bi";



function Gallery(){
    return(
        <>
            <img src={require("../Images/GlryCovr.jpg")} alt="GalleryCover" className={styles.GlryCvr}></img>
            <div class={styles.CvrClrMx}></div>
            <p class={styles.WebNme}>EveM</p>
            <p class={styles.ScndP}>Event Management</p>
            <button class={`${styles.btn} ${styles.Rec_01}`}>All</button>
            <button class={`${styles.btn} ${styles.Rec_02}`}>Trip</button>
            <button class={`${styles.btn} ${styles.Rec_03}`}>Charity</button>
            <button class={`${styles.btn} ${styles.Rec_04}`}>Sports</button>
            <button class={`${styles.btn} ${styles.Rec_05}`}>Festival</button>
            <button class={`${styles.btn} ${styles.Rec_06}`}>Other</button>
            <div class={styles.Midlimg}></div>
            <hr class={styles.MdlHr}></hr>
            {/* <img src={require("../Images/Filter.png")} alt="FilterImage" class={styles.Filter}></img> */}
            <BiSlider class={styles.Filter}/>
            <p class={styles.fltr}>Filters</p>

            <div class={styles.FltrBox}></div>
            <button class={styles.AplFlt}>Apply Filters</button>
                       
        </>
    );
}

export default Gallery;