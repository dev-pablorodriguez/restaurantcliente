import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'

import Alerta from '../utilities/Alerta'

const NuevoPlatillo = () => {
  //State para las imágenes
  const [ isImgUploading, setIsImgUploading ] = useState(false);
  const [ imgProgress, setImgProgress ] = useState(0);
  const [ imgUrl, setImgUrl ] = useState('')

  //Context con las operaciones de Firebase
  const { firebase } = useContext(FirebaseContext);

  //Hook para redireccionar
  const navigate = useNavigate();

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
    onSubmit: platillo => {
      try {
        platillo.existencia = true;
        platillo.imagen = imgUrl;

        firebase.db.collection('productos').add(platillo);

        navigate('/menu')
      } catch (error) {
        console.log(error)
      }
    }
  });

  //Gestión de imágenes
  const handleUploadStart = () => {
    setImgProgress(0);
    setImgUrl('');
    setIsImgUploading(true);
  }

  const handleUploadError = err => {
    setIsImgUploading(false);
    console.log(err)
  }

  const handleUploadSuccess = async filename => {
    try {

      const url = await firebase.storage.ref('productos').child(filename).getDownloadURL();
      setImgUrl(url);

      setImgProgress(100);
      setIsImgUploading(false);
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleProgress = progress => {
    setImgProgress(progress);
  }


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
              <FileUploader
                id='imagen'
                accept='image/*'
                randomizeFilename
                storageRef={ firebase.storage.ref('productos') }
                className={ styleClasses.input }
                onUploadStart={ handleUploadStart }
                onUploadError={ handleUploadError }
                onUploadSuccess={ handleUploadSuccess }
                onProgress={ handleProgress }
              />

              { isImgUploading &&
                <div className='h-8 relative w-full border mt-5'>
                  <div style={{ width: `${ imgProgress }%` }} className='bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-8 flex items-center'>
                  </div>
                </div>
              }

              { imgUrl &&
                <p className='bg-green-500 text-white p-1 text-center my-5'>
                  La imagen se subió correctamente.
                </p>
              }

              {/* <input
                id='imagen'
                className={ styleClasses.input }
                type='file'
                value={ formik.values.imagen }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              /> */}
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

            { !isImgUploading &&
              <input
                type='submit'
                className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold'
                value='Agregar Platillo'
              />
            }
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