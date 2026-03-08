import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { Link, useNavigate } from 'react-router-dom'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from '@/components/GoogleLogin'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 character long')
  })


  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log(values)

    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }

      dispatch(setUser(data.user))
      navigate(RouteIndex)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen w-screen bg-mesh'>
      <Card className="w-[420px] p-10 shadow-xl border-border/50 backdrop-blur-sm">
        <h1 className='text-2xl font-semibold text-center mb-6 tracking-tight'>Welcome back</h1>
        <div>
          <GoogleLogin />
          <div className='border border-border my-5 flex justify-center items-center relative'>
            <span className='absolute bg-card text-muted-foreground text-sm px-2'>Or</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Email ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Password..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-5'>
              <Button type="submit" className="w-full">Sign In</Button>
              <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                <p>Don&apos;t have account? </p>
                <Link className='text-primary font-medium hover:underline underline-offset-4' to={RouteSignUp}>Sign up</Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default SignIn