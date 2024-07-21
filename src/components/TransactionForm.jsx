import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { addTransaction, editTransaction } from "../redux/transactionsSlice";

const TransactionForm = ({ transaction, onClose }) => {
  // Initialize state with transaction data or default values
  const [formData, setFormData] = useState({
    id: transaction ? transaction.id : uuid(),
    dateTime: transaction ? transaction.dateTime : "",
    amount: transaction ? transaction.amount : 0,
    type: transaction ? transaction.type : "Expense",
    category: transaction ? transaction.category : "Select Category",
    currency: transaction ? transaction.currency : "INR",
    title: transaction ? transaction.title : "",
    note: transaction ? transaction.note : "",
  });

  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = () => {
    if (transaction) {
      dispatch(editTransaction(formData));
      toast.success("Transaction edited!");
    } else {
      dispatch(addTransaction(formData));
      toast.success("Transaction added!");
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
    <motion.div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center font-normal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        className="fixed text-xl top-4 right-4 hover:text-white text-gray-200 font-bold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClose()}
      >
        <FaRegWindowClose className="text-4xl" />
      </motion.button>
      <motion.div
        className="bg-white rounded-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
      >
        <div className="bg-white shadow-md px-6 py-4 rounded-md w-96 mx-auto">
          <Toaster />
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
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-2">
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
          <div className="mb-2 flex gap-2 w-100">
            <div className="w-1/2">
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
                <option disabled>Select Category</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Investment">Investment</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Rent">Rent</option>
                <option value="Food">Food</option>
                <option value="Bonus">Bonus</option>
                <option value="Utilities">Utilities</option>
                <option value="Salary">Salary</option>
                <option value="Gift">Gift</option>
                <option value="Freelance">Freelance</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
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
      </motion.div>
    </motion.div>
  );
};

export default TransactionForm;
