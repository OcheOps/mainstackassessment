import { register, login } from '../../controllers/auth';
import { User } from '../../models/User';
import mongoose from 'mongoose';
describe('Auth Controllers', () => {
    let mockRequest;
    let mockResponse;
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
    describe('register', () => {
        it('should register a new user', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
            };
            mockRequest.body = userData;
            await register(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
            const user = await User.findOne({ email: userData.email });
            expect(user).toBeTruthy();
        });
        // Add more test cases for register controller
    });
    describe('login', () => {
        it('should login a user and return a token', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
            };
            mockRequest.body = userData;
            // Create a test user
            const user = new User(userData);
            await user.save();
            await login(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
        });
        // Add more test cases for login controller
    });
});
//# sourceMappingURL=auth.test.js.map