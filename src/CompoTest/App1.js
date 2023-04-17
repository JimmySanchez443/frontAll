// App.js

import Select from "react-select";

const App = () => {
  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
  ];

  return (
    <div>
      <Select options={options} />
    </div>
  );
};

export default App;