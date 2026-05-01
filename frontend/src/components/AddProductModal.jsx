import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FormInput } from './forms/FormInput';
import './AddProductModal.css';

const AddProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Product name is too short')
    .required('Product name is required'),
  price: Yup.number()
    .positive('Price must be greater than zero')
    .required('Price is required'),
  stock: Yup.number()
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .required('Stock quantity is required'),
  category: Yup.string().required('Category is required'),
  size: Yup.string().required('Size is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters long')
    .required('Description is required'),
});

const AddProductModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const initialValues = {
    name: '',
    price: '',
    stock: '',
    category: '',
    size: '',
    description: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate API call
    setTimeout(() => {
      console.log('New Product:', values);
      toast.success(`${values.name} successfully added to inventory!`);
      setSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };

  return (
    <div className="add-modal-overlay animate-fade-in">
      <div className="add-modal-content animate-slide-up-3d">
        <div className="add-modal-header">
          <h2>Add New Item</h2>
          <button className="btn-close-modal" onClick={onClose}>×</button>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={AddProductSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="add-product-form">
              <div className="form-row">
                <FormInput name="name" label="Product Name" placeholder="e.g. Nike Air Max" full />
              </div>

              <div className="form-row split">
                <FormInput name="price" label="Price (₹)" type="number" placeholder="e.g. 4500" />
                <FormInput name="stock" label="Initial Stock" type="number" placeholder="e.g. 50" />
              </div>

              <div className="form-row split">
                <div className="form-group full">
                  <label htmlFor="category">Category</label>
                  <FormInput as="select" name="category" id="category" className="form-select" full>
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing & Fashion</option>
                    <option value="home">Home & Furniture</option>
                    <option value="sports">Sports & Outdoors</option>
                  </FormInput>
                </div>
                
                <div className="form-group full">
                  <label htmlFor="size">Size</label>
                  <FormInput as="select" name="size" id="size" className="form-select" full>
                    <option value="">Select a size</option>
                    <option value="XS">Extra Small (XS)</option>
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                    <option value="OS">One Size (OS)</option>
                  </FormInput>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="description">Product Description</label>
                  <FormInput as="textarea" name="description" id="description" rows="3" placeholder="Describe your product..." full />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductModal;
