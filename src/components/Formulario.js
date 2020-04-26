import React, { useState } from 'react';
import Error from './Error.js';


const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState('')
    const [error, setError] = useState(false)


    const handleInput = (event) => {
        setTermino(event.target.value);
    }

    const buscarImagen = (event) =>{
        event.preventDefault();
        // Validar 
        if(termino.trim() === ''){
            setError(true)
            return
        }
        setError(false)

        //  enviar el termino de busqueda hacia el componente principal
        setBusqueda(termino)
    }

    return (
        <form onSubmit={buscarImagen} >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className='form-control form-control-lg'
                        placeholder='Busca una imagen, Ej: Futbol o cafe'
                        onChange={handleInput}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input 
                        type='submit'
                        className='btn btn-lg btn-danger btn-block'
                        value='Buscar'
                    />
                </div>
            </div>
            {error ? <Error mensaje='Agregra un termino de busqueda.' /> : null}
        </form>
    );
};

export default Formulario;