import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import Login from './views/Login';
import Register from './views/Register';
import Main from './views/Main';

function App() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const login = (user) => {
    axios.post('http://localhost:8000/api/users/login', user, {withCredentials: true})
        .then(res => {
            localStorage.setItem('bpuid', res.data.id);
            navigate('/main');
        })
        .catch(err => {
            console.log(err);
            setErrors(['Invalid login']);
        });
    }

  return (
    <div className="App">
      <Routes>
        <Route element={<Login handleSubmit={login} errors={errors} />} path='/' />
        <Route element={<Register handleSubmit={login} />} path='/register' />
        <Route element={<Main />} path='/main' />
      </Routes>
    </div>
  );
}

export default App;
