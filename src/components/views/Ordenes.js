import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../../firebase'

import Orden from '../ui/Orden';

const Ordenes = () => {
  //Context con las operaciones de Firebase
  const { firebase } = useContext(FirebaseContext);

  //State
  const [ ordenes, setOrdenes ] = useState([])

  useEffect( () => {
    const getOrdenes = () => {
      firebase.db.collection('ordenes').where('completado', '==', false).onSnapshot( snapshot => {
        const ordenes = snapshot.docs.map( doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setOrdenes(ordenes)
      })
    }

    getOrdenes()
  }, [])

  return (
    <>
        <h1 className='text-3xl font-light mb-4' >Órdenes</h1>

        <div className='sm:flex sm:flex-wrap -mx-3'>
          { ordenes.map( orden => <Orden key={ orden.id } orden={ orden } /> ) }
        </div>
    </>
  )
}

export default Ordenes