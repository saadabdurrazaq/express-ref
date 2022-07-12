const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const categoryControllers = require('../controllers/CategoryController.js')  
const { addCategory, getCategories, updateCategories, deleteCategories } = require("../controllers/CategoryController.js");   
const { requireSignin } = require("../common-middleware"); 
const path = require("path");
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
  '/create',
  requireSignin,
  upload.single("category_pict"),
  addCategory
);

router.get(
  '/get-categories',
  getCategories
);

// router.post(
//   "/update",
//   requireSignin,
//   // upload.array("categoryImage"),
//   updateCategories
// );

// router.post(
//   "/category/delete",
//   requireSignin,
//   superAdminMiddleware,
//   deleteCategories
// );

module.exports = router;
