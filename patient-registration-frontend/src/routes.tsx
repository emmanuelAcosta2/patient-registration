// /src/App.tsx

import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PatientFormPage from './pages/PatientForm/PatientFormPage';

const App: React.FC = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-user" element={<PatientFormPage />} />
            </Routes>
    );
};

export default App;
