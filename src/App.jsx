import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from './components/Signin';
import Home from './components/Home';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path='/' element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
        {/* Ruta protegida */}
        {isLoggedIn ? (
          <Route path='/home' element={<Home />} />
        ) : (
          null
        )}
      </Routes>
    </>
  );
}

export default App;