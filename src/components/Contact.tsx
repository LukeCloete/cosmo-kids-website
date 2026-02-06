"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Image from "next/image";
import SECTION_IMAGE from "../../public/children3.png";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const formSchema = z.object({
  childFirstName: z.string().min(2, "First name is required"),
  childLastName: z.string().min(2, "Last name is required"),
  nickname: z.string().optional(),
  childDateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female"], {
    message: "Please select a gender",
  }),
  allergies: z.string().optional(),
  homeLanguage: z.string().min(1, "Home language is required"),
  pottyTrained: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  emailMom: z.email("Invalid email address"),
  emailDad: z.email("Invalid email address"),
  cellphoneMom: z.string().min(10, "Invalid phone number"),
  cellphoneDad: z.string().min(10, "Invalid phone number"),
  previousSchool: z.string().optional(),
  preferredStartDate: z.string().min(1, "Preferred start date is required"),
});

type AdmissionsFormValues = z.infer<typeof formSchema>;


export default function Contact() {
   const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<AdmissionsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childFirstName: "",
      childLastName: "",
      nickname: "",
      childDateOfBirth: "",
      gender: undefined,
      allergies: "",
      homeLanguage: "",
      pottyTrained: undefined,
      emailMom: "",
      emailDad: "",
      cellphoneMom: "",
      cellphoneDad: "",
      previousSchool: "",
      preferredStartDate: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData: Record<string, string> = {
        "form-name": "admissions",
        ...Object.fromEntries(
          Object.entries(values).map(([key, value]) => [key, String(value)])
        ),
      };

      const response = await fetch("/__admissionsform.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      form.setError("root", {
        type: "submitError",
        message: "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-32 bg-orange-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-300 rounded-full opacity-60"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-red-300 rounded-full opacity-60"></div>

        <div className="absolute bottom-[calc(5%)] right-[calc(5%)] w-40 h-40 opacity-50 bg-[url('/smart-lions.webp')] bg-cover bg-center bg-no-repeat"></div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-30 -translate-y-16 translate-x-16"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <Image
              src={SECTION_IMAGE}
              alt="Children Playing"
              className="w-full h-auto"
            />
          </div>
          <div className="flex flex-col">
            

           {/* FORM */}
           
        <div className="w-full mx-auto">
          <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.2)] border-0 rounded-2xl p-8 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Admissions Inquiry Form
            </h2>

            <Form {...form}>
              <form
                className="p-8 flex flex-col gap-4 bg-white w-[90%] xl:w-[100%]"
                name="admissions"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <input type="hidden" name="form-name" value="admissions" />
                {/* Child's Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="childFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Child&apos;s First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="childLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Child&apos;s Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nickname (if any)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="childDateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Child&apos;s Date Of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergies</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="homeLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home language</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pottyTrained"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potty Trained</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Parent's Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="emailMom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address (Mom)</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emailDad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address (Dad)</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="cellphoneMom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cellphone Number (Mom)</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cellphoneDad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cellphone Number (Dad)</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="previousSchool"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Previous school or where cared for currently
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredStartDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Starting Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-orange-500 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                {form.formState.errors.root && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {form.formState.errors.root.message}
                  </p>
                )}
              </form>
            </Form>
          </div>
        </div>
      
          </div>
        </div>
      </div>
    </section>
  );
}
