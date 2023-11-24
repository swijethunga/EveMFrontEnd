import React, { useState, useEffect, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import style from './CrudVendorReportStyles.module.css';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const CrudVendorReport = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        window.location.reload();
    }
    const handleShow = () => setShow(true);

    const [vendor_name, setVendor_name] = useState("");
    const [contact_person, setContact_person] = useState("");
    const [contact_no, setContact_no] = useState("");
    const [contact_email, setContact_email] = useState("");
    const [service_offered, setService_offered] = useState("");
    const [add_info, setAdd_info] = useState("");
    const [errors, setErrors] = useState({});
    const [Editvendor_id, setEditvendor_id] = useState("");
    const [Editvendor_name, setEditvendor_name] = useState("");
    const [Editcontact_person, setEditcontact_person] = useState("");
    const [Editcontact_no, setEditcontact_no] = useState("");
    const [Editcontact_email, setEditcontact_email] = useState("");
    const [Editservice_offered, setEditservice_offered] = useState("");
    const [Editadd_info, setEditadd_info] = useState("");
    const [data, setData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const { eventName,eventid } = useParams();

    const getdata = () => {
        axios.get(`https://localhost:7133/api/Vendor/event/${eventid}`)
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getdata();
    }, []);

    const resetForm = () => {
        setVendor_name("");
        setContact_person("");
        setContact_no("");
        setContact_email("");
        setService_offered("");
        setAdd_info("");
        setErrors({});
    };

    const handleVendorEdit = (vendor_id) => {
        handleShow();

        axios.get(`https://localhost:7133/api/Vendor/${vendor_id}`)
            .then((result) => {
                setEditvendor_id(vendor_id);
                setEditvendor_name(result.data.vendor_name);
                setEditcontact_person(result.data.contact_person);
                setEditcontact_no(result.data.contact_no);
                setEditcontact_email(result.data.contact_email);
                setEditservice_offered(result.data.service_offered);
                setEditadd_info(result.data.add_info);
            });
    };

    const handleVendorDelete = (vendor_id) => {
        if (window.confirm("Are you sure to delete this record") === true) {
            axios.delete(`https://localhost:7133/api/Vendor/${vendor_id}`)
                .then((result) => {
                    if (result.status === 200) {
                        getdata();
                    }
                });
        }
    };


    const validateVendorName = (name) => {
        const regex = /^[a-zA-Z ]+$/;
        return regex.test(name);
      }
      
      const validateContactPersonName = (contactName) => {
        const regex = /^[a-zA-Z ]+$/;
        return regex.test(contactName);
      }
      
      const validateContactNumber = (contactNumber) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(contactNumber);
      }
      
      const validateContactEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
      
      const validateServiceOffered = (serviceOffer) => {
        const regex = /^[a-zA-Z ]+$/;
        return regex.test(serviceOffer);
      }
      
    //   const validateAddInfo = (addInfo) => {
    //     const regex = /^[a-zA-Z ]+$/;
    //     return regex.test(addInfo);
    //   }
  // Existing code...


  
  
  const handleVendorSave = () => {
    const newErrors = {};
  
    if (!validateVendorName(vendor_name)) {
      newErrors.vendor_name = 'Please enter a valid vendor name.';
    }
  
    if (!validateContactPersonName(contact_person)) {
      newErrors.contact_person = 'Please enter a valid contact person.';
    }
  
    if (!validateContactNumber(contact_no)) {
      newErrors.contact_no = 'Please enter a valid contact number.';
    }
  
    if (!validateContactEmail(contact_email)) {
      newErrors.contact_email = 'Please enter a valid email address.';
    }
  
    if (!validateServiceOffered(service_offered)) {
      newErrors.service_offered = 'Please enter a valid service offered.';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      axios
        .post("https://localhost:7133/api/Vendor", {
          "eventId": eventid,
          vendor_name: vendor_name,
          contact_person: contact_person,
          contact_no: contact_no,
          contact_email: contact_email,
          service_offered: service_offered,
          add_info: add_info
        })
        .then((result) => {
          if (result.status === 200) {
            resetForm();
            handleClose();
            getdata();
          }
        });
    }
  }

  const handleVendorUpdate = () => {
    const newErrors = {};
  
    if (!Editvendor_name) {
      newErrors.vendor_name = 'Please enter the vendor name.';
    } else if (!validateVendorName(Editvendor_name)) {
      newErrors.vendor_name = 'Please enter a valid vendor name.';
    }
  
    if (!Editcontact_person) {
      newErrors.contact_person = 'Please enter the contact person.';
    } else if (!validateContactPersonName(Editcontact_person)) {
      newErrors.contact_person = 'Please enter a valid contact person name.';
    }
  
    if (!Editcontact_no) {
      newErrors.contact_no = 'Please enter a valid contact number.';
    } else if (!validateContactNumber(Editcontact_no)) {
      newErrors.contact_no = 'Please enter a valid contact number.';
    }
  
    if (!Editcontact_email) {
      newErrors.contact_email = 'Please enter a valid email address.';
    } else if (!validateContactEmail(Editcontact_email)) {
      newErrors.contact_email = 'Please enter a valid email address.';
    }
  
    if (!Editservice_offered) {
      newErrors.service_offered = 'Please enter the service offered.';
    } else if (!validateServiceOffered(Editservice_offered)) {
      newErrors.service_offered = 'Please enter a valid service offered.';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      axios
        .put(`https://localhost:7133/api/Vendor/${Editvendor_id}`, {
          vendor_name: Editvendor_name,
          contact_person: Editcontact_person,
          contact_no: Editcontact_no,
          contact_email: Editcontact_email,
          service_offered: Editservice_offered,
          add_info: Editadd_info,
        })
        .then((result) => {
          if (result.status === 200) {
            resetForm();
            handleClose();
            getdata();
          }
        })
        .catch((error) => {
          console.error('Error updating vendor:', error);
          // Handle the error, e.g., display an error message to the user
        })
        .finally(() => {
          window.location.reload();
        });
    }
  };
  
    const itemsPerPage = 10;

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
        const { vendor_name, contact_person, contact_no, contact_email,service_offered  } = item;
        return { vendor_name, contact_person, contact_no,contact_email, service_offered };
      });
    
      const columns = [
        { header: "vendor name", dataKey: "vendor_name" },
        { header: "contact person", dataKey: "contact_person" },
        { header: "contact no", dataKey: "contact_no" },
        { header: "contact email", dataKey: "contact_email" },
        {header: "service offered", dataKey: "service_offered"}
      ];
    
      doc.autoTable({
        columns,
        body: tableData,
        didDrawPage: (data) => {
          doc.setFontSize(16);
          doc.text(props.name, 30, 8, { align: 'center' });
        },
      });
    
      doc.save(props.name+"vendor.pdf");
    };

    

    return (
        <Fragment>


                <Button onClick={handleShow}>
                    Add Vendor
                </Button> &nbsp;

                <Button onClick={exportPDF}>Download Table</Button> &nbsp;

                <input
                    type="text"
                    placeholder="Search by vendor name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />

            <Container fluid>

                

                   


                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Vendor ID</th>
                            <th>Vendor Name</th>
                            <th>Contact Person</th>
                            <th>Contact Number</th>
                            <th>Contact Email</th>
                            <th>Service Offered</th>
                            <th>Additional Info</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((item) => item.vendor_name.toLowerCase().includes(searchQuery.toLowerCase())).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.vendor_name}</td>
                                <td>{item.contact_person}</td>
                                <td>{item.contact_no}</td>
                                <td>{item.contact_email}</td>
                                <td>{item.service_offered}</td>
                                <td>{item.add_info}</td>
                                <td>
                                    {/* <Button className={style.editBtn} onClick={() => handleVendorEdit(item.vendor_id)}>
                    <EditIcon />
                  </Button>
                  <Button className={style.deleteBtn} onClick={() => handleVendorDelete(item.vendor_id)}>
                    <DeleteIcon />
                  </Button> */}

                                    <EditIcon onClick={() => handleVendorEdit(item.id)} /> &nbsp;
                                    <DeleteIcon onClick={() => handleVendorDelete(item.id)} /> &nbsp;

                                     
                                </td>
                            </tr>
                        ))}
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


            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add/Edit Vendor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Vendor Name:</label>
                            <input
                                type="text"
                                id='vendorName'
                                className={errors.vendor_name ? style.error : ""}
                                value={vendor_name || Editvendor_name}
                                onChange={(e) => {
                                    setVendor_name(e.target.value);
                                    setEditvendor_name(e.target.value);
                                }}
                            />
                            {errors.vendor_name && <span className={style.errorMessage}>{errors.vendor_name}</span>}
                        </Col>
                        <Col>
                            <label>Contact Person:</label>
                            <input
                                type="text"
                                id='contactPersonName'
                                className={errors.contact_person ? style.error : ""}
                                value={contact_person || Editcontact_person}
                                onChange={(e) => {
                                    setContact_person(e.target.value);
                                    setEditcontact_person(e.target.value);
                                }}
                            />
                            {errors.contact_person && <span className={style.errorMessage}>{errors.contact_person}</span>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Contact Number:</label>
                            <input
                                type="text"
                                id='contactNumber'
                                className={errors.contact_no ? style.error : ""}
                                value={contact_no || Editcontact_no}
                                onChange={(e) => {
                                    setContact_no(e.target.value);
                                    setEditcontact_no(e.target.value);
                                }}
                            />
                            {errors.contact_no && <span className={style.errorMessage}>{errors.contact_no}</span>}
                        </Col>
                        <Col>
                            <label>Contact Email:</label>
                            <input
                                type="email"
                                id='contactEmail'
                                className={errors.contact_email ? style.error : ""}
                                value={contact_email || Editcontact_email}
                                onChange={(e) => {
                                    setContact_email(e.target.value);
                                    setEditcontact_email(e.target.value);
                                }}
                            />
                            {errors.contact_email && <span className={style.errorMessage}>{errors.contact_email}</span>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Service Offered:</label>
                            <input
                                type="text"
                                id='serviceOffered'
                                className={errors.service_offered ? style.error : ""}
                                value={service_offered || Editservice_offered}
                                onChange={(e) => {
                                    setService_offered(e.target.value);
                                    setEditservice_offered(e.target.value);
                                }}
                            />
                            {errors.service_offered && <span className={style.errorMessage}>{errors.service_offered}</span>}
                        </Col>
                        <Col>
                            <label>Additional Info:</label>
                            <input
                                type="text"
                                id='additionalInfo'
                                value={add_info || Editadd_info}
                                onChange={(e) => {
                                    setAdd_info(e.target.value);
                                    setEditadd_info(e.target.value);
                                }}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    {Editvendor_id ? (
                        <Button variant="primary" onClick={handleVendorUpdate}>
                            Update Vendor
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleVendorSave}>
                            Add Vendor
                        </Button>
                    )}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default CrudVendorReport;
