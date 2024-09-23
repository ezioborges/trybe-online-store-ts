import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div style={{ height: '100vh' }} className="d-flex flex-column justify-content-center align-items-center" >
            <h1>Página não encontrada</h1>
            <h2>Por favor retorne para a <Link to='/'>página principal</Link> e tente novamente</h2>
        </div>
    );
 };

export default NotFound;
