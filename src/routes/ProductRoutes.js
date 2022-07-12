const express = require("express");
const router = express.Router();
const { requireSignin } = require("../common-middleware");
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts } = require("../controllers/ProductController");
const shortid = require("shortid");
const path = require("path");
// multer usage
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/create",
  requireSignin,
  upload.array("product_pict"),
  createProduct
);
router.get("/products/:slug", getProductsBySlug);
//router.get('/category/getcategory', getCategories);
router.get("/:productId", getProductDetailsById);
router.delete(
  "/deleteProductById",
  requireSignin,
  deleteProductById
);
router.post(
  "/getProducts",
  requireSignin,
  getProducts
);

module.exports = router;

