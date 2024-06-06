// src/components/Dashboard.js
import React from 'react';

const Dashboard = () => {
  const data = [
    { title: 'สมาชิกทั้งหมด', count: 4, color: 'bg-blue-500' },
    { title: 'จำนวนสินค้าทั้งหมด', count: 15, color: 'bg-orange-500' },
    { title: 'จำนวน Stock', count: 70, color: 'bg-red-500' },
    { title: 'ยอดเติมเงินวันนี้', count: 20, color: 'bg-green-500' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className={`${item.color} text-white p-10 rounded-xl shadow-lg transition-transform transform hover:scale-105`}
          >
            <h2 className="text-5xl font-bold mb-4">{item.count}</h2>
            <p className="text-2xl mb-4">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
