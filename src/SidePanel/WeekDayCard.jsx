const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function WeekDayCard({
  todos,
  selectedDate,
  setSelectedDate,
  weekStartDate,
}) {
  const today = formatDate(new Date());

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStartDate);
    date.setDate(date.getDate() + index);
    return date;
  });

  return (
    <div className="week-view">
      {weekDates.map((date) => {
        const dateString = formatDate(date);

        const todoCount = todos.filter(
          (todo) => todo.date === dateString
        ).length;

        const className = [
          "week-day",
          selectedDate === dateString ? "selected" : "",
          today === dateString ? "today" : "",
        ]
          .join(" ")
          .trim();

        return (
          <button
            key={dateString}
            type="button"
            className={className}
            onClick={() => setSelectedDate(dateString)}
          >
            <div className="week-date">
              <strong>{DAY_LABELS[date.getDay()]}</strong>
              <span>{dateString}</span>
            </div>

            <span className="week-count">{todoCount}개</span>
          </button>
        );
      })}
    </div>
  );
}