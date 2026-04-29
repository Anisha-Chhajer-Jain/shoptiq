export const setLocalItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

export const getLocalItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return defaultValue;
  }
};

export const removeLocalItem = (key) => {
  localStorage.removeItem(key);
};

export const setSessionItem = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to sessionStorage', error);
  }
};

export const getSessionItem = (key, defaultValue = null) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from sessionStorage', error);
    return defaultValue;
  }
};

export const clearStorageOnLogout = () => {
  // Preserve theme
  const theme = localStorage.getItem('shoptiq_theme');
  
  localStorage.clear();
  sessionStorage.clear();
  
  // Restore theme
  if (theme) {
    localStorage.setItem('shoptiq_theme', theme);
  }
};
