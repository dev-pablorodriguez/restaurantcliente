import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import firebase, { FirebaseContext } from './firebase'

import Ordenes from './components/views/Ordenes'
import Menu from './components/views/Menu'
import NuevoPlatillo from './components/views/NuevoPlatillo'
import Sidebar from './components/ui/Sidebar'

function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <div className='md:flex min-h-screen'>
        <Sidebar/>

        <div className='md:w-3/5 xl:w-4/5 p-6'>
          <Routes>
            <Route path="/" element={ <Ordenes /> } />
            <Route path="/menu" element={ <Menu /> } />
            <Route path="/nuevo-platillo" element={ <NuevoPlatillo /> } />
            <Route path="*" element={ <Navigate to='/' /> } />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
