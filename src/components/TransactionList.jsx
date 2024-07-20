import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTransaction,
  setFilter,
  setSearch,
} from "../redux/transactionsSlice";
import TransactionForm from "./TransactionForm";

const TransactionList = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const transactions = useSelector((state) => state.transactions.transactions);
  const filters = useSelector((state) => state.transactions.filters);
  const selectedMonth = useSelector(
    (state) => state.transactions.selectedMonth
  );
  const dispatch = useDispatch();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(removeTransaction({ id }));
    }
  };

  const handleFilterChange = (name, value) => {
    dispatch(setFilter({ name, value }));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const filteredTransactions = transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.dateTime);
      return (
        transactionDate.getMonth() === selectedMonth.getMonth() &&
        transactionDate.getFullYear() === selectedMonth.getFullYear()
      );
    })
    .filter((transaction) => {
      return (
        (filters.type ? transaction.type === filters.type : true) &&
        (filters.category ? transaction.category === filters.category : true) &&
        (filters.currency ? transaction.currency === filters.currency : true) &&
        (filters.search
          ? transaction.title
              .toLowerCase()
              .includes(filters.search.toLowerCase())
          : true)
      );
    })
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  const groupedTransactions = filteredTransactions.reduce(
    (acc, transaction) => {
      const date = transaction.dateTime.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {}
  );

  return (
    <div
      className={
        isDarkMode
          ? "bg-gray-800 min-h-screen text-white mt-10"
          : "bg-gray-100 min-h-screen mt-10"
      }
    >
      {/* filters */}
      <div className="filters flex justify-between p-4">
        <input
          type="text"
          placeholder="Search by Title"
          value={filters.search}
          onChange={handleSearchChange}
        />
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
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
        <select
          value={filters.currency}
          onChange={(e) => handleFilterChange("currency", e.target.value)}
        >
          <option value="">All Currencies</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      {/* to show day wise of the month */}
      {Object.keys(groupedTransactions).map((date) => (
        <div
          key={date}
          className={
            isDarkMode
              ? "bg-gray-900 shadow-md rounded-lg p-6 mb-4 w-96 mx-auto"
              : "bg-white shadow-md rounded-lg p-6 mb-4 w-96 mx-auto"
          }
        >
          <div className="flex justify-between mb-2">
            <div
              className={
                isDarkMode
                  ? "text-lg font-semibold text-white"
                  : "text-lg font-semibold"
              }
            >
              {new Date(date).toLocaleDateString()}
            </div>
          </div>
          {groupedTransactions[date].map((transaction) => (
            <div key={transaction.id}>
              <div
                className={
                  isDarkMode ? "text-gray-400 mb-2" : "text-gray-600 mb-2"
                }
              >
                {transaction.title}
              </div>
              <div className="flex justify-between">
                <div className={isDarkMode ? "text-gray-500" : "text-gray-700"}>
                  {transaction.category}
                </div>
                <div
                  className={
                    transaction.type === "Income"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {transaction.amount}
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className={
                    isDarkMode
                      ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  }
                  onClick={() => handleEdit(transaction)}
                >
                  Edit
                </button>
                <button
                  className={
                    isDarkMode
                      ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      : "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  }
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      {selectedTransaction && (
        <TransactionForm
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransactionList;
