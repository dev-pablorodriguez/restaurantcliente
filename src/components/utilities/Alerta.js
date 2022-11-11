const Alerta = ({ title = 'Error', message = 'Se ha producido un error desconocido.' }) => {
    return (
        <div className={ `border-l-4 bg-red-100 border-red-500 text-red-800 p-2 mx-5 my-2` } role='alert'>
            <p className='text-sm'>
                <span className='font-bold'>
                 { `${ title }: ` }
                </span>
                { message }
            </p>
        </div>
    )
}

export default Alerta