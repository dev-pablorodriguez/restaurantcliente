import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Alerta from '../utilities/Alerta'

const NuevoPlatillo = () => {

  //Validar y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                  .min(3, 'Los platillos deben tener al menos 3 caracteres.')
                  .required('El nombre del platillo es obligatorio.'),
      precio: Yup.number()
                  .min(1, 'Debes agregar un valor.')
                  .required('El precio del platillo es obligatorio.'),
      categoria: Yup.string()
                  .required('La categoría es obligatoria.'),
      descripcion: Yup.string()
                  .min(10, 'La descripción debe ser más larga.')
                  .required('La descripción es obligatoria.')
            
    }),
    onSubmit: datos => { console.log(datos) }
  });

  return (
    <>
      <h1 className='text-3xl font-light' >Nuevo Platillo</h1>

      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-3xl'>
          <form onSubmit={ formik.handleSubmit }>

            <div className='mb-5'>
              <label className={ styleClasses.label } htmlFor='nombre'>Nombre</label>
              <input
                id='nombre'
                className={ styleClasses.input }
                type='text'
                placeholder='Nombre Platillo'
                value={ formik.values.nombre }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              { formik.touched.nombre && formik.errors.nombre && <Alerta message={ formik.errors.nombre }/> }
            </div>

            <div className='mb-5'>
              <label className={ styleClasses.label } htmlFor='precio'>Precio</label>
              <input
                id='precio'
                className={ styleClasses.input }
                type='number'
                placeholder='$20'
                min='0'
                value={ formik.values.precio }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              { formik.touched.precio && formik.errors.precio && <Alerta message={ formik.errors.precio }/> }
            </div>

            <div className='mb-5'>
              <label className={ styleClasses.label } htmlFor='categoria'>Categoría</label>
              <select
                id='categoria'
                className={ styleClasses.input }
                name='categoria'
                value={ formik.values.categoria }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              >
                <option value=''>-- Seleccione --</option>
                <option value='desayuno'>Desayuno</option>
                <option value='almuerzo'>Almuerzo</option>
                <option value='cena'>Cena</option>
                <option value='ensalada'>Ensalada</option>
                <option value='bebida'>Bebida</option>
                <option value='postre'>Postre</option>
              </select>
              { formik.touched.categoria && formik.errors.categoria && <Alerta message={ formik.errors.categoria }/> }
            </div>

            <div className='mb-5'>
              <label className={ styleClasses.label } htmlFor='imagen'>Imagen</label>
              <input
                id='imagen'
                className={ styleClasses.input }
                type='file'
                value={ formik.values.imagen }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
            </div>

            <div className='mb-5'>
              <label className={ styleClasses.label } htmlFor='descripcion'>Descripción</label>
              <textarea
                id='descripcion'
                className={ styleClasses.input + ' h-40' }
                placeholder='Descripción del Platillo'
                value={ formik.values.descripcion }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              ></textarea>
              { formik.touched.descripcion && formik.errors.descripcion && <Alerta message={ formik.errors.descripcion }/> }
            </div>

            <input
              type='submit'
              className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold'
              value='Agregar Platillo'
            />
          </form>
        </div>
      </div>
    </>
  )
}

const styleClasses = {
  input: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
  label: 'block text-gray-700 text-sm font-bold mb-2'
}

export default NuevoPlatillo