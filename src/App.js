import React, { useEffect, useState } from 'react';
import imagen from './criptomonedas.png';
import axios from 'axios';
import styled from '@emotion/styled';
import Formulario from './Components/Formulario';
import Cotizacion from './Components/Cotizacion';
import Spinner from './Components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700px;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 50px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ resultado, guardarResultado ] = useState({});
  const [ cargando, guardarCargando ] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if(moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        
      const resultado = await axios.get(url)

      guardarCargando(true);

      setTimeout(() => {

        guardarCargando(false);

        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda] );

      }, 3000);

    }
    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="crypto imagen"
        />
      </div>
      <div>
        <Heading>Track crypto in seconds</Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
