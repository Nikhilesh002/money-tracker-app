import { motion } from "framer-motion";
import { useState } from "react";
import MonthSelection from "./MonthSelection";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const TransactionManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <motion.button
        className="fixed text-xl bottom-6 right-4 bg-red-500 hover:bg-red-700 text-white font-extrabold py-1 pb-1.5 px-3 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        +
      </motion.button>
      {isFormOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            className="fixed text-xl top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            X
          </motion.button>
          <motion.div
            className="bg-white p-4 rounded-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <TransactionForm
              transaction={null}
              onClose={() => setIsFormOpen(false)}
            />
          </motion.div>
        </motion.div>
      )}
      <MonthSelection />
      <TransactionList />
    </div>
  );
};

export default TransactionManager;
