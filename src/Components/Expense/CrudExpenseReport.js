import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Pagination from 'react-bootstrap/Pagination';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useParams } from 'react-router-dom';


const CrudExpenseReport = (props) => {

    // const conponentPDF = useRef();
    const { eventid, } = useParams();


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //   const [transac_id, settransac_id] = useState("");
    const [transac_name, settransac_name] = useState("");
    const [transac_date, settransac_date] = useState("");
    const [transac_amount, settransac_amount] = useState("");
    const [transac_type, settransac_type] = useState("income");

    const [Edittransac_id, setEdittransac_id] = useState("");
    const [Edittransac_name, setEdittransac_name] = useState("");
    const [Edittransac_date, setEdittransac_date] = useState("");
    const [Edittransac_amount, setEdittransac_amount] = useState("");
    const [Edittransac_type, setEdittransac_type] = useState("");

    // const currentDate = new Date();
    // const selectedDate = new Date(transac_date);

    const [searchQuery, setSearchQuery] = useState('');


    const expensedata = [
        {
            transac_id: 1,
            transac_name: "donation1",
            transac_date: "2022/01/01",
            transac_amount: 23500,
            transac_type: "income",
        },

        {
            transac_id: 2,
            transac_name: "donation2",
            transac_date: "2022/02/01",
            transac_amount: 20000,
            transac_type: "expense",
        },

        {
            transac_id: 3,
            transac_name: "donation3",
            transac_date: "2022/03/01",
            transac_amount: 56500,
            transac_type: "income",
        },
    ];

    let income = 0;
    let expense = 0

    for (let i = 0; i < props.data.length; i++) {
     if (props.data[i].transac_type === "income") {    
        income += props.data[i].transac_amount
     } else if (props.data[i].transac_type === "Expense") {
        expense += props.data[i].transac_amount
     }
        
    }
    

    const [data, setdata] = useState(expensedata);

    const   getdata = () => {
        console.log(eventid)
        axios.get(`https://localhost:7133/api/EventExpense/event/${eventid}`) 
            .then((result) => {
                console.log(result.data)
                setdata(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getdata();
    }, []);

    const handleExpenseEdit = (transac_id) => {
        handleShow();
        axios.get(`https://localhost:7133/api/EventExpense/${transac_id}`)
            .then((result) => {
                console.log(result)
                setEdittransac_id(transac_id)
                setEdittransac_name(result.data.transac_name);
                setEdittransac_date(result.data.transac_date);
                setEdittransac_amount(result.data.transac_amount);
                setEdittransac_type(result.data.transac_type);

            })
    }

    const handleExpenseDelete = (transac_id) => {
        if (window.confirm("Are you sure to delete this record") === true) {
            axios.delete(`https://localhost:7133/api/EventExpense/${transac_id}`)
                .then((result) => {
                    if (result.status === 200) {
                        getdata();
                    }

                })
        }
        window.location.reload();

    }






    // const handleExpenseUpdate = () =>{
    //     const url = `https://localhost:7056/api/EventExpense/${Edittransac_id}`;
    // const data = {
    //   "transac_name": Edittransac_name,
    //   "transac_date": Edittransac_date,
    //   "transac_amount": Edittransac_amount
    // }

    // axios.put(url, data)
    // .then((result) => {
    //   getdata();
    //   clear();
    //   toast.success("expense successfully updated", {
    //     position: 'bottom-center'
    //   });
    //   handleClose();
    // })
    // .catch((error) => {
    //   console.log(error);
    //   toast.error("Failed to update expense", {
    //     position: 'bottom-center'
    //   });
    // });

    // }

    const handleExpenseUpdate = () => {
        if (Edittransac_id) {
            const url = `https://localhost:7133/api/EventExpense/${Edittransac_id}`;
            const data = {
                "transac_name": Edittransac_name,
                "transac_date": Edittransac_date,
                "transac_amount": Edittransac_amount,
                "transac_type": Edittransac_type
            }

            axios.put(url, data)
                .then((result) => {
                    getdata();
                    clear();
                    toast.success("expense successfully updated", {
                        position: 'bottom-center'
                    });
                    handleClose();
                    // window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to update expense", {
                        position: 'bottom-center'
                    });
                });
            // window.location.reload();

        }
        else {
            handleExpenseSave();

        }



        // const url = `https://localhost:7056/api/EventExpense/${Edittransac_id}`;
        // const data = {
        //     "transac_name": Edittransac_name,
        //     "transac_date": Edittransac_date,
        //     "transac_amount": Edittransac_amount,
        //     "transac_type": Edittransac_type
        // }

        // axios.put(url, data)
        //     .then((result) => {
        //         getdata();
        //         clear();
        //         toast.success("expense successfully updated", {
        //             position: 'bottom-center'
        //         });
        //         handleClose();
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         toast.error("Failed to update expense", {
        //             position: 'bottom-center'
        //         });
        //     });
        //     window.location.reload();

    }





    const handleExpenseSave = () => {
        const url = "https://localhost:7133/api/EventExpense";     
        const data = {
             "eventId": eventid,
            "transac_name": transac_name,
            "transac_date": transac_date,
            "transac_amount": transac_amount,
            "transac_type": transac_type
        }

        axios.post(url, data)
            .then((result) => {
                console.log("test");
                alert("Successfully Recorded");
                getdata();
                clear();
            })
            .catch((error) => {
                alert("Record not submitted");
                // toast.error("record not submitted", {
                //     position: 'bottom-center'
                // });
            });
    }

    const clear = () => {
        //  settransac_id();
        settransac_name("");
        settransac_date("");
        settransac_amount();
        settransac_type("");
        setEdittransac_id();
        setEdittransac_name("");
        setEdittransac_date("");
        setEdittransac_amount();
        setEdittransac_type("");
    }

    const currentDate = new Date().toISOString().split('T')[0];

    

    // const generatePDF = useReactToPrint({
    //     content: ()=>conponentPDF.current,
    //     documentTitle:"data",
    //     onAfterPrint:()=>alert("Data saved to PDF")
    // });

    // const exportPDF = async () =>{
    //     const doc = new jsPDF({orientation: 'landscape'});

    //     doc.autoTable({
    //         html: '#table1'


    //     })

    //     doc.save('data.pdf');
    // }

    const itemsPerPage = 5;

    

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Initialize the current page state
    const [currentPage, setCurrentPage] = useState(1);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    // Go to the last page
    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    
      
      
      
    

    
    
      
      
      
      

    const exportPDF = () => {
        const doc = new jsPDF({ orientation: "portrait" });
      
        const tableData = data.map((item2) => {
          const { transac_name, transac_type, transac_date, transac_amount } = item2;
          return { transac_name, transac_type, transac_date, transac_amount };
        });
      
        const columns = [
          { header: "Transaction Name", dataKey: "transac_name" },
          { header: "Transaction Type", dataKey: "transac_type" },
          { header: "Transaction Date", dataKey: "transac_date" },
          { header: "Transaction Amount", dataKey: "transac_amount" },
        ];

        
      
        doc.autoTable({
          columns,
          body: tableData,
          didDrawPage: (data) => {
            doc.setFontSize(16);
            doc.text(props.eventName, 30, 8, { align: 'center' });
          },
        });

        doc.autoTable({
            head: [['', 'Total Amount']],
            body: [
              ['Income', income.toFixed(2)],
              ['Expense', expense.toFixed(2)],
              ['Balance', (income - expense).toFixed(2)]
            ],
          
        });
      
        doc.save(props.eventName+".pdf");
        // doc.save("data.pdf");
      };
      
      

    // if (selectedDate > currentDate) {
    //     toast.error("Transac_date is a future date, Invalid Input", {
    //       position: "bottom-center"
    //     });
    //     return;
    //   }


    return (<div>
        <Fragment>
            <Container>
                <ToastContainer />
                <Form>

                    <Row>
                       


                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Transaction name</Form.Label>
                                <Form.Control type="text" value={transac_name} onChange={(e) => settransac_name(e.target.value)} />
                            </Form.Group>
                        </Col>


                        <Col>
                            <label>Transaction type</label>
                            <Form.Select value={transac_type} onChange={(e) => settransac_type(e.target.value)}>
                                <Form.Label>Transaction type</Form.Label>
                                <option value="income">Income</option>
                                <option value="Expense">Expense</option>
                            </Form.Select>
                        </Col>

                    </Row>

                    <Row>

                        {/* <label>
                    Transaction_date:
                    <input type="date" value={transac_date} onChange={(e) => settransac_date(e.target.value)} />
                </label> */}

                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Transaction date</Form.Label>
                                <Form.Control type="date" value={transac_date} onChange={(e) => settransac_date(e.target.value)} max={currentDate}/>
                            </Form.Group>
                        </Col>





                    

                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Transaction amount</Form.Label>
                                <Form.Control type="text" value={transac_amount} onChange={(e) => settransac_amount(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>


                    <button className='btn btn-primary' onClick={() => handleExpenseSave()}>Submit</button> &nbsp;

                    <button className='btn btn-primary' onClick={exportPDF}>Download Table</button> &nbsp; 

                    <input
                    type="text"
                    placeholder="Search transaction name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />

                </Form>
            </Container>

            <br></br>

            <div style={{ height: '300px', overflowY: 'scroll' }}>
                <Table striped bordered hover className="table-responsive" id="table1">
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Id</th>
                            <th>Transaction name</th>
                            <th>Transaction type</th>
                            <th>Transaction date</th>
                            <th>Transaction amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.filter((item2) => item2.transac_name.toLowerCase().includes(searchQuery.toLowerCase())).slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage
                              ).map((item2, index) => {
                                return (
                                    
                                    <tr>
                                        <td>{item2.id}{index + 1}</td>
                                        
                                        <td>{item2.transac_name}</td>
                                        <td>{item2.transac_type}</td>
                                        <td>{item2.transac_date}</td>
                                        <td>{item2.transac_amount}</td>
                                        <td colSpan={2}>
                                            

                                            <EditIcon onClick={() => handleExpenseEdit(item2.id)} /> &nbsp;
                                            <DeleteIcon onClick={() => handleExpenseDelete(item2.id)} />

                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No Data In the table</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <Pagination>

                    <Pagination.First onClick={goToFirstPage} />
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />

                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last onClick={goToLastPage} />
                </Pagination>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you need to modify the record</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form>


                        <Row>
                            <label>
                                Transaction_name:
                                <input type="text" className='form-control' value={Edittransac_name} onChange={(e) => setEdittransac_name(e.target.value)} />
                            </label>
                        </Row>

                        <Row>
                            <label>
                                Type:
                                <select className="form-control"
                                    value={Edittransac_type}
                                    onChange={(e) => setEdittransac_type(e.target.value)}
                                >
                                    <option value="income">Income</option>
                                    <option value="Expense">Expense</option>
                                </select>
                            </label>
                        </Row>

                        <Row>
                            <label>
                                Transaction_date:
                                <input type="date" className='form-control' value={Edittransac_date} onChange={(e) => setEdittransac_date(e.target.value)} />
                            </label>
                        </Row>

                        <Row>
                            <label>
                                Transaction_amount:
                                <input type="text" className='form-control' value={Edittransac_amount} onChange={(e) => setEdittransac_amount(e.target.value)} />
                            </label>
                        </Row>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleExpenseUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </Fragment>


    </div>);
};

export default CrudExpenseReport;