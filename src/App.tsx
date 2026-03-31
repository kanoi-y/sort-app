import { useState } from "react";

const SORT_MODES = [
  {
    key: "Bubble",
    label: "バブルソート",
  },
  {
    key: "Selection",
    label: "選択ソート",
  },
] as const;
type SortModeType = (typeof SORT_MODES)[number]["key"];
const sortModeKey = SORT_MODES.reduce(
  (acc, cur) => {
    acc[cur.key] = cur.key;
    return acc;
  },
  {} as Record<SortModeType, SortModeType>,
);

function App() {
  const [selectedSortMode, setSelectedSortMode] = useState<SortModeType>(
    sortModeKey.Bubble,
  );
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /** 選択したソートで並び替えた配列を返す関数 */
  const handleSort = (arr: number[], sortMode: SortModeType) => {
    const copy = [...arr];

    if (sortMode === sortModeKey.Bubble) {
      for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy.length - i - 1; j++) {
          if (copy[j] > copy[j + 1]) {
            [copy[j + 1], copy[j]] = [copy[j], copy[j + 1]];
          }
        }
      }
      return copy;
    }

    for (let i = 0; i < copy.length; i++) {
      let minIndex = i;
      for (let j = i; j < copy.length; j++) {
        if (copy[j] < copy[minIndex]) minIndex = j;
      }
      [copy[i], copy[minIndex]] = [copy[minIndex], copy[i]];
    }
    return copy;
  };

  const handleClickActionBtn = () => {
    setErrorMessage("");

    const originalArr = inputValue
      .split(",")
      .filter((num) => num.trim().length !== 0)
      .map((num) => Number(num));

    if (originalArr.some((num) => isNaN(num))) {
      setErrorMessage("数字とカンマのみ入力してください。");
      return;
    }

    const result = handleSort(originalArr, selectedSortMode);

    setOutputValue(result.join(","));
  };
  return (
    <main className="max-w-300 m-auto py-8 px-4">
      <fieldset className="fieldset mb-4">
        <legend className="fieldset-legend">アルゴリズム</legend>
        <select
          className="select"
          value={selectedSortMode}
          onChange={(e) => setSelectedSortMode(e.target.value as SortModeType)}
        >
          {SORT_MODES.map((sortMode) => (
            <option value={sortMode.key} key={sortMode.key}>
              {sortMode.label}
            </option>
          ))}
        </select>
      </fieldset>
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
        <button className="btn btn-primary" onClick={handleClickActionBtn}>
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
