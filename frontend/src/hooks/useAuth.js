import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction } from '../store/authSlice';
import api from '../services/api';

export const useAuth = () => {
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = async (credentials) => {
    dispatch(loginStart());
    try {
      // Simulate API call
      const response = await new Promise((resolve) => 
        setTimeout(() => resolve({ data: { name: 'Admin User', email: credentials.email, role: 'PRO' } }), 1000)
      );
      dispatch(loginSuccess(response.data));
      return response.data;
    } catch (err) {
      dispatch(loginFailure(err.message));
      throw err;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
};
