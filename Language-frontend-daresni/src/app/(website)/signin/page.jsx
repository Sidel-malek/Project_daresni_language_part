"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GetUserType } from "@/actions/client/auth";
import { authenticate } from "@/actions/server/auth";
import { useState } from "react";
const formSchema = z.object({
  email: z.string().email("email is not valid."),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});

export default function page() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const params = useSearchParams();

  async function LoginUser(values) {
    setIsLoading(true);
    try {
      let result = await authenticate(values);
      if (result.success) onSigninSuccess();
      else
        toast({
          title: "Signin Failed",
          variant: "destructive",
        });
    } catch (error) {
      toast({
        title: "Signin Failed",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  const onSigninSuccess = async () => {
    toast({
      title: "Signin Successful",
    });
    const type = await GetUserType();
    
    let callback = params.get("source");
    if (!callback) {
      switch (type) {
        case "student":
          callback = "/d/student";
          break;
        case "admin":
          callback = "/d/admin";
          break;
        default:
          callback = "/signin";
          break;
      }
    }
    router.push(callback);
  };

  return (
    <Form {...form}>
      <form className="space-y-8 " onSubmit={form.handleSubmit(LoginUser)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoginButton pending={isLoading} />
      </form>
    </Form>
  );
}

function LoginButton({ pending }) {
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      {pending ? "Loading" : "Login"}
    </Button>
  );
}