// 'use client'
// import { zodResolver } from "@hookform/resolvers/zod"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { useDebounceValue, useDebounceCallback } from 'usehooks-ts'
// import { toast } from "sonner"
// import { useRouter } from "next/navigation"
// import { signUpSchema } from "@/schemas/signUpSchema"
// import axios, { AxiosError } from 'axios'
// import { ApiResponse } from "@/types/ApiResponse"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Loader2 } from 'lucide-react';

// const page = () => {
//     const [username, setUsername] = useState('')
//     const [userMessage, setUserMessage] = useState('')
//     const [ischeckingUsername, setIsCheckingUsername] = useState(false)
//     const [isSubmitting, setIsSubmitting] = useState(false)    //To check whether the form's is getting saved or not, and to check where the form's getting saved

//     const debounced = useDebounceCallback(setUsername, 500)
//     const router = useRouter();

//     // Zod Implementation.
//     const form = useForm<z.infer<typeof signUpSchema>>({
//         resolver: zodResolver(signUpSchema),
//         defaultValues: {
//             username: '',
//             email: '',
//             password: '',
//         }
//     })

//     useEffect(() => {
//         const checkUsernameUnique = async () => {
//             if (username) {
//                 setIsCheckingUsername(true)
//                 setUsername('')
//                 try {
//                     const response = await axios.get(`/api/check-username-unique?username=${username}`)
//                     setUserMessage(response.data.message)
//                 } catch (error) {
//                     const axiosError = error as AxiosError<ApiResponse>;
//                     setUserMessage(axiosError.response?.data.message ?? "Error checking username")
//                 } finally {
//                     setIsCheckingUsername(false)
//                 }
//             }
//         }
//         checkUsernameUnique()
//     }, [username])

//     const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//         setIsCheckingUsername(true)
//         try {

//             const response = await axios.post<ApiResponse>('/api/sign-up', data)

//             console.log(response)

//             toast(response.data.message)
//             router.replace(`/verify/${username}`)
//             setIsSubmitting(false)
//         } catch (error) {
//             console.error("Error in signup of user ", error)
//             const axiosError = error as AxiosError<ApiResponse>;
//             let errorMessage = axiosError.response?.data.message
//             toast(`Signup failed: ${errorMessage}`)
//             setIsSubmitting(false)
//         }
//     }
//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-800">
//             <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//                 <div className="text-center">
//                     <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//                         Join True Feedback
//                     </h1>
//                     <p className="mb-4">Sign up to start your anonymous adventure</p>
//                 </div>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         <FormField
//                             name="username"
//                             control={form.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormControl>
//                                         <FormLabel>Username</FormLabel>
//                                         <Input
//                                             {...field}
//                                             onChange={(e) => {
//                                                 field.onChange(e);
//                                                 debounced(e.target.value);
//                                             }}
//                                         />
//                                     </FormControl>
//                                     {ischeckingUsername && <Loader2 className="animate-spin" />}
//                                     {!ischeckingUsername && userMessage && (
//                                         <p
//                                             className={`text-sm ${userMessage === 'Username is unique'
//                                                     ? 'text-green-500'
//                                                     : 'text-red-500'
//                                                 }`}
//                                         >
//                                             {userMessage}
//                                         </p>
//                                     )}

//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             name="email"
//                             control={form.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Email</FormLabel>
//                                     <Input {...field} name="email" />
//                                     <p className='text-gray-400 text-sm'>We will send you a verification code</p>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             name="password"
//                             control={form.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Password</FormLabel>
//                                     <Input type="password" {...field} name="password" />
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button type="submit" className='w-full' disabled={isSubmitting}>
//                             {isSubmitting ? (
//                                 <>
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     Please wait
//                                 </>
//                             ) : (
//                                 'Sign Up'
//                             )}
//                         </Button>
//                     </form>
//                 </Form>
//                 <div className="text-center mt-4">
//                     <p>
//                         Already a member?{' '}
//                         <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
//                             Sign in
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default page

'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';

const Page = () => {
    const [username, setUsername] = useState('')
    const [userMessage, setUserMessage] = useState('')
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const debounced = useDebounceCallback(setUsername, 500)
    const router = useRouter();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    })

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username) {
                setIsCheckingUsername(true)
                setUserMessage('')
                try {
                    const response = await axios.get(`/api/check-username-unique?username=${username}`)
                    console.log(response.data.message)
                    setUserMessage(response.data.message)
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setUserMessage(axiosError.response?.data.message ?? "Error checking username")
                } finally {
                    setIsCheckingUsername(false)
                }
            }
        }
        checkUsernameUnique()
    }, [username])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>('/api/sign-up', data)
            toast(response.data.message)
            router.replace(`/verify/${data.username}`)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message
            toast(`Signup failed: ${errorMessage}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Join True Feedback
                    </h1>
                    <p className="mb-4">Sign up to start your anonymous adventure</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                debounced(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                                    {!isCheckingUsername && userMessage && (
                                        <p
                                            className={`text-sm ${userMessage === 'Username is unique'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }`}
                                        >
                                            {userMessage}
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <p className='text-gray-400 text-sm'>We will send you a verification code</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Already a member?{' '}
                        <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Page