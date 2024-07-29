/* eslint-disable */
import axios from 'https://cdn.skypack.dev/axios';
import { showAlert } from './alerts.js';

const bookBtn = document.getElementById('book-tour');

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51PhIF82MewyL4kWX8Ya7ehKLC2ZInoYcjsXzStdrVR8pbSK5uKnEYV8Q2cUoixxVcElb848Oezi8h0m8wqN0xqOk00CTea1y7P',
  );
  try {
    // 1) Get session from server
    const session = await axios(
      `http://localhost:5000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    // 2) create checkout form + charge credit card
    window.location.replace(session.data.session.url);
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const tourId = e.target.dataset.tourId;
    bookTour(tourId);
  });
}
