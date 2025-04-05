/**
 * Google Apps Script API Service
 * 
 * This service handles all interactions with the Google Apps Script backend
 * for storing and retrieving birthday celebration data.
 */

// Replace with your deployed Google Apps Script Web App URL
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

/**
 * Submit birthday celebration data to Google Drive
 * 
 * @param {Object} data - The celebration data
 * @param {string} data.name - Birthday person's name
 * @param {string} data.date - Birthday date
 * @param {string} data.message - Birthday message
 * @param {File} data.photo - Photo file
 * @returns {Promise<Object>} - Response with unique link
 */
export const submitCelebration = async (data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('date', data.date);
    formData.append('message', data.message);
    formData.append('photo', data.photo);
    
    const response = await fetch(`${SCRIPT_URL}?action=submit`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit celebration data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting celebration:', error);
    throw error;
  }
};

/**
 * Get celebration data by unique ID
 * 
 * @param {string} id - Unique celebration ID
 * @returns {Promise<Object>} - Celebration data
 */
export const getCelebration = async (id) => {
  try {
    const response = await fetch(`${SCRIPT_URL}?action=get&id=${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to retrieve celebration data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting celebration:', error);
    throw error;
  }
};
