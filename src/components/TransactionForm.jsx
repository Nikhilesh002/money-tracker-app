import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { addTransaction, editTransaction } from "../redux/transactionsSlice";

const TransactionForm = ({ transaction, onClose }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <motion.div
      className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 dark:text-white flex justify-center items-center font-normal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        className="fixed text-xl top-4 right-4 hover:text-white text-gray-200 font-bold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
      >
        <FaRegWindowClose className="text-4xl" />
      </motion.button>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
      >
        <div className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 rounded-md w-96 mx-auto">
          <Toaster />
          <h1 className="font-semibold text-xl text-center mb-3 dark:text-white">
            Transaction Form
          </h1>
          <div className="flex gap-2">
            <button
              className={`w-1/2 ${
                formData.type === "Income" ? "bg-green-400 dark:bg-green-600 rounded" : ""
              }`}
              onClick={() => setFormData({ ...formData, type: "Income" })}
            >
              Income
            </button>
            <button
              className={`w-1/2 ${
                formData.type === "Expense" ? "bg-red-400 dark:bg-red-600 rounded" : ""
              }`}
              onClick={() => setFormData({ ...formData, type: "Expense" })}
            >
              Expense
            </button>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              required
            />
          </div>
          <div className="mb-2 flex gap-2 w-100">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                required
              >
                <option disabled>Select Category</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Groceries">Groceries</option>
                <option value="Food and Drinks">Food and Drinks</option>
                <option value="Transportation">Transportation</option>
                <option value="Housing">Housing</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                required
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Note
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              rows="3"
              required
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 dark:bg-indigo-800 text-white py-2 px-4 rounded-md"
          >
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TransactionForm;
