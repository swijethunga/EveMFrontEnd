import React from "react";
import CrudVendorReport from "../Components/Vendor/CrudVerdorReport";
//import styles from '../Components/Income/BudgetReportStyles.module.css';
import { useParams } from 'react-router-dom';

const Vendor = () =>{
    const { eventName,eventid } = useParams();
    

    return(
    <div>
        <h3>{eventName}</h3>
        <h2>Vendor Detail Report</h2>
        <CrudVendorReport name={eventName}/>
    </div>)
}

export default Vendor;
