import Html from 'react-pdf-html';
import React from 'react';

const GeneratePDF = () =>{

    <Html>
        <h2>
            Income & Expense Statement 

        </h2>

             <h3>New year festival</h3>

             <h5>Total income</h5>
             <h5>Total expense</h5>
             <h5>Balance</h5>

    </Html>

    return(
        <div>
            <button onClick={GeneratePDF}>Download</button>
        </div>
    )
}
export default GeneratePDF;
