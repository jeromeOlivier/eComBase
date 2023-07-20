import { Schema, Document, model, InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

interface UserBase {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface UserDocument extends UserBase, Document {}

// First, define the schema that will be used to create the model and the interface
const UserSchema = new Schema<UserBase>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, require: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Add to the interface the method to validate the password
UserSchema.methods.matchPassword = async function (
  this: UserDocument,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Finally, define the model that will be used to query the database
// note that the collection name is explicitly specified as "users"
const UserModel = model<UserDocument>("User", UserSchema, "users");

export { UserModel, UserSchema };
