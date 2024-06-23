import React, { useState, useEffect } from 'react';
import PatientCard from '../PatientCarcd/PatientCard';
import { Link } from 'react-router-dom';
import './PatientList.css';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);


  const fetchPatients = () => {
    fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/patients`)
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching patients:', error));
  };

  const handleDeletePatient = (id: number) => {
    fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/patients/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Eliminación exitosa, actualizar la lista de pacientes excluyendo el paciente eliminado
          const updatedPatients = patients.filter(patient => patient.id !== id);
          setPatients(updatedPatients);
        } else {
          console.error('Failed to delete patient:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting patient:', error));
  };

  return (
    <div className="patient-list-container">
      <div className="patient-list">
        {patients.length === 0 ? (
          <p>No patients registered yet.</p>
        ) : (
          patients.map((patient, index) => (
            <PatientCard
              key={index}
              {...patient}
              isExpanded={expandedIndex === index}
              documentPhoto={patient.documentPhoto}
              onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              onDelete={() => handleDeletePatient(patient.id)} // Agregar función onDelete
              className={expandedIndex === index ? 'expanded' : ''}
            />
          ))
        )}
      </div>
      <Link to="/add-user" className="add-patient-button">
        +
      </Link>
    </div>
  );
};

export default PatientList;
