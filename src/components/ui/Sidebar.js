import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const getNavLinkClassName = ({ isActive }) => {
        const classes = 'p-1 block hover:bg-yellow-500 hover:text-gray-900';
        return isActive ? `${ classes } text-yellow-500` : `${ classes } text-gray-200`;
    }

    return (
        <div className='md:w-2/5 xl:w-1/5 bg-gray-800'>
            <div className='p-6'>
                <p className='uppercase text-white text-2xl tracking-wide text-center font-bold'>RestaurantApp</p>
                <p className='mt-3 text-gray-600'>Administra tu restaurant en las siguientes opciones</p>

                <nav className='mt-10'>
                    <NavLink className={ getNavLinkClassName } exact='true' to='/menu'>Menú</NavLink>
                    <NavLink className={ getNavLinkClassName } exact='true' to='/'>Órdenes</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar