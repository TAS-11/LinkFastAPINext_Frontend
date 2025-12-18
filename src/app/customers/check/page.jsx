// src/app/customers/check/page.jsx

// ✅ Server Component として記述（"use client" は付けない）
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

export const dynamic = "force-dynamic";

// 顧客情報を取得するユーティリティ（必要に応じてパスや戻り値を調整）
async function fetchCustomer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers?customer_id=${id}`,
    { cache: "no-store" } // 必要ならキャッシュポリシーを調整
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

// ✅ ページは async 関数にして await を使えるようにする
export default async function Page({ searchParams }) {
  // Next.js 15 では searchParams は非同期扱いなので await 推奨
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
        /customers一覧に戻る</a>
      </div>
    </>
  );
}
