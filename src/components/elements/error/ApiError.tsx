const ApiError = () => {
  return (
    <div className="flex items-center gap-5 justify-center">
      <div>
        <svg
          fill="red"
          width="200px"
          height="200px"
          viewBox="0 0 52 52"
          data-name="Layer 1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M26,0A26,26,0,1,0,52,26,26,26,0,0,0,26,0Zm0,48A22,22,0,1,1,48,26,22,22,0,0,1,26,48Z" />
          <path d="M28.83,26l8.58-8.59a2,2,0,0,0-2.82-2.82L26,23.17l-8.58-8.58a2,2,0,0,0-2.83,2.82L23.17,26l-8.58,8.58a2,2,0,1,0,2.82,2.83L26,28.83l8.59,8.58A2,2,0,0,0,36,38a2,2,0,0,0,1.42-.59,2,2,0,0,0,0-2.82Z" />
        </svg>
      </div>

      <div>
        <h3>Something went wrong while making API request</h3>
      </div>
    </div>
  );
};

export default ApiError;
