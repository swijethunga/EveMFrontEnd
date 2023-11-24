import React from "react";
import { Box, Typography ,styled} from "@mui/material";

const BalanceText = styled(Typography)
`
    font-size: 25px;
    margin-bottom:20px;
`

const DisplayCashFlowBalance = ({data}) => {

    let cashInflow = 0;
    let cashOutflow = 0;
    
    for (let i = 0; i < data.length; i++) {
        if (data[i].cex_type === "cashInFlow") {    
           cashInflow += data[i].cex_amount
        } else if (data[i].cex_type === "cashOutFlow") {
           cashOutflow += data[i].cex_amount
        }
           
       }

       const netCashFlow = cashInflow - cashOutflow;
    
       return(
        <Box>
            <BalanceText>Cash Flow Balance:Rs.{netCashFlow}</BalanceText>
    </Box>
    )

}
export default DisplayCashFlowBalance