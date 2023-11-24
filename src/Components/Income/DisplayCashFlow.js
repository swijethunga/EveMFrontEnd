import { Card, CardContent, Typography, styled  } from "@mui/material";
import style from './DisplayCashFlow.module.css';

const Container = styled(Typography)`
display:flex;
& > div{
    flex:1;
    padding: 10px;

    }
`


const DisplayCashFlow = ({data}) =>{

let cashInflow = 0;
let cashOutflow = 0;

for (let i = 0; i < data.length; i++) {
    if (data[i].cex_type === "cashInFlow") {    
       cashInflow += data[i].cex_amount
    } else if (data[i].cex_type === "cashOutFlow") {
       cashOutflow += data[i].cex_amount
    }
       
   }

   return(

    <Container>
        <div className={style.cont}>
        <Card>
            <CardContent>
            <Typography>Net Cash Inflow</Typography>
            <Typography style={{color:"green"}}>Rs.{cashInflow}</Typography>
            </CardContent>
        </Card>
        </div>
       

    <div className={style.cont}>

        <Card>
            <CardContent>
            <Typography>Net Cash Outflow</Typography>
            <Typography style={{color:'red'}}>Rs.{cashOutflow}</Typography>
            </CardContent>
        </Card>
    </div>
        
    </Container>
)
    

}
export default DisplayCashFlow;