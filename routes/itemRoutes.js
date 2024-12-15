const express = require("express");
const { createItem, getAllItems, getItemById } = require("../controllers/itemController");
const { upload } = require("../utils/multer");

const router = express.Router();

// POST: Add a new item
router.post("/create-item", upload.single("image"), createItem);

// GET: Retrieve all items
router.get("/all-items", getAllItems);

// GET: Retrieve a single item by ID
router.get("/item/:id", getItemById);

module.exports = router;