import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';

const ProfileModal = ({ onClose }) => {
  const { currentUser, handleProfileSetup, appData } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    favoriteSubjects: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (subjectId) => {
    setFormData(prev => ({
      ...prev,
      favoriteSubjects: prev.favoriteSubjects.includes(subjectId)
        ? prev.favoriteSubjects.filter(id => id !== subjectId)
        : [...prev.favoriteSubjects, subjectId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter your full name');
      return;
    }
    
    // Temporarily disabled grade requirement
    // if (!formData.grade) {
    //   alert('Please select your grade level');
    //   return;
    // }
    
    handleProfileSetup(formData);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Profile Setup</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                className="form-control" 
                required 
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            {/* Temporarily disabled grade selection */}
            {/* <div className="form-group">
              <label className="form-label" htmlFor="grade">Grade Level (Optional)</label>
              <select 
                id="grade" 
                name="grade"
                className="form-control" 
                value={formData.grade}
                onChange={handleInputChange}
              >
                <option value="">Select Grade</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div> */}
            {currentUser?.role === 'student' && (
              <div className="form-group">
                <label className="form-label">Favorite Subjects (Optional)</label>
                <div className="checkbox-group">
                  {appData.subjects.map(subject => (
                    <div key={subject.id} className="checkbox-item">
                      <input 
                        type="checkbox" 
                        id={`subject-${subject.id}`}
                        checked={formData.favoriteSubjects.includes(subject.id)}
                        onChange={() => handleSubjectChange(subject.id)}
                      />
                      <label htmlFor={`subject-${subject.id}`}>
                        {subject.icon} {subject.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="form-group">
              <button type="submit" className="btn btn--primary btn--full-width">
                Complete Setup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
