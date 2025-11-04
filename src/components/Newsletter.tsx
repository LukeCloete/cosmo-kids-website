"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function Newsletter() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const data: Record<string, string> = {
        "form-name": "newsletter",
        email: values.email,
      };

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      form.setError("email", {
        type: "submitError",
        message: "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Newsletter Signup */}
      <div className="mt-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl p-8 lg:p-12 text-white text-center">
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">
          Stay Updated with Cosmo Kids
        </h3>
        <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
          Get the latest educational tips, activity ideas, and event updates
          delivered to your inbox
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Form {...form}>
            <form
              name="newsletter"
              data-netlify="true"
              method="POST"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex gap-2"
            >
              <input type="hidden" name="form-name" value="newsletter" />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="flex-1 w-full bg-white text-gray-800 border-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-blue-500 hover:bg-blue-200 disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
