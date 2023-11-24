import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Pagination from 'react-bootstrap/Pagination';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useParams } from 'react-router-dom';



const CrudBudgetReport = (props) => {

  const [searchQuery, setSearchQuery] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   const [cex_id, setcex_id] = useState("");
  const [cex_name, setcex_name] = useState("");
  const [cex_date, setcex_date] = useState("");
  const [cex_amount, setcex_amount] = useState("");
  const [cex_type, setcex_type] = useState("cashInFlow");

  const [Editcex_id, setEditcex_id] = useState("");
  const [Editcex_name, setEditcex_name] = useState("");
  const [Editcex_date, setEditcex_date] = useState("");
  const [Editcex_amount, setEditcex_amount] = useState("");
  const [Editcex_type, setEditcex_type] = useState("");

  // const [errors, setErrors] = useState({});

  const currentDate = new Date().toISOString().split('T')[0];

  const incomedata = [
    {
      cex_id: 1,
      cex_name: "donation1",
      cex_date: "2022/01/01",
      cex_amount: 23500,
      cex_type: "cash-inflow",
    },

    {
      cex_id: 2,
      cex_name: "donation2",
      cex_date: "2022/02/01",
      cex_amount: 20000,
      cex_type: "cash-outflow",
    },

    {
      cex_id: 3,
      cex_name: "donation3",
      cex_date: "2022/03/01",
      cex_amount: 56500,
      cex_type: "cash-outflow",
    },
  ];

  const [data, setData] = useState(incomedata);
  const { eventName,eventid } = useParams();

  const getData = () => {
    axios.get(`https://localhost:7133/api/EventCashFlow/event/${eventid}`)
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (cex_id) => {
    handleShow();

    axios.get(`https://localhost:7133/api/EventCashFlow/${cex_id}`)
      .then((result) => {
        setEditcex_id(cex_id);
        setEditcex_name(result.data.cex_name);
        setEditcex_date(result.data.cex_date);
        setEditcex_amount(result.data.cex_amount);
        setEditcex_type(result.data.cex_type);

      })
  }

  const handleDelete = (cex_id) => {
    if (window.confirm("Are you sure to delete this record") === true) {
      axios.delete(`https://localhost:7133/api/EventCashFlow/${cex_id}`)
        .then((result) => {
          if (result.status === 200) {
            getData();
            toast.delete("record successfully deleted");
          }
        })
    }
  }

  const handleUpdate = () => {


    const url = `https://localhost:7133/api/EventCashFlow/${Editcex_id}`;
    const data = {
      //"cex_name": cex_id,
      "cex_name": Editcex_name,
      "cex_date": Editcex_date,
      "cex_amount": Editcex_amount,
      "cex_type": Editcex_type

    }


    axios.put(url, data)
      .then((result) => {
        getData();
        clear();
        handleClose();
        toast.success("record successfully updated");
      })
  }

  const handleSave = () => {
    const url = "https://localhost:7133/api/EventCashFlow";
    const data = {
      // "cex_id": cex_id,
      "eventId": eventid,
      "cex_name": cex_name,
      "cex_date": cex_date,
      "cex_amount": cex_amount,
      "cex_type": cex_type
    }

    // const isValid = validate();

    // if (isValid) {
    //   // const url = "https://localhost:7056/api/EventIncomes";
    //   const data = {
    //     "cex_name": cex_name,
    //     "cex_date": cex_date,
    //     "cex_amount": cex_amount
    //   }

    axios.post(url, data)
      .then((result) => {
        getData();
        clear();
        handleClose();
        toast.success("income successfully recorded");

      });
  }

  const clear = () => {
    //setcex_id();
    setcex_name("");
    setcex_date("");
    setcex_amount();
    setcex_type("");
    setEditcex_id();
    setEditcex_name("");
    setEditcex_date("");
    setEditcex_amount();
    setEditcex_type("");
  }

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
  
    const tableData = data.map((item) => {
      const { cex_name, cex_type, cex_date, cex_amount } = item;
      return { cex_name, cex_type, cex_date, cex_amount };
    });
  
    const columns = [
      { header: "cash Exchange Name", dataKey: "cex_name" },
      { header: "cash Exchange Type", dataKey: "cex_type" },
      { header: "cash Exchange Date", dataKey: "cex_date" },
      { header: "cash Exchange Amount", dataKey: "cex_amount" },
    ];
  
    doc.autoTable({
      columns,
      body: tableData,
      didDrawPage: (data) => {
        doc.setFontSize(16);
        doc.text(props.name, 30, 8, { align: 'center' });
      },
    });
  
    doc.save(props.name+" Cashflow.pdf");
  };

    






  return (
    <div>
      <Fragment>
        <Container>
          <ToastContainer />

          <Form>


            {/* <label>
            cex_name:
            <input type="text" value={cex_name} onChange={(e) => setcex_name(e.target.value)} />

          </label> */}
            <Row>
              <Col>
                <label>Cash exchange type</label>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Cash exchange name</Form.Label> */}
                  <Form.Control type="text" value={cex_name} onChange={(e) => setcex_name(e.target.value)} />
                </Form.Group>
              </Col>




              {/* <label>
            cex_date:
            <input type="date" value={cex_date} onChange={(e) => setcex_date(e.target.value)} />
          </label> */}


              <Col>
                <label>Cash exchange type</label>
                <Form.Select value={cex_type} onChange={(e) => setcex_type(e.target.value)}>

                  <option value="cashInFlow">Cash-Inflow</option>
                  <option value="cashOutFlow">Cash-OutFlow</option>
                </Form.Select>

                {/* <Form.Group>
                  <Form.Label>Cash exchange type</Form.Label>
                  <Form.Select placeholder="Select type">
                    <option>Select exchange type</option>
                    <option value={"cash-inflow"}>Cash-Inflow</option>
                    <option value={"cash-outflow"}>Cash-OutFlow</option>
                  </Form.Select>
                </Form.Group> */}
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Cash exchange date</Form.Label>
                  <Form.Control type="date" value={cex_date} onChange={(e) => setcex_date(e.target.value)} max={currentDate} />
                </Form.Group>
              </Col>



              {/* <label>
            cex_amount:
            <input type="text" value={cex_amount} onChange={(e) => setcex_amount(e.target.value)} />
          </label> */}

              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Cash exchange amount</Form.Label>
                  <Form.Control type="text" value={cex_amount} onChange={(e) => setcex_amount(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>


            <button className='btn btn-primary' onClick={() => handleSave()}>Submit</button> &nbsp;

            <button className='btn btn-primary' onClick={exportPDF}>Download Table</button> &nbsp;

            <input
                    type="text"
                    placeholder="Search Cex exchange name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />

          </Form>

          <br></br>

          <div style={{ height: '300px', overflowY: 'scroll' }}>
            <Table striped bordered hover className="table-responsive" id="table2">
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  <th>Cash exchange id</th>
                  <th>Cash exchange name</th>
                  <th>cash exchange type</th>
                  <th>cash exchange date</th>
                  <th>Cash exchange amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.filter((item) => item.cex_name.toLowerCase().includes(searchQuery.toLowerCase())).slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  ).map((item, index) => {
                    return (
                      // <tr key={index}>
                      //    <td>{index + 1}</td>
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.cex_name}</td>
                        <th>{item.cex_type}</th>
                        <td>{item.cex_date}</td>
                        <td>{item.cex_amount}</td>
                        <td colSpan={2}>
                          {/* <button className="btn btn-primary" onClick={() => handleEdit(item.cex_id)}>Edit</button> &nbsp;
                        <button className="btn btn-danger" onClick={() => handleDelete(item.cex_id)}>Delete</button> */}

                          <EditIcon onClick={() => handleEdit(item.id)} /> &nbsp;
                          <DeleteIcon onClick={() => handleDelete(item.id)} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4">No data in the table</td>
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
                    cex_name:
                    <input type="text" className='form-control' value={Editcex_name} onChange={(e) => setEditcex_name(e.target.value)} />
                  </label>
                </Row>

                <Row>
                  <label>
                    Type:
                    <select className="form-control"
                      value={Editcex_type}
                      onChange={(e) => setEditcex_type(e.target.value)}
                    >
                      <option value="cashInFlow">Cash-Inflow</option>
                      <option value="cashOutFlow">Cash-OutFlow</option>
                    </select>
                  </label>
                </Row>

                <Row>
                  <label>
                    cex_date:
                    <input type="date" className='form-control' value={Editcex_date} onChange={(e) => setEditcex_date(e.target.value)} max={currentDate}/>
                  </label>
                </Row>

                <Row>
                  <label>
                    cex_amount:
                    <input type="text" className='form-control' value={Editcex_amount} onChange={(e) => setEditcex_amount(e.target.value)} />
                  </label>
                </Row>

              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Fragment>
    </div>
  );
};


export default CrudBudgetReport;
