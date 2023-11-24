import React from "react";
import { Box, Typography ,styled} from "@mui/material";

const BalanceText = styled(Typography)`
    font-size: 25px;
    margin-bottom:20px;
    `

const DisplayBalance = ({data}) =>{

    let income = 0;
    let expense = 0

    for (let i = 0; i < data.length; i++) {
     if (data[i].transac_type === "income") {    
        income += data[i].transac_amount
     } else if (data[i].transac_type === "Expense") {
        expense += data[i].transac_amount
     }
        
    }
    const total = income - expense

    // const transac_amount = data.map(data => data.transac_amount);
    // const total = transac_amount.reduce((transac_amount, item) => (transac_amount += item) , 0).toFixed(2);
    
    return(
        <Box>
            <BalanceText>Balance:Rs.{total}</BalanceText>
    </Box>
    )

    
}
export default DisplayBalance;