import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { read, SSF, utils } from "xlsx";
import Header from "./components/Header";
import TransactionManager from "./components/TransactionManager";
import { setTransactions } from "./redux/transactionsSlice";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

function App() {
  // dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedThemeMode = localStorage.getItem("darkMode");
    return savedThemeMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const filePath = "/Transactions.xlsx";
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(sheet);
        const formattedData = jsonData.map((row) => ({
          ...row,
          id: uuid(),
          dateTime: SSF.format("yyyy-MM-dd", row.dateTime), // Adjust date format as needed
        }));

        dispatch(setTransactions(formattedData));
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    };

    fetchExcelData();
  }, [dispatch]);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <Header />
      <button
        className="absolute mt-4 right-3 border bg-white dark:bg-gray-800 dark:text-white border-gray-700 dark:border-white p-0.5 text-2xl rounded"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <CiLight /> : <MdDarkMode />}
      </button>
      <TransactionManager />
    </div>
  );
}

export default App;
