import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

// Dummy API simulation
const dummyAPI = {
  getTeamMetrics: (companySize) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const metrics = {
          '1-10': { teamMembers: 8, activeProjects: 3, notifications: 2 },
          '11-50': { teamMembers: 25, activeProjects: 5, notifications: 3 },
          '51-200': { teamMembers: 75, activeProjects: 7, notifications: 4 },
          '201-1000': { teamMembers: 300, activeProjects: 12, notifications: 6 },
          '1000+': { teamMembers: 500, activeProjects: 15, notifications: 8 }
        };
        resolve(metrics[companySize] || metrics['51-200']);
      }, 500);
    });
  },

  getPerformanceData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 'Week 1', performance: Math.floor(Math.random() * 5000) + 1000 },
          { name: 'Week 2', performance: Math.floor(Math.random() * 5000) + 1000 },
          { name: 'Week 3', performance: Math.floor(Math.random() * 5000) + 1000 },
          { name: 'Week 4', performance: Math.floor(Math.random() * 5000) + 1000 },
          { name: 'Week 5', performance: Math.floor(Math.random() * 5000) + 1000 },
          { name: 'Week 6', performance: Math.floor(Math.random() * 5000) + 1000 },
          { name: 'Week 7', performance: Math.floor(Math.random() * 5000) + 1000 }
        ]);
      }, 500);
    });
  }
};

function Dashboard({ userName, onLogout }) {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'My Company',
    industry: 'Software',
    companySize: '51-200',
    userEmail: 'user@company.com'
  });
  const [theme, setTheme] = useState('light');
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [chartType, setChartType] = useState('line');
  const [dataRefresh, setDataRefresh] = useState(15);
  const [teamMetrics, setTeamMetrics] = useState({
    teamMembers: 15,
    activeProjects: 7,
    notifications: 3
  });
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        // Load onboarding data from localStorage
        const onboardingData = JSON.parse(localStorage.getItem('onboardingData'));
        if (onboardingData) {
          setCompanyInfo({
            companyName: onboardingData.companyName || 'My Company',
            industry: onboardingData.industry || 'Software',
            companySize: onboardingData.companySize || '51-200',
            userEmail: onboardingData.email || 'user@company.com'
          });
          setTheme(onboardingData.theme || 'light');
          setDashboardLayout(onboardingData.dashboardLayout || 'default');
          setChartType(onboardingData.chartType || 'line');
          setDataRefresh(parseInt(onboardingData.dataRefresh) || 15);
          
          // Fetch team metrics from dummy API
          const metrics = await dummyAPI.getTeamMetrics(onboardingData.companySize);
          setTeamMetrics(metrics);
        }

        // Fetch initial performance data
        const initialData = await dummyAPI.getPerformanceData();
        setPerformanceData(initialData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Set up data refresh interval
  useEffect(() => {
    const refreshData = async () => {
      try {
        const newData = await dummyAPI.getPerformanceData();
        setPerformanceData(newData);
      } catch (error) {
        console.error('Error refreshing data:', error);
      }
    };

    const refreshInterval = setInterval(refreshData, dataRefresh * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [dataRefresh]);

  // Save user preferences to localStorage
  const saveUserPreferences = () => {
    const preferences = {
      theme,
      dashboardLayout,
      chartType,
      dataRefresh,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  };

  // Load user preferences from localStorage
  const loadUserPreferences = () => {
    const preferences = JSON.parse(localStorage.getItem('userPreferences'));
    if (preferences) {
      setTheme(preferences.theme);
      setDashboardLayout(preferences.dashboardLayout);
      setChartType(preferences.chartType);
      setDataRefresh(preferences.dataRefresh);
    }
  };

  const renderChart = () => {
    if (isLoading) {
      return <div className="loading">Loading chart data...</div>;
    }

    const commonProps = {
      data: performanceData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    };

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="performance" fill="#8884d8" />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="performance" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="performance" stroke="#8884d8" />
          </LineChart>
        );
    }
  };

  const getLayoutClass = () => {
    switch (dashboardLayout) {
      case 'compact':
        return 'dashboard-container compact';
      case 'detailed':
        return 'dashboard-container detailed';
      default:
        return 'dashboard-container';
    }
  };

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className={`${getLayoutClass()} ${theme}-theme`}>
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="welcome-message">Welcome {userName}!</h1>
          <div className="user-info">
            <p><strong>Email:</strong> {companyInfo.userEmail}</p>
            <p><strong>Company:</strong> {companyInfo.companyName}</p>
          </div>
        </div>
        <div className="header-right">
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="metrics-section">
          <div className="metric-card team-members">
            <div className="metric-icon">👥</div>
            <div className="metric-content">
              <h3>Team Members</h3>
              <p className="metric-value">{teamMetrics.teamMembers}</p>
              <p className="metric-label">Active team members</p>
            </div>
          </div>

          <div className="metric-card active-projects">
            <div className="metric-icon">📊</div>
            <div className="metric-content">
              <h3>Active Projects</h3>
              <p className="metric-value">{teamMetrics.activeProjects}</p>
              <p className="metric-label">Ongoing projects</p>
            </div>
          </div>

          <div className="metric-card notifications">
            <div className="metric-icon">🔔</div>
            <div className="metric-content">
              <h3>Notifications</h3>
              <p className="metric-value">{teamMetrics.notifications}</p>
              <p className="metric-label">New notifications</p>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-card">
            <h3>Weekly Performance</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 