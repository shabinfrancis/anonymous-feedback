import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true

    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]  //regex for email. match is a validator operation available in mongoose
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],

    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Expiry date is required"],
    },
    isVerified: {
        type: Boolean,
        default: false

    },
    isAcceptingMessage: {
        type: Boolean,
        required: true,
        default: false

    },
    messages: [MessageSchema]  //embedding message schema in user schema. This is an example of embedding documents in mongoose
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);  //if model already exists, use that model, else create a new model.

export default UserModel;