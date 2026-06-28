
//Declaramos que Layout recibe una prop llamada children del tipo React.ReactNode, 
// que es un tipo que representa cualquier cosa que pueda ser renderizada en React, 
// como elementos JSX, cadenas de texto, números, etc. 
// Luego, dentro del componente, simplemente renderizamos los children dentro de un div.

import Navbar from "./Navbar";

const Layout = ({children}: {children: React.ReactNode})=> {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
};

export default Layout