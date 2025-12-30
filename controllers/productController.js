import Product from "../models/productModel.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { product } = req.body;
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product data is required",
      });
    }
    const newProduct = await Product.create(product);
    res.status(201).json({
      success: true,
      message: "Product created",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const oldProduct = await Product.findById(id);
    if (!id || !oldProduct) {
      return res.status(400).json({
        success: false,
        message: "Valid product ID is required",
      });
    }

    const { product } = req.body;
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product data is required",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "Product updated",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!id || !product) {
      return res.status(404).json({
        success: false,
        message: "Valid product ID is required",
      });
    }
    await Product.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
