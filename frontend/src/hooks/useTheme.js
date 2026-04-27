import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme as toggleThemeAction } from '../store/uiSlice';
import { useEffect } from 'react';

export const useTheme = () => {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
  };
};
