import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = ({ transactions, onManage, onViewProof }) => (
  <div className="mt-8">
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">User</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Proof</th>
          <th className="px-4 py-2">Manage</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction._id} className="border-t">
            <td className="px-4 py-2">{transaction.username}</td>
            <td className="px-4 py-2">{transaction.amount} บาท</td>
            <td className="px-4 py-2">
              <span
                className={`px-2 py-1 font-semibold rounded-md ${
                  transaction.status === 'completed'
                    ? 'bg-green-200 text-green-800'
                    : transaction.status === 'pending'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {transaction.status}
              </span>
            </td>
            <td className="px-4 py-2">{new Date(transaction.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => onViewProof(transaction.slipImage)}
                className="text-blue-500 hover:underline"
              >
                View Proof
              </button>
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
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-black">
          <h2 className="text-lg font-bold mb-4">Manage Transaction</h2>
          <div className="mb-4">
            <p>User: {transaction?.username}</p>
            <p>Amount: {transaction?.amount} บาท</p>
            <p>Status: {transaction?.status}</p>
            <p>Date: {new Date(transaction?.createdAt).toLocaleDateString()}</p>
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
              onClick={() => onConfirm(transaction._id, 'completed')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Mark as Completed
            </button>
            <button
              type="button"
              onClick={() => onConfirm(transaction._id, 'failed')}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Mark as Failed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProofModal = ({ isOpen, proofImage, onClose }) => (
  <div
    className={`fixed z-10 inset-0 overflow-y-auto ${
      isOpen ? 'block' : 'hidden'
    }`}
  >
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Proof Image</h2>
        <img src={`http://localhost:4400/${proofImage}`} alt="Proof" className="w-full h-auto" />
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ManageTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [proofImage, setProofImage] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get('http://localhost:4400/api/getAllSlipHistories');
      setTransactions(response.data);
    };

    fetchTransactions();
  }, []);

  const handleManage = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleConfirm = async (transactionId, status) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction._id === transactionId ? { ...transaction, status } : transaction
    );
    setTransactions(updatedTransactions);
    setIsModalOpen(false);

    await axios.post(`http://localhost:4400/api/updateSlipHistoryStatus/${transactionId}`, { status });
  };

  const handleViewProof = (proof) => {
    setProofImage(proof);
    setIsProofModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Transactions</h1>
      <TransactionList
        transactions={transactions}
        onManage={handleManage}
        onViewProof={handleViewProof}
      />
      <ManageModal
        isOpen={isModalOpen}
        transaction={selectedTransaction}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
      <ProofModal
        isOpen={isProofModalOpen}
        proofImage={proofImage}
        onClose={() => setIsProofModalOpen(false)}
      />
    </div>
  );
};

export default ManageTransaction;
