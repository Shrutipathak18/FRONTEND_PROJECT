import React from 'react';

function Preferences({ formData, handleChange }) {
  return (
    <div className="onboarding-step">
      <h3>Step 3: Customize Your Experience</h3>
      
      <div className="input-group">
        <label htmlFor="theme">Choose Your Theme:</label>
        <select
          id="theme"
          name="theme"
          value={formData.theme}
          onChange={handleChange}
        >
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
          <option value="blue">Blue Theme</option>
          <option value="green">Green Theme</option>
        </select>
        <small className="input-hint">Select a color scheme that suits your preference</small>
      </div>

      <div className="input-group">
        <label htmlFor="dashboardLayout">Dashboard Layout:</label>
        <select
          id="dashboardLayout"
          name="dashboardLayout"
          value={formData.dashboardLayout}
          onChange={handleChange}
        >
          <option value="default">Standard Layout</option>
          <option value="compact">Compact View</option>
          <option value="detailed">Detailed View</option>
        </select>
        <small className="input-hint">Choose how information is displayed on your dashboard</small>
      </div>

      <div className="input-group">
        <label htmlFor="chartType">Default Chart Type:</label>
        <select
          id="chartType"
          name="chartType"
          value={formData.chartType}
          onChange={handleChange}
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="area">Area Chart</option>
        </select>
        <small className="input-hint">Select your preferred chart visualization</small>
      </div>

      <div className="input-group">
        <label htmlFor="dataRefresh">Data Refresh Rate:</label>
        <select
          id="dataRefresh"
          name="dataRefresh"
          value={formData.dataRefresh}
          onChange={handleChange}
        >
          <option value="5">Every 5 minutes</option>
          <option value="15">Every 15 minutes</option>
          <option value="30">Every 30 minutes</option>
          <option value="60">Every hour</option>
        </select>
        <small className="input-hint">How often should your dashboard data update?</small>
      </div>
    </div>
  );
}

export default Preferences; 