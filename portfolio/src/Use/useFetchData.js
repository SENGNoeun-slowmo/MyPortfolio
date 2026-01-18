import axios from "axios";
import { useEffect, useReducer } from "react";

const initialState = {
  data: null,
  isLoading: true,
  isError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, isError: false };
    case "SUCCESS":
      return { data: action.payload, isLoading: false, isError: false };
    case "ERROR":
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

const useFetchData = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "LOADING" });
      try {
        const res = await axios.get(url);
        dispatch({ type: "SUCCESS", payload: res.data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "ERROR" });
      }
    };

    fetchData();
  }, [url]);

  return state;
};

export default useFetchData;
