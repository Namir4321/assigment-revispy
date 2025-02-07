require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Category = require("./Model/Category");

// Use the same connection string from your .env file
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    seedCategories();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

async function seedCategories() {
  try {
    // Optionally clear existing categories
    await Category.deleteMany({});
    console.log("Existing categories removed");

    const categories = [];
    for (let i = 0; i < 100; i++) {
      // Generate a category name using faker
      categories.push({ name: faker.commerce.department() });
    }

    await Category.insertMany(categories);
    console.log("100 categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    mongoose.disconnect().then(() => console.log("Disconnected from MongoDB"));
  }
}
