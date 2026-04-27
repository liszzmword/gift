import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;
if (url && anonKey) {
  client = createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

export type Relation = "가족" | "연인" | "친구" | "직장동료" | "기타";

export async function logGift(payload: {
  relation: Relation;
  giftA: string;
  giftB: string;
}) {
  if (!client) return;
  try {
    await client.from("gift_logs").insert({
      relation: payload.relation,
      gift_a: payload.giftA,
      gift_b: payload.giftB,
    });
  } catch {
    // analytics는 실패해도 사용자 경험에 영향 없게 무시
  }
}
