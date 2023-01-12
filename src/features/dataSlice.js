import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objectId: 10245,
  apiData: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, apiData: action.payload };
    },
    incrementId: (state, action) => {
      return { ...state, objectId: state.objectId + 1 };
    },
    decrementId: (state, action) => {
      return { ...state, objectId: state.objectId - 1 };
    },
    inputId: (state, action) => {
      return { ...state, objectId: action.payload };
    },
    clearData: () => {
      return initialState;
    },
  },
});

export const { setData, incrementId, decrementId, inputId, clearData } =
  dataSlice.actions;

export const fetchData = () => {
  const fetchDataThunk = async (dispatch, getState) => {
    let state = getState();
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`
    );
    const data = await response.json();
    dispatch(setData(data));
  };
  return fetchDataThunk;
};

export default dataSlice.reducer;