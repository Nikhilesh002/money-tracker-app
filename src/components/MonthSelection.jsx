import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../redux/transactionsSlice";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

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
    <div className="flex justify-between items-center p-4 w-1/2 mx-auto">
      <button onClick={() => handleMonthChange(-1)}>
        <FaArrowLeft/>
      </button>
      <div className="font-bold text-2xl text-center">{formatMonthYear(selectedMonth)}</div>
      <button onClick={() => handleMonthChange(1)}>
        <FaArrowRight/>
      </button>
    </div>
  );
};

export default MonthSelection;
