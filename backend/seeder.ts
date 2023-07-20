import dotenv from "dotenv";
import users from "./data/users";
import products from "./data/products";
import { UserModel } from "./models/user-model";
import { ProductModel } from "./models/product-model";
import { OrderModel } from "./models/order-model";
import connectDB from "./config/db";

dotenv.config();

connectDB().then((r) => r);

const importData = async () => {
  try {
    // clear out all data in the database
    await OrderModel.deleteMany({});
    await ProductModel.deleteMany({});
    await UserModel.deleteMany({});
    // insert users into database
    const createdUsers = await UserModel.insertMany(users);
    // get admin user id
    const adminUserId = createdUsers[0]._id;
    // add admin user to each product created
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId };
    });
    // insert products into database
    await ProductModel.insertMany(sampleProducts);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // clear out all data in the database
    await OrderModel.deleteMany({});
    await ProductModel.deleteMany({});
    await UserModel.deleteMany({});
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// run this command to import data into database
// node backend/seeder -i
if (process.argv[2] === "-i") importData().then((r) => r);

// run this command to destroy data in database
// node backend/seeder -d
if (process.argv[2] === "-d") destroyData().then((r) => r);
