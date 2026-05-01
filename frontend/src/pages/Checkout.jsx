import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { addOrder } from '../store/orderSlice';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormInput } from '../components/forms/FormInput';
import './Checkout.css';

const CheckoutSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('Postal code is required'),
  // Dynamic validation based on payment method
  cardName: Yup.string().when('paymentMethod', {
    is: 'now',
    then: () => Yup.string().required('Cardholder name is required')
  }),
  cardNumber: Yup.string().when('paymentMethod', {
    is: 'now',
    then: () => Yup.string().matches(/^\d{16}$/, 'Must be 16 digits').required('Card number is required')
  }),
  expiry: Yup.string().when('paymentMethod', {
    is: 'now',
    then: () => Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format MM/YY').required('Expiry is required')
  }),
  cvv: Yup.string().when('paymentMethod', {
    is: 'now',
    then: () => Yup.string().matches(/^\d{3,4}$/, 'Must be 3 or 4 digits').required('CVV is required')
  })
});

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalCost = subtotal + 10.12; // Flat tax for demo
  
  const [method, setMethod] = useState('delivery');
  const [payment, setPayment] = useState('now');
  const [promo, setPromo] = useState('');

  const steps = [
    { id: 'cart', label: 'Cart', status: 'completed' },
    { id: 'checkout', label: 'Checkout', status: 'active' },
    { id: 'confirm', label: 'Confirmation', status: 'pending' }
  ];

  return (
    <div className="checkout-root">
      <div className="checkout-stepper">
        {steps.map((step, idx) => (
          <div key={step.id} className={`step-item ${step.status}`}>
            <div className="step-circle">
              {step.status === 'completed' ? '✓' : idx + 1}
            </div>
            <span className="step-label">{step.label}</span>
            {idx < steps.length - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          paymentMethod: 'now',
          cardName: '',
          cardNumber: '',
          expiry: '',
          cvv: ''
        }}
        validationSchema={CheckoutSchema}
        onSubmit={(values) => {
          setTimeout(() => {
            console.log('Order Processed', values);
            
            const newOrder = {
              id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              total: totalCost,
              status: 'Processing',
              items: totalQty || 1, // fallback if cart empty
              img: cartItems.length > 0 ? cartItems[0].img : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
              cartItems: cartItems,
              shippingDetails: {
                name: `${values.firstName} ${values.lastName}`,
                address: values.address,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode
              }
            };
            
            dispatch(addOrder(newOrder));
            dispatch(clearCart());
            
            toast.success('Payment successful! Order confirmed.');
            navigate('/orders');
          }, 1500);
        }}
      >
        {({ setFieldValue, handleSubmit, isSubmitting }) => (
          <Form className="checkout-grid" onSubmit={handleSubmit}>
            <div className="checkout-main">
              {/* Fulfillment */}
              <section className="checkout-card">
                <div className="card-header-pro">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 3h15v13H1z"></path><path d="M16 8h4l3 3v5h-7V8z"></path><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  <h3>Fulfillment Method</h3>
                </div>
                <div className="fulfillment-options">
                  <div className={`fulfill-box ${method === 'delivery' ? 'active' : ''}`} onClick={() => setMethod('delivery')}>
                    <div className="radio-check"></div>
                    <div className="fulfill-info">
                      <strong>Home Delivery</strong>
                      <p>Expected arrival: 2-3 business days</p>
                    </div>
                    <svg className="ship-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                  </div>
                  <div className={`fulfill-box ${method === 'pickup' ? 'active' : ''}`} onClick={() => setMethod('pickup')}>
                    <div className="radio-check"></div>
                    <div className="fulfill-info">
                      <strong>Store Pickup / Reservation</strong>
                      <p>Ready in 2 hours • Pay at store available</p>
                    </div>
                    <svg className="shop-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                  </div>
                </div>

                <div className="checkout-form-grid">
                  <FormInput name="firstName" label="First Name" placeholder="John" />
                  <FormInput name="lastName" label="Last Name" placeholder="Doe" />
                  <FormInput name="address" label="Shipping Address" placeholder="123 Commerce Way, Suite 400" full />
                  <FormInput name="city" label="City" placeholder="New York" />
                  <FormInput name="state" label="State/Province" placeholder="NY" />
                  <FormInput name="zipCode" label="Postal Code" placeholder="10001" />
                </div>
              </section>

              {/* Payment */}
              <section className="checkout-card">
                <div className="card-header-pro">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                  <h3>Payment Method</h3>
                  <svg className="secure-shield" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div className="payment-tabs">
                  <div className={`payment-tab ${payment === 'now' ? 'active' : ''}`} onClick={() => { setPayment('now'); setFieldValue('paymentMethod', 'now'); }}>
                    <div className="radio-check"></div>
                    <strong>Pay Now</strong>
                  </div>
                  <div className={`payment-tab ${payment === 'store' ? 'active' : ''}`} onClick={() => { setPayment('store'); setFieldValue('paymentMethod', 'store'); }}>
                    <div className="radio-check"></div>
                    <strong>Pay at Store</strong>
                  </div>
                </div>

                {payment === 'now' && (
                  <div className="cc-form">
                    <FormInput name="cardName" label="Cardholder Name" placeholder="John Doe" full />
                    <FormInput name="cardNumber" label="Card Number" placeholder="0000 0000 0000 0000" full />
                    <FormInput name="expiry" label="Expiry" placeholder="MM/YY" />
                    <FormInput name="cvv" label="CVV" placeholder="123" type="password" />
                  </div>
                )}

                {payment === 'store' && (
                   <div className="payment-note">
                      <p>Reserve item for 48 hours and pay upon pickup. Identification required.</p>
                   </div>
                )}
              </section>
            </div>

        <aside className="checkout-sidebar">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            <div className="mini-item-card">
               <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=100" alt="Item" />
               <div className="mini-info">
                  <strong>OmniStrider Pro X</strong>
                  <p>Qty: 1 • Size: 10.5</p>
                  <span className="price">$145.00</span>
               </div>
            </div>

            <div className="summary-details">
               <div className="sum-row"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
               <div className="sum-row success"><span>Shipping</span><span>FREE</span></div>
               <div className="sum-row"><span>Estimated Tax</span><span>$10.12</span></div>
            </div>

            <div className="promo-section">
               <input type="text" placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} />
               <button className="btn-apply">Apply</button>
            </div>

            <div className="total-row-checkout">
               <span className="total-label">Total</span>
               <span className="total-price">${totalCost.toLocaleString()}</span>
            </div>

            <button type="submit" className="btn-confirm-purchase" disabled={isSubmitting}>
               {isSubmitting ? 'Processing Payment...' : 'Confirm Purchase'}
               {!isSubmitting && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
            </button>
            <p className="terms-note">By clicking "Confirm Purchase", you agree to OmniCommerce's Terms of Service and Privacy Policy.</p>
          </div>

          <div className="trust-badges">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
        </aside>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
