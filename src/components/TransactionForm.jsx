import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, editTransaction } from "../redux/transactionsSlice";

const TransactionForm = ({ transaction, onClose }) => {
  // Initialize state with transaction data or default values
  const [formData, setFormData] = useState({
    dateTime: transaction ? transaction.dateTime : "",
    amount: transaction ? transaction.amount : "",
    type: transaction ? transaction.type : "Income",
    category: transaction ? transaction.category : "",
    title: transaction ? transaction.title : "",
    note: transaction ? transaction.note : "",
  });

  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = () => {
    if (transaction) {
      dispatch(editTransaction(formData));
    } else {
      dispatch(addTransaction(formData));
    }
    onClose();
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-4 pt-0 bg-white shadow-md rounded-md w-96 mx-auto">
      <h1 className="font-semibold text-xl text-center mb-3">
        Transaction Form
      </h1>
      <div className="flex gap-2">
        <button
          className={`w-1/2 ${
            formData.type === "Income" ? "bg-green-400 rounded" : ""
          }`}
          onClick={() => setFormData({ ...formData, type: "Income" })}
        >
          Income
        </button>
        <button
          className={`w-1/2 ${
            formData.type === "Expense" ? "bg-red-400 rounded" : ""
          }`}
          onClick={() => setFormData({ ...formData, type: "Expense" })}
        >
          Expense
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="Healthcare">Healthcare</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Investment">Investment</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Transportation">Transportation</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">note</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
