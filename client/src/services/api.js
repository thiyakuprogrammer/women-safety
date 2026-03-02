// API service for backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Emergency Services API
export const getEmergencyServices = async () => {
  return apiCall('/emergency-services');
};

// Helplines API
export const getHelplines = async () => {
  return apiCall('/helplines');
};

// Safe Routes API
export const getSafeRoutes = async () => {
  return apiCall('/safe-routes');
};

// SOS Alert API
export const sendSOSAlert = async (location, message) => {
  return apiCall('/sos-alert', {
    method: 'POST',
    body: JSON.stringify({ location, message }),
  });
};

// Location Sharing API
export const shareLocation = async (location, contacts) => {
  return apiCall('/share-location', {
    method: 'POST',
    body: JSON.stringify({ location, contacts }),
  });
};

// Report Unsafe Area API
export const reportUnsafeArea = async (location, description, riskLevel) => {
  return apiCall('/report-unsafe', {
    method: 'POST',
    body: JSON.stringify({ location, description, riskLevel }),
  });
};

// Health Check API
export const checkHealth = async () => {
  return apiCall('/health');
};

export default {
  getEmergencyServices,
  getHelplines,
  getSafeRoutes,
  sendSOSAlert,
  shareLocation,
  reportUnsafeArea,
  checkHealth,
};
