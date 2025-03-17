import { getServerSession } from "next-auth";  //A method provided by next-auth to extract info from session, which is provided by backend.
import { authOptions } from "../auth/[...nextauth]/options";  //getServerSession method will require CredentialsProvider from authOptions.
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";  //It is not the User that we created in model

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;  //Assertion
    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            }, { status: 401 }
        )
    }
  
    const userId = user._id;  //const user se mila
    const { acceptMessages } = await request.json();  //flag from client

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        )
        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Failed to update user status to accept messages"
                }, { status: 401 }
            )
        }
        return Response.json(
            {
                success: true,
                message: "message acceptance status successful",
                data: updatedUser
            }, { status: 200 }
        )
    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json(
            {
                success: false,
                message: "Failed to update user status to accept messages"
            }, { status: 500 }
        )
    }
}


export async function GET(_request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;  //Assertion
    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            }, { status: 401 }
        )
    }

    const userId = user._id;  //const user se mila

    try {
        const foundUser = await UserModel.findById(userId);
        if(!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                }, { status: 404 }
            )
        }
        return Response.json(
            {
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessage  
            }, { status: 200 }
        )
    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json(
            {
                success: false,
                message: "Error in getting message acceptance status"
            }, { status: 500 }
        )
    }
}