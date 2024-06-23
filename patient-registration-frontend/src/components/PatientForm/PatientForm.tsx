import React, { useEffect, useState } from 'react';
import './PatientForm.css';
import api from '../../services/api';
import Modal from '../../components/Modal/Modal';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

interface PatientFormProps {
  onSuccess: (newPatient: any) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [documentPhoto, setDocumentPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'error' | 'multiple-errors' | 'success' | 'info'>('error');
  const [tempPatient, setTempPatient] = useState<any>(null);

  const [countryCodes, setCountryCodes] = useState<any[]>([]);
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const codes = data.map((country: any) => ({
          name: country.name.common,
          code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')
        })).filter((country: any) => country.code); 
        setCountryCodes(codes);
      } catch (error) {
        console.error('Error fetching country codes:', error);
      }
    };

    fetchCountryCodes();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneCountryCode(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleDocumentPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {
      setDocumentPhoto(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = 'Name can only contain letters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/@gmail\.com$/.test(email)) {
      newErrors.email = 'Email must be a valid gmail.com address';
    }

    if (!phoneCountryCode) {
      newErrors.phoneCountryCode = 'Country code is required';
    }

    if (!phoneCountryCode.match(/^\+\d+$/)) newErrors.phoneCountryCode = 'Invalid country code.';

    if (!phoneNumber.match(/^\d+$/)) newErrors.phoneNumber = 'Phone number should contain only digits.';
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    console.log(documentPhoto?.type, 'documentPhoto')
    if (!documentPhoto) {
      newErrors.documentPhoto = 'Document photo is required';
    } else if (documentPhoto.type !== 'image/jpeg' || !documentPhoto.name.match(/\.(jpg|jpeg)$/)) {
      newErrors.documentPhoto = 'Document photo must be a .jpg file';
    }

    setErrors(newErrors);

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phoneCountryCode', phoneCountryCode);
      formData.append('phoneNumber', phoneNumber);
      if (documentPhoto) {
        formData.append('documentPhoto', documentPhoto);
      }
      try {
        const response = await api.post('/patients', formData);
        if (response.status === 201) {
          setModalMessage('Patient registered successfully');
          setModalType('success');
          setShowModal(true);
          setTempPatient(response.data); 
          // Limpiar el formulario
          setName('');
          setEmail('');
          setPhoneCountryCode('');
          setPhoneNumber('');
          setDocumentPhoto(null);
          // Guardar en LocalStorage
          const patients = JSON.parse(localStorage.getItem('patients') || '[]');
          localStorage.setItem('patients', JSON.stringify([...patients, response.data]));
        } else {
          setModalMessage(response.data.message || 'There was an error registering the patient');
          setModalType('error');
          setShowModal(true);
        }
      } catch (error: any) {
        setModalMessage(error.response ? error.response.data.message : 'There was an error registering the patient');
        setModalType('error');
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (tempPatient) {
      onSuccess(tempPatient); 
      setTempPatient(null); 
    }
    setModalMessage('');
    setModalType('error');
  };

  return (
    <div className="patient-form-container">
      <form className="patient-form" onSubmit={handleSubmit}>
        <h4 className='title'>Add New Patient</h4>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
          <CSSTransition
            in={!!errors.name}
            timeout={500}
            classNames="error"
            unmountOnExit
          >
            <div className="error">{errors.name}</div>
          </CSSTransition>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
          <CSSTransition
            in={!!errors.email}
            timeout={500}
            classNames="error"
            unmountOnExit
          >
            <div className="error">{errors.email}</div>
          </CSSTransition>
        </div>
        <div className="form-group">
          <div className="button-container">
            <div style={{ flex: 1 }}>
              <label>CC</label>
              <select value={phoneCountryCode} onChange={handleCountryCodeChange}>
                <option value="">Select Country Code</option>
                {countryCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>
              <CSSTransition
                in={!!errors.phoneCountryCode}
                timeout={500}
                classNames="error"
                unmountOnExit
              >
                <div className="error">{errors.phoneCountryCode}</div>
              </CSSTransition>
            </div>
            <div style={{ flex: 2 }}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
              <CSSTransition
                in={!!errors.phoneNumber}
                timeout={500}
                classNames="error"
                unmountOnExit
              >
                <div className="error">{errors.phoneNumber}</div>
              </CSSTransition>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="documentPhoto">Document Photo</label>
          <input type="file" accept='.jpg, .jpeg' id="documentPhoto" onChange={handleDocumentPhotoChange} />
          <CSSTransition
            in={!!errors.documentPhoto}
            timeout={500}
            classNames="error"
            unmountOnExit
          >
            <div className="error">{errors.documentPhoto}</div>
          </CSSTransition>
        </div>
        <div className='form-group'>
          <div className="button-container">

            <Link to='/' className="cancel-button">Cancel</Link>


            <button type="submit" className="submit-button">Submit</button>




          </div>
        </div>
      </form >

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        message={modalMessage}
        messageType={modalType}
      />
    </div >
  );
};

export default PatientForm;
