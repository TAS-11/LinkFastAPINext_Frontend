// src/app/customers/create/confirm/page.jsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OneCustomerInfoCard from '@/app/components/one_customer_info_card.jsx';
import fetchCustomer from './fetchCustomer'; // customer_id を受け取り顧客情報を返す関数を想定

function ConfirmPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get('customer_id');

  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const run = async () => {
      if (!customerId) return;
      try {
        const data = await fetchCustomer(customerId);
        setCustomerInfo(data);
      } catch (e) {
        console.error(e);
      }
    };
    run();
  }, [customerId]);

  if (!customerId) {
    return (
      <div className="alert alert-warning p-4 text-center">
        customer_id が指定されていません
      </div>
    );
  }

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-success p-4 text-center">正常に作成しました</div>

        {/* 取得済みならカードを表示 */}
        {customerInfo && <OneCustomerInfoCard {...customerInfo} />}

        <button onClick={() => router.push('/customers')}>
          <div className="btn btn-primary m-4 text-2xl">戻る</div>
        </button>
      </div>
    </>
  );
}

export default function ConfirmPage() {
  // useSearchParams を使う子は Suspense で包むのが安全
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPageContent />
    </Suspense>
  );
}

