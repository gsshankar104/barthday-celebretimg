/**
 * Helper utility functions
 */

/**
 * Format date to a readable string
 *
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('hi-IN', options);
};

/**
 * Calculate days until birthday
 *
 * @param {string} birthdayString - Birthday date string in YYYY-MM-DD format
 * @returns {number} - Days until next birthday
 */
export const daysUntilBirthday = (birthdayString) => {
  const today = new Date();
  const birthday = new Date(birthdayString);

  // Extract month and day from the birthday
  const birthdayMonth = birthday.getMonth();
  const birthdayDay = birthday.getDate();

  // Create a date for this year's birthday
  const thisYearBirthday = new Date(today.getFullYear(), birthdayMonth, birthdayDay);

  // If today is the birthday, return 0
  if (today.getMonth() === birthdayMonth && today.getDate() === birthdayDay) {
    return 0;
  }

  // If birthday has passed this year, set to next year
  if (today > thisYearBirthday) {
    thisYearBirthday.setFullYear(today.getFullYear() + 1);
  }

  // Calculate difference in days
  const diffTime = thisYearBirthday - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Generate a random ID
 *
 * @param {number} length - Length of the ID
 * @returns {string} - Random ID
 */
export const generateRandomId = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

/**
 * Validate form data
 *
 * @param {Object} data - Form data
 * @returns {Object} - Validation result
 */
export const validateForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim() === '') {
    errors.name = 'नाम आवश्यक है';
  }

  if (!data.date) {
    errors.date = 'जन्मदिन की तारीख आवश्यक है';
  }

  if (!data.message || data.message.trim() === '') {
    errors.message = 'संदेश आवश्यक है';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
