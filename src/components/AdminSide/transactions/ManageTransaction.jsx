import React, { useState } from 'react';

// Mock data
const mockTransactions = [
  {
    id: 1,
    user: 'John Doe',
    service: 'Web Hosting',
    amount: '$50.00',
    status: 'Pending',
    date: '2023-06-01',
    proof: 'link_to_proof_1'
  },
  {
    id: 2,
    user: 'Jane Smith',
    service: 'SEO Services',
    amount: '$150.00',
    status: 'Completed',
    date: '2023-06-02',
    proof: 'link_to_proof_2'
  },
  {
    id: 3,
    user: 'Alice Johnson',
    service: 'Design',
    amount: '$75.00',
    status: 'Failed',
    date: '2023-06-03',
    proof: 'link_to_proof_3'
  },
];

const TransactionList = ({ transactions, onManage }) => (
  <div className="mt-8">
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">User</th>
          <th className="px-4 py-2">Service</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Proof</th>
          <th className="px-4 py-2">Manage</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="border-t">
            <td className="px-4 py-2">{transaction.user}</td>
            <td className="px-4 py-2">{transaction.service}</td>
            <td className="px-4 py-2">{transaction.amount}</td>
            <td className="px-4 py-2">
              <span
                className={`px-2 py-1 font-semibold rounded-md ${
                  transaction.status === 'Completed'
                    ? 'bg-green-200 text-green-800'
                    : transaction.status === 'Pending'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {transaction.status}
              </span>
            </td>
            <td className="px-4 py-2">{transaction.date}</td>
            <td className="px-4 py-2">
              <a href={transaction.proof} className="text-blue-500 hover:underline">
                View Proof
              </a>
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => onManage(transaction)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Manage
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ManageModal = ({ isOpen, transaction, onClose, onConfirm }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Manage Transaction</h2>
          <div className="mb-4">
            <p>User: {transaction?.user}</p>
            <p>Service: {transaction?.service}</p>
            <p>Amount: {transaction?.amount}</p>
            <p>Status: {transaction?.status}</p>
            <p>Date: {transaction?.date}</p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(transaction.id)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageTransaction = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleManage = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleConfirm = (transactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, status: 'Completed' }
          : transaction
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Transactions</h1>
      <TransactionList transactions={transactions} onManage={handleManage} />
      <ManageModal
        isOpen={isModalOpen}
        transaction={selectedTransaction}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ManageTransaction;
