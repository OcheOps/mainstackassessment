import { Request, Response } from 'express';
import { Product, IProduct } from '../models/Product.js';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;

    // Input validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new product
    const newProduct = new Product({ name, description, price, category });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };
  
  export const getProductById = async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  };
  
  export const updateProduct = async (req: Request, res: Response) => {
    try {
      const { name, description, price, category } = req.body;
  
      // Input validation
      if (!name || !description || !price || !category) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, category },
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update product' });
    }
  };
  
  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  };