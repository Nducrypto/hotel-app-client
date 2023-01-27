const bookings = (bookings = { booking: [], isError: null }, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...bookings, isError: action.payload };

    case "FETCH":
      return { ...bookings, booking: action.payload };

    case "CREATE":
      return {
        ...bookings,
        booking: [...bookings.booking, action.payload],
      };

    case "DELETE":
      return {
        ...bookings,
        booking: bookings.booking.filter((t) => t._id !== action.payload),
      };

    // return booking.filter((p) => p._id !== action.payload);

    default:
      return bookings;
  }
};

export default bookings;
