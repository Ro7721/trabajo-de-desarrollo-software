//import './Saludo.css';
function Saludo({nombre}){
    return(
        <div class="container-saludo">
            <h2>Hola buen dia {nombre} !</h2>
            <p>Bienvenido al curso de react</p>
        </div>
    );
}
export default Saludo;