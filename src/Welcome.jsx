import React from 'react';
import './Welcome.css';

function Welcome({ onOnboardingComplete }) {
  const handleStartOnboarding = () => {
    // For now, let's just complete onboarding and pass a dummy name
    // The actual name will come from the onboarding wizard
    onOnboardingComplete('Shruti Pathak'); 
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h2>Welcome!</h2>
        <p>Let's get you set up for success.</p>
        <button onClick={handleStartOnboarding} className="start-button">
          Start Onboarding
        </button>
      </div>
    </div>
  );
}

export default Welcome; 