import React, { useState, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';
import { FormInput } from './forms/FormInput';
import { addLocalProduct } from '../store/productSlice';
import api from '../services/api';
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
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  if (!isOpen) return null;

  const initialValues = {
    name: '',
    price: '',
    stock: '',
    category: '',
    size: '',
    description: '',
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const newProduct = {
        ...values,
        id: Date.now().toString(), // local unique ID
        _id: Date.now().toString(), // match mongo ID style
        img: imagePreview || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        title: values.name, // for dummyjson compatibility
        price: Number(values.price),
        stock: Number(values.stock),
        discountPercentage: 0,
      };

      // 1. Update Redux for immediate UI reflection
      dispatch(addLocalProduct(newProduct));
      
      // 2. Attempt backend persistence
      try {
        await api.post('/products', {
          ...values,
          img: imagePreview
        });
      } catch (err) {
        console.warn('Backend persistence failed, showing local only', err);
      }

      toast.success(`${values.name} successfully added to inventory!`);
      resetForm();
      setImagePreview(null);
      onClose();
    } catch (error) {
      toast.error('Failed to add product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-modal-overlay animate-fade-in">
      <div className="add-modal-content animate-slide-up-3d">
        <div className="add-modal-header">
          <div className="title-stack">
             <h2>Inventory Onboarding</h2>
             <p>Register a new precision asset to your commerce portal</p>
          </div>
          <button className="btn-close-modal" onClick={onClose}><X size={20} /></button>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={AddProductSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="add-product-form">
              {/* Image Upload Area */}
              <div className="image-onboarding-area">
                {imagePreview ? (
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" className="btn-remove-img" onClick={() => setImagePreview(null)}>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder" onClick={() => fileInputRef.current.click()}>
                    <div className="icon-stack">
                      <ImageIcon className="icon-main" size={32} />
                      <Camera className="icon-sub" size={16} />
                    </div>
                    <strong>Upload Product Visuals</strong>
                    <p>Click to open camera or browse files</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      hidden 
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>

              <div className="form-row">
                <FormInput name="name" label="Product Name" placeholder="e.g. Premium Tech Blazer" full />
              </div>

              <div className="form-row split">
                <FormInput name="price" label="Unit Price (₹)" type="number" placeholder="4500" />
                <FormInput name="stock" label="Initial Stock" type="number" placeholder="50" />
              </div>

              <div className="form-row split">
                <div className="form-group full">
                  <label htmlFor="category">Market Category</label>
                  <FormInput as="select" name="category" id="category" full>
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing & Fashion</option>
                    <option value="Home">Home & Furniture</option>
                    <option value="Sports">Sports & Outdoors</option>
                  </FormInput>
                </div>
                
                <div className="form-group full">
                  <label htmlFor="size">Fulfillment Size</label>
                  <FormInput as="select" name="size" id="size" full>
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">XL</option>
                    <option value="OS">One Size</option>
                  </FormInput>
                </div>
              </div>

              <div className="form-row">
                <FormInput as="textarea" name="description" label="Technical Description" rows="2" placeholder="Detail the materials and features..." full />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Syncing...' : 'Register Asset'}
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
