"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaPlus } from "react-icons/fa";
import { MarkdownEditor } from "../_components/MarkdownEditor";
import { FiUpload } from "react-icons/fi";
import { Avatar } from "antd";
import { useState , useEffect  } from "react";
import {getLevel , updateLevel} from "@/actions/client/language";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { displayFile } from "./[levelName]/[examSolutionPath]/page";

const DUMMY_CONTENT = {
  language: "----",
  linguistic: "-----",
  name: "-",
  examnFile: "-------",
  steps: [
    { title: "---", content: "----------" },
    { title: "---", content: "----------" },
  ],
};
const dummy_data = {
  "name":"A1",
  "language":"francais",
  "linguistic":"vocabulaire",
  "steps":[
      {"title":"title  1 updated 2" , "content": "content arabe 1"},
      {"title":"title  arabe 2" , "content": "content arabe 2"},
      {"title":"title  arabe 3" , "content": "content arabe 3"},
      {"title":"title  arabe 4" , "content": "content arabe 4"}
  ]
}

var LEVELS = ["A1", "A2", "B1", "B2","C1", "C2"];
var SUBJECTS = ["grammaire", "vocabulaire"];

export default function page({params}) {

  const router = useRouter();

  const searchParams = useSearchParams();
  const [data, setData] = useState("");
  const form = useForm({
    defaultValues: {
      name: "",
      language: "",
      linguistic: "",
      examnFile:"",
      steps: [
        { title: "", content: "" }
      ],
    },
  });
  const [examen, setExamen] = useState(null);
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const responseData = await getLevel(params.slug , searchParams.get("levelName"));
        form.setValue("language", responseData.language);
        form.setValue("linguistic", responseData.linguistic);
        form.setValue("name", responseData.name);
        form.setValue("examnFile", responseData.examFile );
        form.setValue("steps", responseData.steps);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataFromApi();
  }, [params.slug , searchParams.get("levelName")]);
  

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const addStepFields = () => {
    append({ title: "", content: "" });
  };

  async function onSubmit(values) {
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("updatesJson",JSON.stringify(values));
      if(examen) {
        formData.append("file" , examen);
      }
      formData.updatesJson = values;
      // Send the FormData object to the backend
      const res = await updateLevel(formData , params.slug ,searchParams.get("levelName"));
      
      console.log(res);
      console.log(formData.get("updatesJson"));
      router.push('/d/admin/languages');
    } catch (error) {
      console.error(error);
    }
  }

  const uploadExamen = (event) => {
    if (event.target.files[0]) {
      setExamen(event.target.files[0]);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-8 grid grid-cols-3"
        >
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Langue</FormLabel>
                <FormControl>
                  <Input placeholder="Francais" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linguistic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sujet</FormLabel>
                <FormControl>
                  <Select
                    name="linguistic"
                    id="linguistic"
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sujet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sujet</SelectLabel>
                        {SUBJECTS.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Niveau</FormLabel>
                <FormControl>
                  <Select
                    name="name"
                    id="name"
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Niveau</SelectLabel>
                        {LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-3 space-y-3">
            <h2>Contenue</h2>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="p-3 space-y-3 rounded-xl bg-slate-100"
              >
                <Controller
                  render={({ field }) => (
                    <Input placeholder="Title" {...field} />
                  )}
                  name={`steps.${index}.title`}
                  control={form.control}
                />
                <Controller
                  render={({ field }) => (
                    <MarkdownEditor
                      textareaProps={{
                        placeholder: "content",
                      }}
                      {...field}
                    />
                  )}
                  name={`steps.${index}.content`}
                  control={form.control}
                />

                <div className="flex justify-end items-center py-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={addStepFields}
            >
              <FaPlus />
            </Button>
          </div>
          <div className="col-span-3">
            <FormControl>
              <div className="relative border border-black border-dashed rounded-lg w-full py-6">
                <Input
                  type="file"
                  className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                  id="examn"
                  name="examn"
                  onChange={uploadExamen}
                />
                <label htmlFor="examen" className="cursor-pointer block mt-3">
                  <span className="text-black flex items-center justify-center">
                    <FiUpload className="mr-2" />
                    {examen ? (
                          <strong>{examen.name}</strong>                      
                    ) : (
                          form.getValues("examnFile")
                    )}
                   
                  </span>
                </label>
              </div>
            </FormControl>
          </div>

          <SubmitButton />
        </form>
      </Form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      {pending ? "Submitting" : "Submit"}
    </Button>
  );
}
