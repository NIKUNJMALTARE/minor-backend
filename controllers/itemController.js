const { upload } = require("../utils/multer");
const Item = require("../models/Item");

// Add a new item
exports.createItem = async (req, res) => {
  try {
    const {
      category,
      title,
      price,
      description,
      additionalDetails,
      quantity,
      user,
    } = req.body;

    // Validate mandatory fields
    if (!category || !title || !price || !description) {
      return res.status(400).json({ message: "All mandatory fields are required." });
    }

    // Validate user field
    if (!user) {
      return res.status(400).json({ message: "User details are required." });
    }

    // Parse the user field if it is a string
    let parsedUser;
    try {
      parsedUser = typeof user === "string" ? JSON.parse(user) : user;
    } catch (err) {
      return res.status(400).json({ message: "Invalid user format." });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: "Image is required." });
    }

    // Create a new item
    const newItem = new Item({
      category,
      title,
      price,
      description,
      additionalDetails,
      quantity,
      image: imageUrl, // Save the single image URL
      user: parsedUser,
    });

    await newItem.save();
    res.status(201).json({ message: "Item listed successfully!", item: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get all items with filtering and sorting
exports.getAllItems = async (req, res) => {
  try {
    const { category, sortOrder } = req.query;

    // Build query
    const query = category && category !== "all" ? { category } : {};

    // Fetch and sort items
    const items = await Item.find(query).sort({ price: sortOrder === "desc" ? -1 : 1 });

    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Failed to fetch items." });
  }
};

// Fetch single item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Failed to fetch item details." });
  }
};
