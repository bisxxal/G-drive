"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { PiSpinner } from "react-icons/pi";
import Link from "next/link"
import { createAccount, signInUser } from "@/actions/user.actions"
import OTPModel from "./OTPModel"
 
const authFormSchema = (formType : 'signin' | 'signup') => {
    return z.object({ 
          email: z.string().email(), 
          fullName: formType === 'signup' ? z.string().min(2).max(100) : z.string().optional(),
      })
}

const AuthForm = ({type}:{type:'signin'|'signup'}) => {

    const [loading, setLoading] = useState(false)
    const [accountId , setAccountId] = useState(null)
    const [ error, setError] = useState('')
    
    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        fullName: "",
        email: "",
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>)=> {
        setLoading(true)    
        try {
          const user =
          type === "signup" ? await createAccount({fullName: values.fullName || "",email: values.email,}) : await signInUser({ email: values.email });
  
            setAccountId(user.accountid)
            
        } catch (error) {   
            setError('invalid email')
        }
        finally{
            setLoading(false)
        }
        
    } 
  return (
    <>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1>{type === 'signin' ? 'Sign-In'  : 'Sign-Up'}</h1>
        {
        type === 'signup' && (
        <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                <Input placeholder="enter fullname" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
        )
        }
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
        <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
        <Input placeholder="enter email" {...field} />
        </FormControl>
        
        <FormMessage />
        </FormItem>
            )}
            />
            
      <Button type="submit" disabled={loading} className=" bg-[#4bf378] disabled:bg-[#4bf378]">
      {type === 'signin' ? 'Sign-in'  : 'Sign-up'}
        {loading && <PiSpinner className="animate-spin" /> }
      </Button>
      <div>
        {type === 'signin' ? (
        <p>Don &apos; t have an account? <Link href="/sign-up" className="text-[#4bf378]">Sign-up</Link></p>
        ):(<p>Already have an account? <Link href="/sign-in" className="text-[#4bf378]">Sign-in</Link></p>)}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  </Form>
  {
    accountId && 
    <OTPModel email={form.getValues('email')} accountId={accountId} />
  }
 </>
  )
}

export default AuthForm
