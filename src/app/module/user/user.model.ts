import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt'

const UserSchema = new Schema<IUser>({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  verified: { type: Boolean, default: false },
},
 { 
    timestamps: true
 });

 UserSchema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
  
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
    next();
  });
  
  UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

//creating a custom static method
UserSchema.statics.isUserExists = async function (email: string) {
    const existingUser = await User.findOne({ email });
    return existingUser;
  };  
  export const User = model<IUser,UserModel>("User", UserSchema);