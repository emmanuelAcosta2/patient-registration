// /src/pages/PatientFormPage.tsx

import React from 'react';
import PatientForm from '../../components/PatientForm/PatientForm';
import { useNavigate } from 'react-router-dom';

const PatientFormPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/'); 
  };

  return (
    <div>
      <PatientForm onSuccess={handleSuccess} />
    </div>
  );
};

export default PatientFormPage;
