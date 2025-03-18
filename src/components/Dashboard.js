import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // Controls visibility of student details

  const [newStudent, setNewStudent] = useState({ id: "", name: "", image: "", age: "" });

  // Load students from local storage on component mount
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
      setStudents(storedStudents);
    }
  }, []);

  // Update local storage whenever students state changes
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Open Modal for Add or Edit
  const handleShow = (student = null) => {
    if (student) {
      setEditMode(true);
      setEditingStudent(student);
      setNewStudent(student);
    } else {
      setEditMode(false);
      setEditingStudent(null);
      setNewStudent({ id: "", name: "", image: "", age: "" });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNewStudent({ ...newStudent, image: URL.createObjectURL(file) });
    } else {
      alert("Please select a valid image file.");
    }
  };

  // Add a New Student
  const handleAddStudent = () => {
    if (newStudent.id && newStudent.name && newStudent.age && newStudent.image) {
      setStudents([...students, { ...newStudent, status: "Active" }]);
      handleClose();
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Edit Student
  const handleEditStudent = () => {
    setStudents(
      students.map((student) =>
        student.id === editingStudent.id ? { ...newStudent } : student
      )
    );
    handleClose();
  };

  // Delete Student
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Toggle Student Status
  const toggleStatus = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status: student.status === "Active" ? "Inactive" : "Active" }
          : student
      )
    );
  };

  return (
    <div
      className="d-flex flex-column align-items-center p-4"
      style={{ background: "linear-gradient(to right, teal, purple)", height: "100vh" }}
    >
      <br /> <br />
      <div className="p-4 rounded" style={{ width: "100%", textAlign: "center" }}>
        <h2 className="text-white">Welcome to Admin Dashboard</h2>
        <br />
        <br />
        <div className="my-3">
          <Button variant="primary" onClick={() => handleShow()} className="me-2">
            <FaPlus /> Add Student
          </Button>
          <Button variant="info" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <FaEyeSlash /> : <FaEye />} {showDetails ? "Hide Details" : "View Details"}
          </Button>
        </div>

        {/* Show table only if showDetails is true */}
        {showDetails && (
          <Table bordered hover className="bg-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Age</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    <img
                      src={student.image}
                      alt="profile"
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                    />
                  </td>
                  <td>{student.age}</td>
                  <td>
                    <Button
                      variant={student.status === "Active" ? "success" : "danger"}
                      onClick={() => toggleStatus(student.id)}
                    >
                      {student.status === "Active" ? <FaToggleOn /> : <FaToggleOff />}{" "}
                      {student.status}
                    </Button>
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => handleShow(student)}>
                      <FaEdit /> Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(student.id)}>
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modal for Adding & Editing Students */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Student" : "Add Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                name="id"
                value={newStudent.id}
                onChange={handleChange}
                disabled={editMode}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={newStudent.age}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editMode ? handleEditStudent : handleAddStudent}>
            {editMode ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
