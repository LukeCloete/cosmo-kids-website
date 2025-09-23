"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function Newsletter() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit() {
    router.push("/thank-you");
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
                className="bg-white text-blue-500 hover:bg-blue-200"
              >
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
