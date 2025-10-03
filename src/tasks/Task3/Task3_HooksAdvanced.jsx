import React, {
  useContext,
  useRef,
  useMemo,
  useCallback,
  useState,
  createContext,
} from "react";
/** --- Demo useContext --- **/
const ThemeContext = createContext("light");

function ThemeDemo() {
  const theme = useContext(ThemeContext);
  return (
    <p>
      Theme hiện tại: <b>{theme}</b>
    </p>
  );
}

/** --- Demo useRef --- **/
function InputFocus() {
  const inputRef = useRef(null);
  return (
    <div>
      <input ref={inputRef} placeholder="Type something..." />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
}

/** --- Demo useMemo & useCallback --- **/
function ExpensiveCalculation({ number }) {
  const calculate = (n) => {
    console.log("Tính toán lại...");
    let result = 0;
    for (let i = 0; i < 1e7; i++) result += n;
    return result;
  };

  const memoizedValue = useMemo(() => calculate(number), [number]);

  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div>
      <p>Kết quả tính toán: {memoizedValue}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default function Task3_HooksAdvanced() {
  const [count, setCount] = useState(0);

  return (
    <ThemeContext.Provider value="dark">
      <div style={{ padding: 20 }}>
        <h2>React Hooks Nâng Cao Demo</h2>
        <ThemeDemo />
        <InputFocus />
        <hr />
        <button onClick={() => setCount(count + 1)}>Tăng số: {count}</button>
        <ExpensiveCalculation number={count} />
      </div>
    </ThemeContext.Provider>
  );
}
