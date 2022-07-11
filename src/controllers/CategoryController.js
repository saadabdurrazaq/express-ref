const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
// const multer = require("multer");
const categoryServices = require('../services/CategoryServices.js')  
const { addCategory, getCategories, updateCategories, deleteCategories } = require("../services/CategoryServices.js");   
const { requireSignin } = require("../common-middleware"); 

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

router.post(
  '/create',
  requireSignin,
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
