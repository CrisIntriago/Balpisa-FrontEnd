import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import Login from './paginas/Login';
import { AuthProvider } from "./context/AuthProvider.jsx";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (

    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Route>
      </Routes>
    </AuthProvider>


  );
}

export default App;