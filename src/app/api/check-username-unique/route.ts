import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        console.log(searchParams);
        const queryParam = {
            username: searchParams.get('username')
        }
        console.log("Query parameters:", queryParam);
        //validate with zod
        const res = UsernameQuerySchema.safeParse(queryParam)
        console.log(res)
        if (!res.success) {
            const usernameErrors = res.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ?
                    usernameErrors.join(', ') : 'Invalid query parameter',
            }, { status: 400 })
        }
        const { username } = res.data;
        console.log(`Checking for existing verified user with username: ${username}`);
        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });
        console.log(`Existing verified user: ${existingVerifiedUser}`);
        // const existingVerifiedUser = await UserModel.findOne({username: queryParam.username, isVerified: true})

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: 'Username is already taken'
            }, { status: 400 })
        }
        return Response.json({
            success: true,
            message: 'Username is unique'
        }, { status: 200 })
    } catch (e) {
        console.error("Error checking username: ", e)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            }, { status: 500 }
        )
    }
}