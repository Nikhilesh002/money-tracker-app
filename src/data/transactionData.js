import { readFile,utils } from "xlsx";
const [data, setData] = useState(null);

useEffect(() => {
  const fetchExcelData = async () => {
    try {
      const filePath = '/Transactions.xlsx';
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = read(arrayBuffer, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(sheet);

      setData(jsonData);
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  };

  fetchExcelData();
}, []);