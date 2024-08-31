import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from './components/ui/alert';

const FinanceTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const newBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setBalance(newBalance);
  }, [transactions]);

  const addTransaction = () => {
    if (description && amount) {
      const newTransaction = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0],
      };
      setTransactions([...transactions, newTransaction]);
      setDescription('');
      setAmount('');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const chartData = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Goated Finance Tracker</h1>
      
      {showAlert && (
        <Alert className="mb-4 bg-green-100 border-green-400 text-green-700">
          <AlertDescription>Transaction added successfully!</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2" />
            Current Balance
          </h2>
          <p className="text-3xl font-bold text-blue-600">${balance.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="p-2 border rounded"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="p-2 border rounded"
            />
            <button
              onClick={addTransaction}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center"
            >
              <PlusCircle className="mr-2" />
              Add Transaction
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Date</th>
                <th className="p-2">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">{transaction.date}</td>
                  <td className="p-2">{transaction.description}</td>
                  <td className={`p-2 ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinanceTracker;
