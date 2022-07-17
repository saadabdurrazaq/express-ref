const express = require("express");
const router = express.Router();
const { addItemToCart, addToCart, getCartItems, removeCartItems, } = require("../controllers/CartController");
const { requireSignin, userMiddleware } = require("../common-middleware"); 

router.post(
  '/addtocart',
  requireSignin,
  userMiddleware,
  addItemToCart
);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post('/get-cart-items', requireSignin, userMiddleware, getCartItems);
//new update
router.post(
  '/remove-item',
  requireSignin,
  userMiddleware,
  removeCartItems
); 

module.exports = router;
