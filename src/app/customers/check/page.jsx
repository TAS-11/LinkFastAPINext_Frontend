// src/app/customers/check/page.jsx
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

export const dynamic = "force-dynamic";

// 顧客情報の取得（必要に応じてパスや戻り値を調整）
async function fetchCustomer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers?customer_id=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

// ✅ Server Component（"use client" は付けない）
