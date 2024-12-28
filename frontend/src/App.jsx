import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './routes/home';
import Login from './routes/login';
import PersonalDashboard from './routes/personal_dashboard';
import Signup from './routes/signup';
import Formm from './routes/formm'; 
import Navbar from './components/navbar';
import Response from './routes/response';
import Wall from './routes/wall';

function App() {
  const [isLogin, setIsLogin] = useState(false); 
  const location = useLocation(); 

  return (
    <>
      {location.pathname !== '/formm' && location.pathname !== '/response'&&location.pathname !== '/wall'&& ( 
        <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PersonalDashboard setIsLogin={setIsLogin} />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/formm" element={<Formm />} />
        <Route path="/response" element={<Response/>}/>
        <Route path="/wall" element={<Wall/>} />
      </Routes>
    </>
  );
}

export default App;
