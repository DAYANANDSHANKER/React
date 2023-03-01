import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const AddEmployeeModal = (props) => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //make All fields required 
        if (!employee.name || !employee.email || !employee.address || !employee.phone) {
            return alert('All fields are required');
        }
        if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(employee.email)) {
            return alert('Invalid email format');
        }

        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        let duplicate = employees.find(emp => emp.email === employee.email);
        if (duplicate) {
            alert('Employee with the same email already exists');
            return;
        }
        duplicate = employees.find(emp => emp.phone === employee.phone);
        if (duplicate) {
            alert('Employee with the same phone already exists ');
            return;
        }
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));
        setEmployee({
            //make the form empty
            name: '',
            email: '',
            address: '',
            phone: ''
        });
        alert("Employee added successfully")
        props.setShow(false);
       props.setEmp(employees);
    };
    const handleInputChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.id]: e.target.value
        });
    };
  return (
    <>
      <Modal
                show={props.show}
                onHide={()=>{props.setShow(false)}}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name='name'
                                className="form-control"
                                id="name"
                                aria-describedby="emailHelp"
                                placeholder="Enter Name"
                                value={employee.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="email"
                                name='email'
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter Email"
                                value={employee.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="text"
                                name='address'
                                className="form-control"
                                id="address"
                                aria-describedby="emailHelp"
                                placeholder="Enter Address"
                                value={employee.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group  mt-3">
                            <input
                                type="phone_number"
                                name='phone'
                                className="form-control"
                                id="phone"
                                placeholder="Enter Phone"
                                value={employee.phone}
                                onChange={handleInputChange}
                                minLength='10'
                                maxLength='10'
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4" >Add Employee</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>

            </Modal>

    </>
  )
}

export default AddEmployeeModal

