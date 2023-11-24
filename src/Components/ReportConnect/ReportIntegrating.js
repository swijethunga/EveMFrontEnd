import React from 'react'
import { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';




import Style from '../ReportConnect/ReportIntegrating.module.css'






export default function ReportIntegrating() {
  let navigate = useNavigate();



  const [eventNames, setEventNames] = useState([]);




  const handleButtonClick = () => {
    const eventName = document.getElementById('myDropdown').value;
    const eventNames = eventName.split(",")
    navigate(`/incomeexpense/${eventNames[0]}/${eventNames[1]}`);
  };

  const handleCashFlowClick = () => {
    const eventName = document.getElementById('myDropdown').value;
    const eventNames = eventName.split(",")
    navigate(`/cashflow/${eventNames[0]}/${eventNames[1]}`);
  };


  const handleVendorClick = () => {
    const eventName = document.getElementById('myDropdown').value;
    const eventNames = eventName.split(",")
    navigate(`/vendor/${eventNames[0]}/${eventNames[1]}`);
  };




  useEffect(() => {
    fetchEventNames();
  }, []);

  const fetchEventNames = async () => {
    try {
      const response = await fetch('https://localhost:7133/api/Event');
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        // setEventNames(data.map(event => event.eventName));
        setEventNames(data)
      } else {
        console.error('Failed to fetch event names');
      }
    } catch (error) {
      console.error('Failed to fetch event names:', error);
    }
  };

  return (


    <div className={Style.container}>
      
       <h1 className={Style.h1header}>Comfirmed Events</h1>

      

      <div className={Style.dropdowndiv}>
        <select id="myDropdown">
          {eventNames.map((eventName, index) => (
            <option key={index} value={[eventName.id, eventName.eventName]}>{eventName.eventName}</option>
          ))}
        </select>




      </div>

      <br></br>

      <h3>Event Income & Expense </h3>     

      <button onClick={handleButtonClick}>Income & Expense</button>


      <br></br>

      <h3>Cash Flow</h3>

      <button onClick={handleCashFlowClick}>Cash Flow</button>

      <br></br>

      <h3>Vendor Details</h3>

      <button onClick={handleVendorClick}>Vendor Details</button>







    </div>

  )
};
