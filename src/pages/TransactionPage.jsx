import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const TransactionPage = () => {
  const [balance, setBalance] = useState(1000); // Initial balance set to $1000
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('add'); // "add" or "withdraw"
  const [error, setError] = useState('');

  // Handle the transaction (add or withdraw)
  const handleTransaction = (amount, type) => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (type === 'withdraw' && amount > balance) {
      setError('Insufficient balance!');
      return;
    }

    const newBalance = type === 'add' ? balance + amount : balance - amount;
    setBalance(newBalance);

    const newTransaction = {
      id: new Date().getTime(),
      type,
      amount,
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Money Transaction</h1>

        {/* Current Balance */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center mb-2">Current Balance</h2>
          <div className="text-3xl font-semibold text-center text-blue-500">${balance}</div>
        </div>

        {/* Transaction Form */}
        <div className="p-6 bg-white shadow-xl rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Manage Money</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTransaction(Number(amount), transactionType);
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Amount</label>
              <input
                type="number"
                className="w-full p-3 border rounded mt-1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <label className="text-gray-700">Transaction Type</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setTransactionType('add')}
                  className={`p-2 rounded-full ${
                    transactionType === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  <FaPlus />
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType('withdraw')}
                  className={`p-2 rounded-full ${
                    transactionType === 'withdraw' ? 'bg-red-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  <FaMinus />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
            >
              {transactionType === 'add' ? 'Add Money' : 'Withdraw Money'}
            </button>
          </form>
        </div>

        {/* Transaction History */}
        <div className="mt-6 p-6 bg-white shadow-xl rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <p className="text-gray-500">No transactions yet</p>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {transaction.type === 'add' ? (
                      <FaPlus className="text-green-500" />
                    ) : (
                      <FaMinus className="text-red-500" />
                    )}
                    <div className="text-gray-700">
                      <div className="font-semibold">
                        {transaction.type === 'add' ? 'Added' : 'Withdrawn'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(transaction.id).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${
                      transaction.type === 'add' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    ${transaction.amount}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
