import React from "react";
import  {useState, useEffect} from "react";
import CrudBudgetReport from "../Components/Income/CrudBudgetReport";
import styles from '../Components/Income/BudgetReportStyles.module.css';
import DisplayCashFlow from "../Components/Income/DisplayCashFlow";
import DisplayCashFlowBalance from "../Components/Income/DisplayCashFlowBalance";
import { useParams } from 'react-router-dom';



export default function CashFlow(){

    const [data, setData] = useState([]);
   // const { eventName } = useParams();
   const { eventName,eventid } = useParams();
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://localhost:7133/api/EventCashFlow/event/${eventid}`);
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);

    return(
        <>
            <div className={styles.brfback}>
                <h3> {eventName}</h3>
                <h2>Cash Flow Report</h2>

                <br></br>
                <DisplayCashFlowBalance data={data}/>
                <br></br>
                <DisplayCashFlow data={data}/>
                <br></br>
                <CrudBudgetReport name = {eventName}/>
                {/* <CrudForExpense/> */}
                
                
                

            </div>
            
        
        
        </>
    );
}
