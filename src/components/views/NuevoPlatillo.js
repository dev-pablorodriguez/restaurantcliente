import React from 'react'

const NuevoPlatillo = () => {
  return (
    <>
      <h1 className='text-3xl font-light mb-4' >Nuevo Platillo</h1>

      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-3xl'>
          <form>
            <div className='mb-4'>
              <label className={ styleClasses.label } htmlFor='nombre'>Nombre</label>
              <input
                id='nombre'
                className={ styleClasses.input }
                type='text'
                placeholder='Nombre Platillo'
              />
            </div>
            <div className='mb-4'>
              <label className={ styleClasses.label } htmlFor='precio'>Precio</label>
              <input
                id='precio'
                className={ styleClasses.input }
                type='number'
                placeholder='$20'
                min='0'
              />
            </div>
            <div className='mb-4'>
              <label className={ styleClasses.label } htmlFor='categoria'>Categoría</label>
              <select
                id='categoria'
                className={ styleClasses.input }
                name='categoria'
              >
                <option value=''>-- Seleccione --</option>
                <option value='desayuno'>Desayuno</option>
                <option value='almuerzo'>Almuerzo</option>
                <option value='cena'>Cena</option>
                <option value='ensalada'>Ensalada</option>
                <option value='bebida'>Bebida</option>
                <option value='postre'>Postre</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className={ styleClasses.label } htmlFor='imagen'>Imagen</label>
              <input
                id='precio'
                className={ styleClasses.input }
                type='file'
              />
            </div>
            <div className='mb-4'>
              <label className={ styleClasses.label } htmlFor='descripcion'>Descripción</label>
              <textarea
                id='descripcion'
                className={ styleClasses.input + ' h-40' }
                placeholder='Descripción del Platillo'
              ></textarea>
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