
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PatientList from '../components/PatientList/PatientList';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();


  const handleAddUser = () => {
    navigate('/add-user'); 
  };

  return (
    <div className='home-container'>
      <h1 className='title'>Patient Registration</h1>
      <button className='adding-button' onClick={handleAddUser}>Add Patient</button>
      <PatientList />
     
    </div>
  );
};

export default Home;
