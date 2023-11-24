import React, {useState, useEffect} from "react";
import CrudExpenseReport from "../Components/Expense/CrudExpenseReport";
import styles from '../Components/Expense/CrudExpenseReportStyles.module.css';
import Display from "../Components/Expense/Display";
import DisplayBalance from "../Components/Expense/DisplayBalance";
import { useParams } from 'react-router-dom';




const IncomeExpense = () =>{
    const [data, setData] = useState([]);
    const { eventName,eventid } = useParams();

    
  
    

    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7133/api/EventExpense/event/${eventid}`);
        const jsonData = await response.json();
        
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

    return( 
    <div className={styles.brfback}>
        
        <h2>{eventName} </h2>
        <h2>Income - Expense Report</h2>

            <br></br>
            <DisplayBalance data={data}/>
        
            <br></br>
            <Display data={data}/>

            

            <br></br>
            
        <CrudExpenseReport eventName = {eventName} data={data}/>
        
        
        

    </div>
    );
}
export default IncomeExpense;