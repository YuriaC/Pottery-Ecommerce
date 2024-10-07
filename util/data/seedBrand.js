import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import {Brand} from '../../model/Brand.js'; // Path to your Product model
import brandRegistrationValidation from '../../middleware/BrandValidation.js'; // Your middleware path


// Connect to your MongoDB
const seedDatabase = async () => {
    try {
        // Load and parse products.json
        const data = fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8');
        const brands = JSON.parse(data);

        for (let brand of brands) {
            // Mock req, res, and next for validation
            const req = { body: product };
            const res = {
                status: (code) => ({
                    json: (message) => {
                        throw new Error(`Validation failed: ${JSON.stringify(message)}`);
                    }
                })
            };
            const next = () => Promise.resolve(); // Proceed if no error

            // Validate product
            await brandRegistrationValidation(req, res, next);

            // Save validated product to the database
            const newBrand = new Brand(brand);
            await newBrand.save();
        }

        console.log('Database seeding completed successfully.');
    } catch (error) {
        console.error('Error during database seeding:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

// Call the seeding function
seedDatabase();
