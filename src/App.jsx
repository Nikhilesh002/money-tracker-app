import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { read, utils,SSF } from "xlsx";
import Header from "./components/Header";
import TransactionManager from "./components/TransactionManager";
import { setTransactions } from "./redux/transactionsSlice";
import uuid from 'react-uuid';

function App() {
  // dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
        const formattedData = jsonData.map(row => ({
          ...row,
          id: uuid(),
          dateTime: SSF.format('yyyy-MM-dd', row.dateTime) // Adjust date format as needed
        }));

        dispatch(setTransactions(formattedData));
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    };

    fetchExcelData();
  }, []);

  return (
    <div className={isDarkMode ? "bg-black" : "bg-white"}>
      <Header />
      <div className="w-100 ">
        <button className="float-end" onClick={() => toggleDarkMode()}>
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      <TransactionManager />
    </div>
  );
}

export default App;
