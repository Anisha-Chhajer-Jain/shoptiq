import React from 'react';
import { useField } from 'formik';
import './FormInput.css';

export const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;

  return (
    <div className={`form-group ${props.full ? 'full' : ''}`}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={`form-input ${isError ? 'input-error' : ''}`} {...field} {...props} />
      {isError ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};
