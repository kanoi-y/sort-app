import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /** 文字列を数値の配列に変換し、バブルソートで並び替える関数 */
  const handleBubbleSort = () => {
    setErrorMessage("");

    const originalArr = inputValue
      .split(",")
      .filter((num) => num.trim().length !== 0)
      .map((num) => Number(num));

    if (originalArr.some((num) => isNaN(num))) {
      setErrorMessage("数字とカンマのみ入力してください。");
      return;
    }

    for (let i = 0; i < originalArr.length; i++) {
      for (let j = 0; j < originalArr.length - i - 1; j++) {
        if (originalArr[j] > originalArr[j + 1]) {
          [originalArr[j + 1], originalArr[j]] = [
            originalArr[j],
            originalArr[j + 1],
          ];
        }
      }
    }
    setOutputValue(originalArr.join(","));
  };
  return (
    <main className="max-w-300 m-auto py-8 px-4">
      <h2 className="text-2xl mb-4">バブルソート</h2>
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <span className="whitespace-nowrap">入力（カンマ区切り）:</span>
          <input
            className="input input-primary min-w-100"
            type="text"
            value={inputValue}
            onInput={(e) => setInputValue(e.currentTarget.value)}
          />
        </label>
        <button className="btn btn-primary" onClick={handleBubbleSort}>
          実行
        </button>
      </div>
      {errorMessage && (
        <div className="alert alert-error mb-4">
          <span>{errorMessage}</span>
        </div>
      )}
      <p>出力: {outputValue}</p>
    </main>
  );
}

export default App;
