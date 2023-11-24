// import Gallery from "./Pages/Gallery";
// import HomePage from "./Pages/HomePage"

// function App() {
//   return (
//     <div>
//       {/* <HomePage/> */}
//       <Gallery/>
//     </div>
//   );
// }
// export default App;

import { React } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from "react-router-dom";
import NavBar from './Components/Common/NavBar';
import HomePage from "./Pages/HomePage"
import Gallery from "./Pages/Gallery";
import CashFlow from './Pages/CashFlow';
import IncomeExpense from "./Pages/IncomeExpense";
import Vendor from "./Pages/Vendor";
import ReportIntegrating from "../src/Components/ReportConnect/ReportIntegrating"





export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Root />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/gallery" element={<Gallery />} />

                    <Route path="ReportIntegrating" element={<ReportIntegrating />} />
                    {/* <Route path="incomeexpense" element={<IncomeExpense />} />
                    <Route path="cashflow" element={<CashFlow />} />
                    <Route path="vendor" element={<Vendor />} /> */}


                    <Route path="incomeexpense/:eventid/:eventName" element={<IncomeExpense />} />
                    <Route path="cashflow/:eventid/:eventName" element={<CashFlow />} />
                    <Route path="vendor/:eventid/:eventName" element={<Vendor />} />



                </Route>
            </>

        )
    )

    return (
        <div>
            <RouterProvider router={router} />
        </div>

    )
}

const Root = () => {
    return (
        <>
            <NavBar />
            <div><Outlet /></div>
        </>
    )
}

