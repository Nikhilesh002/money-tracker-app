import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  filters: {
    type: '',
    category: '',
    currency: '',
    search: ''
  },
  selectedMonth: new Date()
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    editTransaction: (state, action) => {
      const index = state.transactions.findIndex(trans => trans.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(trans => trans.dateTime !== action.payload.dateTime);
    },
    setFilter: (state, action) => {
      state.filters[action.payload.name] = action.payload.value;
    },
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setTransactions, addTransaction, editTransaction, removeTransaction, setFilter, setSearch, setSelectedMonth } = transactionsSlice.actions;
export default transactionsSlice.reducer;
