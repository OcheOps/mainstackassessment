import { Request, Response } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../../controllers/products';
import { Product, IProduct } from '../../models/Product';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

describe('Product Controllers', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let testProduct: IProduct;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 19.99,
        category: 'Electronics',
      };
      mockRequest.body = productData;

      // Mock authentication
      const mockToken = jwt.sign({ userId: 'test-user' }, config.jwtSecret);
      mockRequest.headers = { authorization: `Bearer ${mockToken}` };

      await createProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalled();

      const createdProduct = await Product.findOne(productData);
      expect(createdProduct).toBeTruthy();
      testProduct = createdProduct!;
    });

    // Add more test cases for createProduct controller
  });

  describe('getAllProducts', () => {
    it('should fetch all products', async () => {
      await getAllProducts(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining(testProduct)]));
    });

    // Add more test cases for getAllProducts controller
  });

  describe('getProductById', () => {
    it('should fetch a product by ID', async () => {
      mockRequest.params = { id: testProduct._id.toString() };

      await getProductById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining(testProduct));
    });

    // Add more test cases for getProductById controller
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const updatedData = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 24.99,
        category: 'Books',
      };
      mockRequest.body = updatedData;
      mockRequest.params = { id: testProduct._id.toString() };

      // Mock authentication
      const mockToken = jwt.sign({ userId: 'test-user' }, config.jwtSecret);
      mockRequest.headers = { authorization: `Bearer ${mockToken}` };

      await updateProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining(updatedData));
    });

    // Add more test cases for updateProduct controller
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      mockRequest.params = { id: testProduct._id.toString() };

      // Mock authentication
      const mockToken = jwt.sign({ userId: 'test-user' }, config.jwtSecret);
      mockRequest.headers = { authorization: `Bearer ${mockToken}` };

      await deleteProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });

      const deletedProduct = await Product.findById(testProduct._id);
      expect(deletedProduct).toBeFalsy();
    });

    // Add more test cases for deleteProduct controller
  });
});