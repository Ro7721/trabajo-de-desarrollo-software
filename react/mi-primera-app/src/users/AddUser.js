import { useState } from 'react';
import { addUser } from '../api/UserService';
import { useNavigate } from 'react-router-dom';
export default function AddUser() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        userName: "",
        name: "",
        email: "",
    });

    // AHORA SÍ se usa 'username' y 'name' en los inputs correspondientes.
    const { name, userName, email } = user;

    const inputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // Ya no es una variable sin usar porque la asignaremos al formulario.
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !userName || !email) {
            alert("Please fill all fields");
            return;
        }
        onSubmit();
    }
    const Cancel = () => {
        navigate("/");
    }
    const onSubmit = async () => {
        console.log("Datos enviados:", user);
        await addUser(user);
        navigate("/");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center">Register User</h2>

                    {/* AÑADIDO: Formulario con el evento onSubmit */}
                    <form onSubmit={handleSubmit}>

                        {/* INPUT PARA USERNAME (Corregido: Ahora usa 'username') */}
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">
                                User Name
                            </label>
                            <input type={"text"}
                                className="form-control"
                                placeholder="Enter User Name"
                                name="userName" // AHORA ES 'username'
                                value={userName} // AHORA USA 'username'
                                onChange={e => inputChange(e)}
                            />
                        </div>

                        {/* INPUT PARA NAME (Corregido: Usa 'name') */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input type={"text"}
                                className="form-control"
                                placeholder="Enter Name"
                                name="name" // Esto ya estaba correcto para 'name'
                                value={name}
                                onChange={e => inputChange(e)} />
                        </div>

                        {/* INPUT PARA EMAIL */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                User Email
                            </label>
                            <input type={"email"}
                                className="form-control"
                                placeholder="Enter User Email"
                                name="email"
                                value={email}
                                onChange={e => inputChange(e)} />
                        </div>

                        {/* El botón 'Add User' se beneficiará del 'type="submit"' por el formulario */}
                        <button type="submit" className="btn btn-outline-primary float-start">Register User</button>

                        {/* CAMBIADO: type="button" para que no envíe el formulario */}
                        <button type="button" className="btn btn-outline-danger float-end" onClick={Cancel}>Cancel</button>

                        {/* CERRADO: Etiqueta del formulario */}
                    </form>
                </div>
            </div>
        </div>
    );
}