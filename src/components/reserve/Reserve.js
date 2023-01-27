import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useFetch from "../../Hooks/useFetch";

const Reserve = ({ setOpen, hotelId }) => {
  // const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { data } = useFetch(`/hotels`);
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select Your Rooms</span>
      </div>
      <select>
        {data.map((p) => (
          <>
            {/* <>{p.type}</> */}
            <option>
              {p.name} is a/an {p.type}
            </option>
            {/* <option>{p.name}</option> */}
          </>
        ))}
      </select>
    </div>
  );
};

export default Reserve;
