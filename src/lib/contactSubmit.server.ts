import { createServerFn } from "@tanstack/react-start";
import { Pool } from "pg";

let pool: Pool | null = null;
function getPool() {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return pool;
}

interface ContactData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as ContactData)
  .handler(async ({ data }) => {
    const db = getPool();
    await db.query(
      `INSERT INTO contact_messages (name, email, phone, service, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [data.name, data.email || null, data.phone || null, data.service || null, data.message || null]
    );
    return { success: true };
  });
