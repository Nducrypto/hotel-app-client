import * as api from "../Api/index";

export const getHotels = () => async (dispatch) => {
  try {
    const { data } = await api.fetchHotels();
    console.log(data);
    dispatch({ type: "FETCH", payload: data });
  } catch (err) {
    dispatch({ type: "SET_ERROR", payload: err.message });
  }
};
export const createHotel = (newHotel) => async (dispatch) => {
  try {
    const { data } = await api.createHotel(newHotel);
    dispatch({ type: "CREATE", payload: data });
  } catch (err) {
    dispatch({ type: "SET_ERROR", payload: err.response.data.message });
    console.log(err.response.data.message);
  }
};

export const deleteHotel = (id) => async (dispatch) => {
  console.log(id);
  try {
    await api.deleteHotel(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (err) {
    console.log(err.response.data.message);
    dispatch({ type: "SET_ERROR", payload: err.response.data.message });
  }
};
