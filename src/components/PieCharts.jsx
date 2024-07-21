import { Pie } from "react-chartjs-2";
import { colorValues } from "../utils/CategoryColors";
import { exchange } from "../utils/CurrencyUtils";

const PieCharts = ({ data }) => {
  const calculateCategoryTotals = (type) => {
    return data
      .filter((transaction) => transaction.type === type)
      .reduce((acc, transaction) => {
        if (!acc[transaction.category]) {
          acc[transaction.category] = 0;
        }
        acc[transaction.category] +=
          transaction.amount * exchange[transaction.currency];
        return acc;
      }, {});
  };

  const incomeCategoryTotals = calculateCategoryTotals("Income");
  const expenseCategoryTotals = calculateCategoryTotals("Expense");

  const incomeData = {
    labels: Object.keys(incomeCategoryTotals),
    datasets: [
      {
        label: "Income by Category",
        data: Object.values(incomeCategoryTotals),
        backgroundColor: Object.keys(incomeCategoryTotals).map(
          (category) => colorValues[category]
        ),
        hoverBackgroundColor: Object.keys(incomeCategoryTotals).map(
          (category) => colorValues[category]
        ),
      },
    ],
  };

  const expenseData = {
    labels: Object.keys(expenseCategoryTotals),
    datasets: [
      {
        label: "Expense by Category",
        data: Object.values(expenseCategoryTotals),
        backgroundColor: Object.keys(expenseCategoryTotals).map(
          (category) => colorValues[category]
        ),
        hoverBackgroundColor: Object.keys(expenseCategoryTotals).map(
          (category) => colorValues[category]
        ),
      },
    ],
  };

  return (
    <div className="w-1/2 flex gap-4 mx-auto">
      <div className="w-1/2 p-8">
        <Pie data={incomeData} />
      </div>
      <div className="w-1/2 p-8">
        <Pie data={expenseData} />
      </div>
    </div>
  );
};

export default PieCharts;
