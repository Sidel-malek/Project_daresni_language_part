"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/actions/client/groups";
import { useState, useEffect } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

export default function StudentProfile() {
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
  const [data,setData]=useState()
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await getUserInfo();
        form.reset(response);
        setData(response);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataFromApi();
  }, [form]);
  

  async function onSubmit(values) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-[600px]">
        <div className="flex justify-between items-center gap-6">
          <h2 className="font-bold text-xl">Modifier mes Informations</h2>
          <Button>Save</Button>
        </div>
        <hr className="my-4" />
        <div className="justify-content-start grid md:grid-cols-2 gap-8 text-sm">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Prenom<span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel>
                  Nom<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Smith" {...field} />
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
                <FormLabel>
                  Numero de telephone<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0666223311" {...field} />
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
                <FormLabel>
                  Email<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h2 className="font-bold text-lg mt-8">Mot de Passe</h2>
        <hr className="my-4" />
        <div className="justify-content-start grid md:grid-cols-2 gap-8 text-sm">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Inserez votre mot de passe"
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
                <FormLabel>Confirmation</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-inserez votre mot de passe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h2 className="font-bold text-lg mt-8 mb-4">Niveau Scolaire</h2>
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid md:grid-cols-2 gap-2"
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
        <h2 className="font-bold text-lg mt-8 mb-4">Annee Scolaire</h2>
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid md:grid-cols-2 gap-2"
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
        <h2 className="font-bold text-lg mt-8 mb-4">Specialite</h2>
        <FormField
          control={form.control}
          name="major"
          disabled
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid md:grid-cols-2 gap-2"
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
                    <FormLabel className="font-normal ">Scientifique</FormLabel>
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
      </form>
    </Form>
  );
}
