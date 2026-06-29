import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ALLOWED_ADMIN_EMAIL = "trustondevelopers@gmail.com";

export const checkAdminStatus = createServerFn({ method: "POST" })
  .inputValidator((userId: unknown) => {
    if (typeof userId !== "string" || !userId) throw new Error("Invalid userId");
    return userId;
  })
  .handler(async ({ data: userId }) => {
    // First verify the user's email matches the only allowed admin account
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (userError || !userData?.user) return { isAdmin: false };

    const email = userData.user.email?.toLowerCase() ?? "";
    if (email !== ALLOWED_ADMIN_EMAIL) return { isAdmin: false };

    // Then confirm they have the admin role in the database
    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (error) return { isAdmin: false };
    return { isAdmin: !!roles?.some((r) => r.role === "admin") };
  });

export const ensureFirstAdmin = createServerFn({ method: "POST" })
  .inputValidator((userId: unknown) => {
    if (typeof userId !== "string" || !userId) throw new Error("Invalid userId");
    return userId;
  })
  .handler(async ({ data: userId }) => {
    // Only allow the designated admin email to be assigned as admin
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (userError || !userData?.user) return { success: false, reason: "user_not_found" };

    const email = userData.user.email?.toLowerCase() ?? "";
    if (email !== ALLOWED_ADMIN_EMAIL) {
      return { success: false, reason: "not_allowed" };
    }

    const { data: existing } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("user_id", userId)
      .eq("role", "admin")
      .limit(1);

    if (existing && existing.length > 0) {
      return { success: true, reason: "already_admin" };
    }

    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });

    if (insertError) {
      return { success: false, reason: insertError.message };
    }

    return { success: true };
  });
