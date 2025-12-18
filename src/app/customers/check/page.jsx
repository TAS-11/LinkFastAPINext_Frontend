
// src/app/customers/check/page.jsx
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

export const dynamic = "force-dynamic";

async function fetchCustomer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers?customer_id=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch customer");
  return res.json();
}

export default async function Page({ searchParams }) {
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
        {/* ✅ ここを <a> の開始タグ＋終了タグで囲む */}
        /customers
          一覧に戻る
        </a>
      </div>
    </>
  );
}
