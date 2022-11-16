import React, { useState, useContext } from 'react'

import { FirebaseContext } from '../../firebase'

const Orden = ({ orden }) => {
    const [ tiempoEntrega, setTiempoEntrega ] = useState(0);

    const { firebase } = useContext(FirebaseContext)

    //Actualizar tiempo de entrega en Firebase
    const definirTiempo = () => {
        try {
            firebase.db.collection('ordenes')
                .doc(orden.id)
                .update({ tiempoEntrega })
        } catch (error) {
            console.log(error)
        }
    }

    //Marcar como completado en Firebase
    const completarOrden = () => {
        try {
            firebase.db.collection('ordenes')
                .doc(orden.id)
                .update({ completado: true })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4'>
            <div className='p-3 shadow-md bg-white'>
                <h1 className='text-yellow-600 text-lg font-bold'>{ orden.id }</h1>

                { orden.orden.map( platillo =>
                    <p key={ platillo.id } className='text-gray-500'>{ platillo.cantidad } { platillo.nombre }</p>
                    )
                }

                <p className='text-gray-700 font-bold'>Total Pagado: ${ orden.total }</p>

                { orden.tiempoEntrega === 0 && (
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Tiempo de Entrega
                        </label>

                        <input
                            type='number'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            min='1'
                            max='30'
                            placeholder='20'
                            value={ tiempoEntrega }
                            onChange={ event => event.target.value ? setTiempoEntrega(parseInt(event.target.value)) : 1 }
                        />

                        <button
                            type='submit'
                            onClick={ definirTiempo }
                            className='bg-gray-900 hover:bg-gray-800 w-full mt-5 p-1 text-white uppercase font-bold'
                        >
                            Definir Tiempo
                        </button>
                    </div>
                )}

                { orden.tiempoEntrega > 0 && (
                    <p className='text-gray-700'>Tiempo de entrega:
                        <span className='font-bold'> { orden.tiempoEntrega } minutos</span>
                    </p>
                )}

                { !orden.completado && orden.tiempoEntrega > 0 && (
                    <button
                        type='submit'
                        onClick={ completarOrden }
                        className='bg-blue-900 hover:bg-blue-800 w-full mt-5 p-1 text-white uppercase font-bold'
                    >
                        Marcar como lista
                    </button>
                )}
            </div>
        </div>
    )
}

export default Orden