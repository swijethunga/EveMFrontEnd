import { Card, CardContent, Typography, styled  } from "@mui/material";
import style from "./Display.module.css"

const Container = styled(Typography)`
display:flex;
& > div{
    flex:1;
    padding: 10px;

    }
`

const Display = ({data}) =>{
    

    let income = 0;
    let expense = 0

    for (let i = 0; i < data.length; i++) {
     if (data[i].transac_type === "income") {    
        income += data[i].transac_amount
     } else if (data[i].transac_type === "Expense") {
        expense += data[i].transac_amount
     }
        
    }
    
    




    // const transac_amount = data.map(data => data.transac_amount);
    //  const income = transac_amount.filter(item => item > 0).reduce((transac_amount, item) => (transac_amount += item) , 0).toFixed(2);
    //  const expense = (transac_amount.filter(item => item < 0).reduce((transac_amount, item) => (transac_amount += item) , 0)* -1).toFixed(2);
    
     

    return(

        <Container>
            <div className={style.cont}>
            <Card>
                <CardContent>
                <Typography>Income</Typography>
                <Typography style={{color:"green"}}>Rs.{income}</Typography>
                </CardContent>
            </Card>
            </div>
           

        <div className={style.cont}>

            <Card>
                <CardContent>
                <Typography>Expense</Typography>
                <Typography style={{color:'red'}}>Rs.{expense}</Typography>
                </CardContent>
            </Card>
        </div>
            
        </Container>
    )
}
export default Display;