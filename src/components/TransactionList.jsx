import "chart.js/auto";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTransaction,
  setFilter,
  setSearch,
} from "../redux/transactionsSlice";
import { colors } from "../utils/CategoryColors";
import { currencySymbol, exchange } from "../utils/CurrencyUtils";
import PieCharts from "./PieCharts";
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
  const [displayingTransactions, setDisplayingTransactions] = useState([]);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleDelete = (id) => {
    dispatch(removeTransaction({ id }));
    toast.error("Transaction deleted");
  };

  const handleFilterChange = (name, value) => {
    dispatch(setFilter({ name, value }));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  useEffect(() => {
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
          (filters.category
            ? transaction.category === filters.category
            : true) &&
          (filters.currency
            ? transaction.currency === filters.currency
            : true) &&
          (filters.search
            ? transaction.title
                .toLowerCase()
                .includes(filters.search.toLowerCase())
            : true)
        );
      })
      .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    setDisplayingTransactions(filteredTransactions);
  }, [transactions, filters, selectedMonth]);

  const groupedTransactions = displayingTransactions.reduce(
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

  const getDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function getSum(txnsOfAday, type) {
    return txnsOfAday
      .reduce((sum, transaction) => {
        let p = exchange[transaction.currency];
        if (
          (type === 1 && transaction.type === "Income") ||
          (type === 2 && transaction.type === "Expense")
        ) {
          return sum + transaction.amount * p;
        }
        return sum;
      }, 0)
      .toFixed(2);
  }

  // Calculate monthly income and expense totals
  const calculateMonthlyTotals = () => {
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.dateTime);
      return (
        transactionDate.getMonth() === selectedMonth.getMonth() &&
        transactionDate.getFullYear() === selectedMonth.getFullYear()
      );
    });

    const incomeTotal = filteredTransactions
      .filter((transaction) => transaction.type === "Income")
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);

    const expenseTotal = filteredTransactions
      .filter((transaction) => transaction.type === "Expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);

    return { incomeTotal, expenseTotal };
  };

  const { incomeTotal, expenseTotal } = calculateMonthlyTotals();

  return (
    <div
      className={
        isDarkMode
          ? "bg-gray-800 min-h-screen text-white mt-10 font-bold"
          : "bg-gray-100 min-h-screen font-bold"
      }
    >
      <Toaster position="top-right" />
      <PieCharts data={displayingTransactions} />
      {/* filters */}
      <div className="flex justify-evenly p-4 w-3/5 mx-auto font-semibold">
        <div className="flex">
          <input
            type="text"
            placeholder="Search by Title"
            value={filters.search}
            onChange={handleSearchChange}
            className="border border-black p-1 rounded ps-2"
          />
          <IoSearchOutline className=" pt-1 text-3xl relative right-8" />
        </div>
        <select
          className="border border-black rounded px-1"
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select
          className="border border-black rounded px-1"
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
          <option value="Food">Food</option>
          <option value="Bonus">Bonus</option>
          <option value="Utilities">Utilities</option>
          <option value="Salary">Salary</option>
          <option value="Gift">Gift</option>
          <option value="Others">Others</option>
        </select>
        <select
          className="border border-black rounded px-1"
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
      {/* Monthly income and expense */}
      <div className="flex  justify-between p-4 gap-3 w-1/2 mx-auto font-bold text-2xl text-center">
        <div className="text-green-500 bg-green-200 p-2 w-1/2 rounded ">
          Income: {currencySymbol["INR"] + " " + incomeTotal}
        </div>
        <div className="text-red-500 bg-red-200 p-2 w-1/2 rounded">
          Expense: {currencySymbol["INR"] + " " + expenseTotal}
        </div>
      </div>
      {/* to show day wise of the month */}
      {Object.keys(groupedTransactions).map((date, index) => (
        <div
          key={index}
          className={
            isDarkMode
              ? "bg-gray-900 shadow-md rounded-lg p-6 mb-4 w-1/2 mx-auto"
              : "bg-white shadow-md rounded-lg p-6 mb-4 w-1/2 mx-auto"
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
              <span className="text-xl font-bold">
                {new Date(date).getDate()}
              </span>
              <span className="ms-2 bg-gray-300 px-2 py-1 rounded text-lg">
                {getDay[new Date(date).getDay()]}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              {/* 1-> income  2->expense */}
              <div className="text-green-500 bg-slate-50 rounded p-1">
                {currencySymbol["INR"] +
                  " " +
                  getSum(groupedTransactions[date], 1)}
              </div>
              <div className="text-red-500 bg-slate-50 rounded p-1">
                {currencySymbol["INR"] +
                  " " +
                  getSum(groupedTransactions[date], 2)}
              </div>
            </div>
          </div>
          {groupedTransactions[date].map((transaction, index) => (
            <div key={index} className="my-0.5 text-center bg-slate-50 p-1">
              {/* cat note amount delete */}
              <div className="flex w-100">
                <div className="w-3/4 flex ">
                  <div
                    className={`w-1/3 ${colors[transaction.category]} rounded`}
                  >
                    {transaction.category}
                  </div>
                  <div className="w-2/3">
                    <button onClick={() => handleEdit(transaction)}>
                      {transaction.title}
                    </button>
                  </div>
                </div>
                <div className="w-1/4 flex justify-between">
                  <div
                    className={
                      transaction.type === "Income"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {currencySymbol[transaction.currency] +
                      " " +
                      transaction.amount}
                  </div>
                  <button
                    className=""
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <MdOutlineDeleteForever className="text-red-500 font-extrabold text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {selectedTransaction !== null && (
        <TransactionForm
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransactionList;
