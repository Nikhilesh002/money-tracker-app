import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";
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
    dispatch(removeTransaction({ id }));
    toast.error("Transaction deleted");
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

  function getSum(txnsOfAday,type){
    let sum=0;
    for(let i=0;i<txnsOfAday.length;i++){
      if(txnsOfAday[i].type==="Income" && type===1) sum+=txnsOfAday[i].amount;
      if(txnsOfAday[i].type==="Expense" && type===2) sum+=txnsOfAday[i].amount;
    }
    return sum===0?sum:sum.toFixed(2);
  }

  return (
    <div
      className={
        isDarkMode
          ? "bg-gray-800 min-h-screen text-white mt-10 font-bold"
          : "bg-gray-100 min-h-screen mt-10 font-bold"
      }
    >
      <Toaster position="top-right" />
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
              {new Date(date).toLocaleDateString()}
            </div>
            <div className="flex justify-between gap-2">  
              {/* 1-> income  2->expense */}
              <div className="text-green-500">{getSum(groupedTransactions[date],1)}</div>
              <div className="text-red-500">{getSum(groupedTransactions[date],2)}</div>
            </div>
          </div>
          {groupedTransactions[date].map((transaction, index) => (
            <div key={index} className="my-0.5 text-center">
              {/* cat note amount delete */}
              <div className="flex w-100">
                <div className="w-3/4 flex ">
                  <div className="w-1/3 bg-slate-200 rounded">{transaction.category}</div>
                  <div className="w-2/3">
                    <button onClick={() => handleEdit(transaction)}>{transaction.title}</button>
                  </div>
                </div>
                <div className="w-1/4 flex justify-between">
                <div className={transaction.type==="Income"?"text-green-500":"text-red-500"}>{transaction.amount}</div>
              <button className="" onClick={() => handleDelete(transaction.id)}>
                <MdOutlineDeleteForever className="text-red-500 font-extrabold text-2xl" />
              </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {selectedTransaction!==null && (
        <TransactionForm
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransactionList;
