  import { useState } from "react";
  function App(){
    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState([]);

    const agregarTarea = () => {
      if(tarea.trim() ===""){
        return;
      }
      setTareas([...tareas, tarea]);
      setTarea("");
    }
    return(
      <div style={{textAlign: "center", marginTop: "50px"}}>
        <input
        type="text"
        placeholder="Escribe una tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        style={{padding: "8px", fontSize: "16px", width: "250px"}}
        />
        <button
        onClick={agregarTarea}
        style={{marginLeft: "10px", padding: "8px 10px"}}
        >Agregar</button>

        <ul style={{listStyleType: "none", marginTop: "20px"}}>
          {tareas.map((t, index) => (
            <li key={index} style={{marginTop: "10px"}}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  export default App;