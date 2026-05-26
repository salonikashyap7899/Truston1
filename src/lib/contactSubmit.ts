import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as ContactData)
  .handler(async ({ data }) => {
    // Switching to Supabase client for consistency and using contact_submissions table
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        service: data.service || null,
        message: data.message || "No message provided",
        source: "website_contact_form"
      });

    if (error) {
      console.error("Submission error:", error);
      throw new Error(error.message);
    }

    return { success: true };
  });
