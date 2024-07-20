import React from "react";

function Demo() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      key={"kuyf"}
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
            className={isDarkMode ? "text-gray-400 mb-2" : "text-gray-600 mb-2"}
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
  );
}

export default Demo;


<div
                className={
                  // isDarkMode ? "text-gray-400 mb-2" : "text-gray-600 mb-2"
                  "text-gray-400 mb-2 "
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