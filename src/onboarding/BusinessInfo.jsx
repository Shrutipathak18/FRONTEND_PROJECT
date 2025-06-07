import React from 'react';

function BusinessInfo({ formData, handleChange }) {
  return (
    <div className="onboarding-step">
      <h3>Step 2: Business Information</h3>
      <div className="input-group">
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Your Company Name"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="industry">Industry:</label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="e.g., Tech, Healthcare"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="companySize">Company Size:</label>
        <select
          id="companySize"
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          required
        >
          <option value="">Select Size</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-1000">201-1000 employees</option>
          <option value="1000+">1000+ employees</option>
        </select>
      </div>
    </div>
  );
}

export default BusinessInfo; 