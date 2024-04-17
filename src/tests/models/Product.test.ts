import { Product, IProduct } from '../../models/Product';
import mongoose from 'mongoose';

describe('Product Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a new product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 19.99,
      category: 'Electronics',
    };

    const product = new Product(productData);
    await product.save();

    expect(product.name).toBe(productData.name);
    expect(product.description).toBe(productData.description);
    expect(product.price).toBe(productData.price);
    expect(product.category).toBe(productData.category);
  });

  it('should not create a product without required fields', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
    };

    const product = new Product(productData);
    await expect(product.save()).rejects.toThrow();
  });

  it('should update a product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 19.99,
      category: 'Electronics',
    };

    const product = new Product(productData);
    await product.save();

    const updatedData = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 24.99,
      category: 'Books',
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      updatedData,
      { new: true }
    );

    expect(updatedProduct).toBeTruthy();
    expect(updatedProduct!.name).toBe(updatedData.name);
    expect(updatedProduct!.description).toBe(updatedData.description);
    expect(updatedProduct!.price).toBe(updatedData.price);
    expect(updatedProduct!.category).toBe(updatedData.category);
  });

  it('should delete a product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 19.99,
      category: 'Electronics',
    };

    const product = new Product(productData);
    await product.save();

    const deletedProduct = await Product.findByIdAndDelete(product._id);
    expect(deletedProduct).toBeTruthy();

    const foundProduct = await Product.findById(product._id);
    expect(foundProduct).toBeFalsy();
  });
});