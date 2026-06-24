/**
 * FilterTabs
 * - 전체 / 진행중 / 완료 필터를 변경한다.
 */
export default function FilterTabs({ filter, setFilter }) {
  return (
    <div className="filter-area">
      <button
        type="button"
        className={filter === "all" ? "filter-button active" : "filter-button"}
        onClick={() => setFilter("all")}
      >
        ALL
      </button>

      <button
        type="button"
        className={filter === "ing" ? "filter-button active" : "filter-button"}
        onClick={() => setFilter("ing")}
      >
        ING
      </button>

      <button
        type="button"
        className={filter === "clear" ? "filter-button active" : "filter-button"}
        onClick={() => setFilter("clear")}
      >
        CLEAR
      </button>
    </div>
  );
}