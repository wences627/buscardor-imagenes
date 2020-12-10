import React, { useState, useEffect } from 'react';
import Formulario from './Formulario';
import ListadoImagenes from './ListadoImagenes';
import '../css/index.css';


function App() {
  
  const [busqueda, setBusqueda] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [paginaactual, setPaginaActual] = useState(1)
  const [totalpaginas, setTotalPaginas] = useState(1)

  useEffect(()=>{
    
    const consultarApi = async () =>{
      if(busqueda === '')return;
  
      const imagenesPorPagina = 32;
      const key='19466614-47e412e2cad2fb305440ad516';
      const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
      setTotalPaginas(calcularTotalPaginas)
    }

    consultarApi()
  },[busqueda, paginaactual])

  // definiendo paginacion

  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaactual -1

    if(nuevaPaginaActual === 0) return;

    setPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual +1

    if(nuevaPaginaActual > totalpaginas) return;

    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron cabeza">
        <p className="lead text-center">
          Buscador de Imagenes
        </p>
        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />
        {(paginaactual === 1) ? null :
          <button
            type='button'
            className='btn btn-info mr-1'
            onClick={paginaAnterior}
          >
            &laquo; Anterior 
          </button>
        }
        {(paginaactual === totalpaginas)? null :
          <button
            type='button'
            className='btn btn-info'
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        }

      </div>
      {(busqueda === '') ? 
        null : 
        <p className='center'>{`( Pagina: ${paginaactual} )`}</p>
      }

    </div>
  );
}

export default App;
