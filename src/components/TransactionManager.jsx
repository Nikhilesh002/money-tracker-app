import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import MonthSelection from "./MonthSelection";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const TransactionManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <motion.button
        className="fixed rounded-full bottom-8 right-5 text-white font-extrabold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <FaPlus className="text-5xl p-2 bg-red-500 hover:bg-red-600 rounded-full" />
      </motion.button>
      {isFormOpen && (
        <TransactionForm
          transaction={null}
          onClose={() => setIsFormOpen(false)}
        />
      )}
      <MonthSelection />
      <TransactionList />
    </div>
  );
};

export default TransactionManager;
