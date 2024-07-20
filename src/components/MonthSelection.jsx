import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../redux/transactionsSlice";

const MonthSelection = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(
    (state) => state.transactions.selectedMonth
  );

  const handleMonthChange = (direction) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    dispatch(setSelectedMonth(newDate));
  };

  // Function to format the date in "Month Year" format
  const formatMonthYear = (date) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="flex justify-between items-center p-4">
      <button onClick={() => handleMonthChange(-1)}>&lt;</button>
      <span>{formatMonthYear(selectedMonth)}</span>
      <button onClick={() => handleMonthChange(1)}>&gt;</button>
    </div>
  );
};

export default MonthSelection;
