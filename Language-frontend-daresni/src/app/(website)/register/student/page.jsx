"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sigupStudent } from "@/actions/client/auth";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    familyname: z.string().min(2).max(50),

    phone: z.string().min(10).max(10),
    email: z.string().email(),
    level: z.enum(["cem", "lycee"], {
      required_error: "You need to select a notification type.",
    }),
    year: z.enum(["1", "2", "3", "4"], {
      required_error: "You need to select a notification type.",
    }),
    major: z.enum(["math", "science", "lettre", "gestion"], {
      required_error: "You need to select a notification type.",
    }),
    password: z.string().min(6).max(50),
    password2: z.string().min(6),
  })
  .superRefine(({ password2, password }, ctx) => {
    if (password2 !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["password2"],
      });
    }
  });

export default function page() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      familyname: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
      major: "math",
      level: "lycee",
      year: "1",
    },
  });
  // 2. Define a submit handler.

  const router=useRouter()
  async function onSubmit(values) {
    setLoading(true);
    delete values.password2;
  
    try {
    sigupStudent({ ...values, phone: parseInt(values.phone) });
      router.push('/signin');
      toast({
        title: "Sign up Successful",
        description: "Verifier votre email pour le lien de validation",
      });
    } catch (error) {
      toast({
        title: "Sign up Failed",
        description: "something went wrong",
        variant: "destructive",
      });
    }
  
    setLoading(false);
  }
  


  const goNext = (step) => {
    form
      .trigger([
        "name",
        "familyname",
        "email",
        "phone",
        "password",
        "password2",
      ])
      .then((isValid) => {
        if (isValid) {
          setStep(step);
        }
      });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-12">
        <div className={step == 0 ? "block" : "hidden"}>
          <h1 className="text-4xl mt-[35px]">Signup</h1>
          <p className="text-[13px] text-[#A3A9AF] mt-[23px]">
            Entrez vos détails ci-dessous pour créer votre compte et commencer
          </p>
          <div className="justify-content-start grid md:grid-cols-2 gap-x-16 gap-y-7 mt-[54px] text-sm">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>familyname</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>numero telephone</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="John" {...field} />
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href="/">
              <Button className="w-full" variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button className="w-full" onClick={() => goNext(1)} type="button">
              Continue
            </Button>
          </div>
        </div>
        <div className={step == 1 ? "block" : "hidden"}>
          <h1 className="text-4xl mt-[35px]">Dites-nous en plus sur vous</h1>
          <p className="text-[13px] text-[#A3A9AF] mt-[23px]">
            Quel est votre niveau scolaire ?
          </p>
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="space-y-3 py-6">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <label
                      className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                        form.getValues("level") == "lycee"
                          ? "ring-primary"
                          : "ring-gray-400"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="lycee" />
                      </FormControl>
                      <FormLabel className="font-normal">Lycee</FormLabel>
                    </label>

                    <label
                      className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                        form.getValues("level") == "cem"
                          ? "ring-primary"
                          : "ring-gray-400"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="cem" />
                      </FormControl>
                      <FormLabel className="font-normal">College</FormLabel>
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-3">
            <Button
              className="w-full"
              variant="outline"
              type="button"
              onClick={() => setStep(0)}
            >
              Previous
            </Button>
            <Button className="w-full" type="button" onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        </div>
        <div className={step == 2 ? "block" : "hidden"}>
          <h1 className="text-4xl mt-[35px]">Signup</h1>
          <p className="text-[13px] text-[#A3A9AF] mt-[23px]">
            Entrez vos détails ci-dessous pour créer votre compte et commencer
          </p>
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="space-y-3 py-6">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <label
                      className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                        form.getValues("year") == "1"
                          ? "ring-primary"
                          : "ring-gray-400"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal ">
                        premiere annee
                      </FormLabel>
                    </label>
                    <label
                      className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                        form.getValues("year") == "2"
                          ? "ring-primary"
                          : "ring-gray-400"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal ">
                        deuxieme annee
                      </FormLabel>
                    </label>
                    <label
                      className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                        form.getValues("year") == "3"
                          ? "ring-primary"
                          : "ring-gray-400"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel className="font-normal ">
                        troisieme annee
                      </FormLabel>
                    </label>
                    {form.getValues("level") == "cem" && (
                      <label
                        className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                          form.getValues("year") == "4"
                            ? "ring-primary"
                            : "ring-gray-400"
                        }`}
                      >
                        <FormControl>
                          <RadioGroupItem value="4" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          quatrieme annee
                        </FormLabel>
                      </label>
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 gap-3">
            <Button
              className="w-full"
              variant="outline"
              type="button"
              onClick={() => setStep(1)}
            >
              Previous
            </Button>
            <Button
              className="w-full"
              type={form.getValues("level") == "cem" ? "submit" : "button"}
              onClick={() => {
                if (form.getValues("level") == "cem") return;
                else setStep(3);
              }}
            >
              {form.getValues("level") == "cem"
                ? loading
                  ? "Submiting"
                  : "Submit"
                : "Continue"}
            </Button>
          </div>
        </div>
        <div className={step == 3 ? "block" : "hidden"}>
          <h1 className="text-4xl mt-[35px]">Signup</h1>
          <p className="text-[13px] text-[#A3A9AF] mt-[23px]">
            Entrez vos détails ci-dessous pour créer votre compte et commencer
          </p>

          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem className="space-y-3 py-6">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <label
                      className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                        form.getValues("major") == "math"
                          ? "ring-primary"
                          : "ring-gray-400"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="math" />
                      </FormControl>
                      <FormLabel className="font-normal ">matheleme</FormLabel>
                    </label>
                    <label
                      className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                        form.getValues("major") == "science"
                          ? "ring-primary"
                          : "ring-gray-400"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="science" />
                      </FormControl>
                      <FormLabel className="font-normal ">
                        Scientifique
                      </FormLabel>
                    </label>
                    <label
                      className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                        form.getValues("major") == "lettre"
                          ? "ring-primary"
                          : "ring-gray-400"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="lettre" />
                      </FormControl>
                      <FormLabel className="font-normal ">lettre</FormLabel>
                    </label>
                    <label
                      className={`flex items-center justify-between flex-row-reverse space-x-3 space-y-0 p-6 border rounded-lg ring-2 ${
                        form.getValues("major") == "gestion"
                          ? "ring-primary"
                          : "ring-gray-400"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem value="gestion" />
                      </FormControl>
                      <FormLabel className="font-normal">gestion</FormLabel>
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-3">
            <Button
              className="w-full"
              variant="outline"
              type="button"
              onClick={() => setStep(2)}
            >
              Previous
            </Button>
            <Button className="w-full" type="submit">
              {loading ? "Submiting" : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
