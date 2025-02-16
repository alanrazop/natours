const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/auth.controller');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview,
);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.patch(
  '/sumbit-user-data',
  authController.protect,
  viewsController.updateUserData,
);

module.exports = router;
