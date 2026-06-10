/**
 * DateNavigator
 *
 * 역할:
 * - 현재 선택된 날짜(selectedDate)를 화면에 보여준다.
 * - 이전 날짜 버튼을 누르면 selectedDate를 하루 전으로 변경한다.
 * - 다음 날짜 버튼을 누르면 selectedDate를 하루 뒤로 변경한다.
 */
export default function DateNavigator({ selectedDate, setSelectedDate }) {
  function changeDate(dayAmount) {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + dayAmount);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    setSelectedDate(`${year}-${month}-${day}`);
  }

  return (
    <div className="date-navigator">
      <button
        type="button"
        className="date-button"
        onClick={() => changeDate(-1)}
      >
        ‹
      </button>

      <strong className="selected-date">{selectedDate}</strong>

      <button
        type="button"
        className="date-button"
        onClick={() => changeDate(1)}
      >
        ›
      </button>
    </div>
  );
}