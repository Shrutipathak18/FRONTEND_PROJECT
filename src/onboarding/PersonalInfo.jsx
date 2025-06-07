import React from 'react';

function PersonalInfo({ formData, handleChange }) {
  return (
    <div className="onboarding-step">
      <h3>Step 1: Personal Information</h3>
      <div className="input-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
        />
      </div>
    </div>
  );
}

export default PersonalInfo; 