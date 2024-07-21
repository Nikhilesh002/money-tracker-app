import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../redux/transactionsSlice";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const MonthSelection = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(
    (state) => state.transactions.selectedMonth
  );
  console.log(selectedMonth);

  const handleMonthChange = (direction) => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    dispatch(setSelectedMonth(newDate));
  };

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
    <div className="flex justify-between items-center p-4 w-1/2 mx-auto dark:bg-gray-900 dark:text-white">
      <button onClick={() => handleMonthChange(-1)}>
        <FaArrowLeft className=" text-3xl" />
      </button>
      <div className="font-bold text-2xl text-center dark:text-white">
        {formatMonthYear(selectedMonth)}
      </div>
      <button onClick={() => handleMonthChange(1)}>
        <FaArrowRight className="text-3xl" />
      </button>
    </div>
  );
};

export default MonthSelection;
