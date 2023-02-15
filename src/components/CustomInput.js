const CustomInput = ({ title, state, setState, textArea }) => {
  return (
    <form
      style={{
        display: "flex",
        justifyContent: "space-arround",
        alignItems: "center",
        width: "400px",
        flexDirection: "column",
      }}
    >
      <div>
        <label htmlFor={title}>{title}</label>
        {textArea ? (
          <textarea
            id={title}
            cols="50"
            rows="10"
            value={state}
            onChange={(event) => {
              setState(event.target.value);
            }}
          ></textarea>
        ) : (
          <input
            value={state}
            type="text"
            id={title}
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
        )}
      </div>
    </form>
  );
};
export default CustomInput;
