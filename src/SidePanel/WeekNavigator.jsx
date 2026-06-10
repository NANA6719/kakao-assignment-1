function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function WeekNavigator({ weekStartDate, setWeekStartDate }) {
  const startDate = new Date(weekStartDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  function changeWeek(dayAmount) {
    const newWeekStart = new Date(weekStartDate);
    newWeekStart.setDate(newWeekStart.getDate() + dayAmount);
    setWeekStartDate(formatDate(newWeekStart));
  }

  return (
    <div className="week-header">
      <button type="button" onClick={() => changeWeek(-7)}>
        ‹
      </button>

      <span>
        {formatDate(startDate)} ~ {formatDate(endDate)}
      </span>

      <button type="button" onClick={() => changeWeek(7)}>
        ›
      </button>
    </div>
  );
}