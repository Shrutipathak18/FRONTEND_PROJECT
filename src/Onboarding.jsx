import React, { useState } from 'react';
import PersonalInfo from './onboarding/PersonalInfo';
import BusinessInfo from './onboarding/BusinessInfo';
import Preferences from './onboarding/Preferences';
import './Onboarding.css';

function Onboarding({ onOnboardingComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    industry: '',
    companySize: '',
    theme: 'light',
    dashboardLayout: 'default',
    chartType: 'line',
    dataRefresh: '15'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      // Save all preferences to localStorage
      localStorage.setItem('onboardingData', JSON.stringify(formData));
      // Save individual preferences for easy access
      localStorage.setItem('userTheme', formData.theme);
      localStorage.setItem('dashboardLayout', formData.dashboardLayout);
      localStorage.setItem('chartType', formData.chartType);
      localStorage.setItem('dataRefresh', formData.dataRefresh);
      onOnboardingComplete(formData.name || formData.companyName || 'User');
    }
  };

  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.email) {
          alert('Please fill in all personal information fields.');
          return false;
        }
        return true;
      case 2:
        if (!formData.companyName || !formData.industry || !formData.companySize) {
          alert('Please fill in all business information fields.');
          return false;
        }
        return true;
      case 3:
        // All preference fields have default values, so no validation needed
        return true;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo formData={formData} handleChange={handleChange} />;
      case 2:
        return <BusinessInfo formData={formData} handleChange={handleChange} />;
      case 3:
        return <Preferences formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-box">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        {renderStep()}
        <div className="onboarding-navigation">
          {step > 1 && (
            <button onClick={handleBack} className="back-button">Back</button>
          )}
          {step < 3 && (
            <button onClick={handleNext} className="next-button">Next</button>
          )}
          {step === 3 && (
            <button onClick={handleSubmit} className="submit-button">Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Onboarding; 