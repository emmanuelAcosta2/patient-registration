import React from 'react';
import './PatientCard.css';
import TrashIcon from '../../icons/TrashIcon';

interface PatientCardProps {
  id: number; 
  name: string;
  documentPhoto: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: number) => void; 
  className?: string;
}

const PatientCard: React.FC<PatientCardProps> = ({
  id,
  name,
  documentPhoto,
  email,
  phoneCountryCode,
  phoneNumber,
  isExpanded,
  onToggle,
  onDelete,
  className = ''
}) => {
  return (
    <div className={`patient-card ${className}`}>
      <div className="card-header" >
        <img src={`${import.meta.env.VITE_BACKEND_HOST}/uploads/${documentPhoto}`} alt={name}  />
        <h2 className='name-card'>{name}</h2>
        <button className="expand-button" onClick={onToggle}>{isExpanded ? '-' : '+'}</button>
        <button className="delete-button" onClick={() => onDelete(id)}>
          <TrashIcon />
        </button>
      </div>
      {isExpanded && (
        <div className="card-details">
          <p>Email: {email}</p>
          <p>Phone: {phoneCountryCode} {phoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
