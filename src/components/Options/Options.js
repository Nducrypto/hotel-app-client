import "./options.css";

const DateOptions = ({ options, setOptions, openOptions, setOpenOptions }) => {
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increase" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="D-container">
      <div className="D-headerSearch">
        <div>
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="D-headerSearchText"
          >{`${options.adult} adult `}</span>
          {/* · ${options.room}room */}
          {openOptions && (
            <div className="D-options">
              <div className="D-optionItem">
                <span className="D-optionText">Adult</span>
                <div className="D-optionCounter">
                  <button
                    disabled={options.adult <= 1}
                    className="D-optionCounterButton"
                    onClick={() => handleOption("adult", "decrease")}
                  >
                    -
                  </button>
                  <span className="D-optionCounterNumber">{options.adult}</span>
                  <button
                    disabled={options.adult === 2}
                    className="D-optionCounterButton"
                    onClick={() => handleOption("adult", "increase")}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* <div className="D-optionItem">
                <span className="D-optionText">Room</span>
                <div className="D-optionCounter">
                  <button
                    disabled={options.room <= 1}
                    className="D-optionCounterButton"
                    onClick={() => handleOption("room", "decrease")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button
                    disabled={options.room === 3}
                    className="D-optionCounterButton"
                    onClick={() => handleOption("room", "increase")}
                  >
                    +
                  </button>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateOptions;
