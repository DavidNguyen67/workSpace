import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FilterPrice {
  min: number;
  max: number;
}

interface FilterProductState {
  filterServices: any[];
  filterRatings: any[];
  filterPrices: FilterPrice;
  filterBrands: any[];
  filterSuppliers: any[];
  filterDeliveries: any[];
}

const initialState: FilterProductState = {
  filterServices: [],
  filterRatings: [],
  filterPrices: { min: 0, max: 999999999 },
  filterBrands: [],
  filterSuppliers: [],
  filterDeliveries: [],
};

export const filterProductSlice = createSlice({
  name: 'filterProduct',
  initialState,

  reducers: {
    setServices: (state, action: PayloadAction<any>) => {
      state.filterServices = action.payload;
    },
    setRatings: (state, action: PayloadAction<any>) => {
      state.filterRatings = action.payload;
    },
    setPrices: (state, action: PayloadAction<FilterPrice>) => {
      state.filterPrices = action.payload;
    },
    setBrands: (state, action: PayloadAction<any>) => {
      state.filterBrands = action.payload;
    },
    setSuppliers: (state, action: PayloadAction<any>) => {
      state.filterSuppliers = action.payload;
    },
    setDeliveries: (state, action: PayloadAction<any>) => {
      state.filterDeliveries = action.payload;
    },
    resetFilters: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setServices,
  setRatings,
  setPrices,
  setBrands,
  setSuppliers,
  setDeliveries,
  resetFilters,
} = filterProductSlice.actions;

export default filterProductSlice.reducer;
