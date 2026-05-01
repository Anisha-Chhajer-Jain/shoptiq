import React from 'react';
import { useField } from 'formik';
import './FormInput.css';

export const FormInput = (props) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  const { as: Component = 'input', full, label, ...rest } = props;

  return (
    <div className={`form-group ${full ? 'full' : ''}`}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Component className={`form-input ${isError ? 'input-error' : ''}`} {...field} {...rest} />
      {isError ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};
