import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const ensureFirstAdmin = createServerFn({ method: "POST" })
  .inputValidator((userId: unknown) => {
    if (typeof userId !== "string" || !userId) throw new Error("Invalid userId");
    return userId;
  })
  .handler(async ({ data: userId }) => {
    const { data: admins, error: checkError } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin")
      .limit(1);

    if (checkError) {
      return { success: false, reason: checkError.message };
    }

    if (admins && admins.length > 0) {
      return { success: false, reason: "admin_exists" };
    }

    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });

    if (insertError) {
      return { success: false, reason: insertError.message };
    }

    return { success: true };
  });
