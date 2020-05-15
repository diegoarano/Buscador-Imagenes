import React, {useState , useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda , guardarBusqueda] = useState('');
  const [imagenes, guardarImagen] = useState([]);
  const [paginaactual , guardarPaginaActual] =useState(1);
  const [totalpaginas , guardarTotalPaginas]= useState(5);

  useEffect(() =>{

    const consultarApi = async () => {

    if(busqueda === '') return;

    const imagenesPorPagina = 30;
    const key= '16543614-2b41453cd80fb5a7a6ac59e53';
    const url= `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarImagen(resultado.hits)

    //calcular el total de paginas a mostrar

   const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
   guardarTotalPaginas(calcularTotalPaginas)

   //volver arriba 

   const jumbotron = document.querySelector('.jumbotron');
   jumbotron.scrollIntoView({behavior: 'smooth'})
  }
    consultarApi();
  }, [busqueda, paginaactual]);

  //definir la pagina anterior

  const paginaAnterior = ()=>{
    const nuevaPaginaActual = paginaactual -1;

    if(nuevaPaginaActual === 0 )return;

    guardarPaginaActual(nuevaPaginaActual)

    
  }

  //definir la paguina siguiente

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual)

  }

  return (
   <div className="container">
     <div className="jumbotron">
       <p className="lead text-center">Buscador Imágenes</p>

       <Formulario 
       guardarBusqueda={guardarBusqueda}
       />
     </div>

    <div className="row justify-content-center">
      <ListadoImagenes
      imagenes={imagenes}
      />


      {(paginaactual === 1 ) ? null :(
      
      <button 
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
      >Anterior &laquo;</button>
      )}
     
      {(paginaactual === totalpaginas  ) ? null : (
        <button 
          type="button"
          className="btn btn-info"
          onClick={paginaSiguiente}
        >Siguente &raquo;</button>

       ) }
    

    </div>

   </div>
  );
}

export default App;
