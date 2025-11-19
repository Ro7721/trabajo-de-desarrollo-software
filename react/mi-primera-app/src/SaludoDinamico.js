import { useState } from "react";
function Dinamico(){
    const [nombre, setNombre] = useState("");

    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h1> Saludar en react</h1>
            <input
                type="text"
                placeholder="Escribe tu nombre"
                onChange={(e) => setNombre(e.target.value)}
                style={{padding: "8px", fontSize: "16px"}}
            />
            <h2>
                {nombre ? 'hola ${nombre} ✋': "Escribe tu nombre arriba"}
            </h2>
        </div>
    );
}
export default Dinamico;