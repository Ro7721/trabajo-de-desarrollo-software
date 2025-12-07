import { useState } from "react";
import { updateUser } from "../../api/UserService";
import Modal from 'react-bootstrap/Modal';
export default function EditUserModal({ user, reload, onHide }) {

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveChanges = async () => {
        await updateUser(user.id, formData);
        reload(); // actualiza tabla
        onHide();  // cierra modal
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Nombre:</label>
                <input
                    className="form-control mb-2"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label>Email:</label>
                <input
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>Cancelar</button>
                <button className="btn btn-success" onClick={saveChanges}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
}
