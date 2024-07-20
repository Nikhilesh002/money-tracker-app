import { useState } from "react";
import { removeTransaction } from "../redux/transactionsSlice";
import { useDispatch } from "react-redux";

function Transaction({ transaction }) {
  console.log(transaction);
  
  const [isDarkMode,setIsDarkMode]=useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const dispatch=useDispatch();

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleDelete = (dateTime) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(removeTransaction({ dateTime }));
    }
  };

  return (
    <div>
      <div className={isDarkMode ? "text-gray-400 mb-2" : "text-gray-600 mb-2"}>
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
          onClick={() => handleDelete(transaction.dateTime)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Transaction;
