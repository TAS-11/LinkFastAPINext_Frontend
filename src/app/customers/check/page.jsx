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
export default async function Page({ searchParams }) {
  // Next.js 15 では searchParams は非同期扱いのため await 推奨
  const sp = await searchParams;
  const id = sp?.id;

  if (!id) {
    return (
      <div className="alert alert-warning p-4 text-center">
        IDが指定されていません
      </div>
    );
  }

  const customerInfo = await fetchCustomer(id);

  return (
    <>
      <OneCustomerInfoCard {...customerInfo} />
      <div className="mt-4">
        {/* ✅ 開始タグを追加し、JSX の < と > を使用 */}
        /customers
          一覧に戻る
        </a>
      </div>
    </>
  );
}
``
