import React from 'react';
import { Modal } from 'react-bootstrap';

const EditEmployeeModal = (props) => {

  const { showEditModal, handleCloseEditModal, handleEditSubmit, selectedEmployee, handleEditInputChange } = props;


  
  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleEditSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" value={selectedEmployee.name} onChange={handleEditInputChange} required />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" value={selectedEmployee.email} onChange={handleEditInputChange} required />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" value={selectedEmployee.address} onChange={handleEditInputChange} required />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="phone">Phone</label>
            <input type="text" className="form-control" id="phone" value={selectedEmployee.phone} onChange={handleEditInputChange} required />
          </div>
          <button type="submit" className="btn btn-primary mt-4">Update Employee</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditEmployeeModal;