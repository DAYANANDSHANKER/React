import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import AddEmployeeModal from './components/AddEmployeeModal'
import EditEmployeeModal from './components/EditEmployeeModal'


const App = () => {

    // State to store the data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employees')) || []);
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    // Add a new item to the data



    // Edit existing employee

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState({});

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowEditModal(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        let storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        storedEmployees = storedEmployees.map(emp => emp.email === selectedEmployee.email ? { ...selectedEmployee } : emp);
        localStorage.setItem('employees', JSON.stringify(storedEmployees));
        setEmployees(storedEmployees);
        setSelectedEmployee({});
        handleCloseEditModal();
        alert("Employee updated successfully");
    };

    const handleEditInputChange = (e) => {
        setSelectedEmployee({ ...selectedEmployee, [e.target.id]: e.target.value });
    };

    const handleCloseEditModal = () => setShowEditModal(false);


    // end of edit function 



    //Delete function
    const handleDelete = (employee) => {
        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees = employees.filter(emp => emp.email !== employee.email);
        localStorage.setItem('employees', JSON.stringify(employees));
        setEmployees(employees);
    }
    //end of delete function

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#!">Employee Management CRUD</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto"></ul>
                        <button type="button" className="btn bg-white" onClick={handleShow}>Add Employee</button>
                    </div>
                </div>
            </nav>

            <div className="card">
                <div className="card-body">
                    <table className="table table-success table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.phone}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faEdit} className="mx-2" onClick={() => handleEdit(employee)} />
                                        <FontAwesomeIcon icon={faTrash} className="mx-2" onClick={() => handleDelete(employee)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Add modal */}
            <AddEmployeeModal show={show} setShow={setShow} setEmp={setEmployees} />
            {/* edit modal */}
            <EditEmployeeModal
                showEditModal={showEditModal}
                handleCloseEditModal={handleCloseEditModal}
                handleEditSubmit={handleEditSubmit}
                selectedEmployee={selectedEmployee}
                handleEditInputChange={handleEditInputChange}
            />



        </>
    )
}

export default App
