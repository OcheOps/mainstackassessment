import { User } from '../../models/User';
import mongoose from 'mongoose';
describe('User Model', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test');
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    it('should create a new user with hashed password', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'password123',
        };
        const user = new User(userData);
        await user.save();
        expect(user.email).toBe(userData.email);
        expect(user.password).not.toBe(userData.password);
        const isMatch = await user.comparePassword(userData.password);
        expect(isMatch).toBe(true);
    });
    it('should not save a user with a duplicate email', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'password123',
        };
        const user1 = new User(userData);
        await user1.save();
        const user2 = new User(userData);
        await expect(user2.save()).rejects.toThrow();
    });
    // Add more test cases for the User model
});
//# sourceMappingURL=User.test.js.map