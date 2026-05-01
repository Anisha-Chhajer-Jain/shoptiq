import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FormInput } from '../components/forms/FormInput';
import { SEO } from '../components/SEO';
import './AddProduct.css';

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

const AddProduct = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    price: '',
    stock: '',
    category: '',
    size: '',
    description: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await api.post('/products', values);
      toast.success('Product successfully added to inventory!');
      setSubmitting(false);
      resetForm();
      navigate('/inventory');
    } catch (error) {
      toast.error(error.message || 'Failed to add product');
      setSubmitting(false);
    }
  };

  return (
    <div className="add-product-root">
      <SEO title="Add New Item" description="Add a new product to your inventory." />
      
      <div className="add-product-header">
        <h1>Add New Product</h1>
        <p>Enter the details of the item you want to sell.</p>
      </div>

      <div className="add-product-card">
        <Formik
          initialValues={initialValues}
          validationSchema={AddProductSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="add-product-form">
              
              <div className="form-row">
                <FormInput
                  label="Product Name"
                  name="name"
                  type="text"
                  placeholder="e.g. Nike Air Max"
                  full
                />
              </div>

              <div className="form-row split">
                <FormInput
                  label="Price (₹)"
                  name="price"
                  type="number"
                  placeholder="e.g. 4500"
                />
                <FormInput
                  label="Initial Stock"
                  name="stock"
                  type="number"
                  placeholder="e.g. 50"
                />
              </div>

                <div className="form-row split">
                  <div className="form-group full">
                    <label htmlFor="category">Category</label>
                    <FormInput
                      as="select"
                      name="category"
                      id="category"
                      className="form-select"
                      full
                    >
                      <option value="">Select a category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing & Fashion</option>
                      <option value="home">Home & Furniture</option>
                      <option value="sports">Sports & Outdoors</option>
                    </FormInput>
                  </div>
                  
                  <div className="form-group full">
                    <label htmlFor="size">Size</label>
                    <FormInput
                      as="select"
                      name="size"
                      id="size"
                      className="form-select"
                      full
                    >
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
                  <FormInput
                    as="textarea"
                    name="description"
                    id="description"
                    rows="4"
                    placeholder="Describe your product..."
                    full
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => navigate('/inventory')}>Cancel</button>
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

export default AddProduct;
