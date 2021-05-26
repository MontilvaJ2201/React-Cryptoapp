import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import useMoneda from '../Hooks/useMoneda';
import useCriptomoneda from '../Hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
    const [ listaCripto, guardarCripto ] = useState([]);

    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'American Dolar' },
        { codigo: 'MXN', nombre: 'Mexican Peso' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'pound sterling' },
    ]

    const[ moneda, SelectMonedas ] = useMoneda('Choose your currency', '',MONEDAS);

    const[ criptomoneda, SelectCripto ] = useCriptomoneda('Choose a cypto', '', listaCripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);

            guardarCripto(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();

        if (moneda === '' || criptomoneda === '') {

            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='All fields are required' /> :null}
            <SelectMonedas />

            <SelectCripto />

            <Boton 
                type= "submit"
                value= "Track"
            />
        </form>
     );
}
 
export default Formulario;