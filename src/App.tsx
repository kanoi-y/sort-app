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
  {
    key: "Quick",
    label: "クイックソート",
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
  const [sortStepCount, setSortStepCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * バブルソートを実行する関数
   * @param arr 数値の配列
   * @return バブルソートで並び替えた配列とステップ数のオブジェクト
   */
  const handleBubbleSort = (
    arr: number[],
  ): { result: number[]; stepCount: number } => {
    const copy = [...arr];
    let stepCount = 0;
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy.length - i - 1; j++) {
        stepCount++;
        if (copy[j] > copy[j + 1]) {
          [copy[j + 1], copy[j]] = [copy[j], copy[j + 1]];
        }
      }
    }
    return { result: copy, stepCount };
  };

  /**
   * 選択ソートを実行する関数
   * @param arr 数値の配列
   * @return 選択ソートで並び替えた配列とステップ数のオブジェクト
   */
  const handleSelectionSort = (
    arr: number[],
  ): { result: number[]; stepCount: number } => {
    const copy = [...arr];
    let stepCount = 0;
    for (let i = 0; i < copy.length; i++) {
      let minIndex = i;
      for (let j = i; j < copy.length; j++) {
        stepCount++;
        if (copy[j] < copy[minIndex]) minIndex = j;
      }
      [copy[i], copy[minIndex]] = [copy[minIndex], copy[i]];
    }
    return { result: copy, stepCount };
  };

  /**
   * クイックソートを実行する関数
   * @param arr 数値の配列
   * @return クイックソートで並び替えた配列とステップ数のオブジェクト
   */
  const handleQuickSort = (
    arr: number[],
  ): { result: number[]; stepCount: number } => {
    const copy = [...arr];
    let stepCount = 0;
    if (copy.length <= 1) {
      stepCount++;
      return { result: copy, stepCount };
    }
    const pivot = copy[Math.floor(copy.length / 2)];

    const left = [];
    const right = [];

    for (let i = 0; i < copy.length; i++) {
      stepCount++;
      if (i === Math.floor(copy.length / 2)) {
        continue;
      }
      if (copy[i] < pivot) {
        left.push(copy[i]);
      } else {
        right.push(copy[i]);
      }
    }

    const { result: leftResult, stepCount: leftStepCount } =
      handleQuickSort(left);
    const { result: rightResult, stepCount: rightStepCount } =
      handleQuickSort(right);

    return {
      result: [...leftResult, pivot, ...rightResult],
      stepCount: stepCount + leftStepCount + rightStepCount,
    };
  };

  const handleClickActionBtn = () => {
    setErrorMessage("");

    const originalArr = inputValue
      .split(",")
      .filter((num) => num.trim().length !== 0)
      .map(Number);

    if (originalArr.some((num) => Number.isNaN(num))) {
      setErrorMessage("数字とカンマのみ入力してください。");
      return;
    }

    if (selectedSortMode === sortModeKey.Bubble) {
      const { result, stepCount } = handleBubbleSort(originalArr);
      setOutputValue(result.join(","));
      setSortStepCount(stepCount);
      return;
    }

    if (selectedSortMode === sortModeKey.Selection) {
      const { result, stepCount } = handleSelectionSort(originalArr);
      setOutputValue(result.join(","));
      setSortStepCount(stepCount);
      return;
    }
    const { result, stepCount } = handleQuickSort(originalArr);
    setOutputValue(result.join(","));
    setSortStepCount(stepCount);
  };
  return (
    <main className="max-w-300 m-auto py-8 px-4">
      <fieldset className="fieldset mb-4">
        <legend className="fieldset-legend">アルゴリズム</legend>
        <select
          className="select"
          id="selectSortMode"
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
            id="inputValue"
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
      <p>ステップ数: {sortStepCount}回</p>
    </main>
  );
}

export default App;
