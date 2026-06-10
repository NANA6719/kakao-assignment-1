/**
 * 오른쪾 사이드 영역 묶음 입니다.
 * 
 * FilterTabs - ALL / ING / CLEAR 필터
 * WeekNavigator - 이전 주 / 다음 주 이동
 * WeekDayCard - 요일 카드 하나하나 
 */
import FilterTabs from "./FilterTabs";
import WeekNavigator from "./WeekNavigator";
import WeekDayCard from "./WeekDayCard";

export default function SidePanel({
  todos,
  selectedDate,
  setSelectedDate,
  filter,
  setFilter,
  weekStartDate,
  setWeekStartDate,
}) {
  return (
    <aside className="side-panel">
      <FilterTabs filter={filter} setFilter={setFilter} />

      <WeekNavigator
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
      />

      <WeekDayCard
        todos={todos}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        weekStartDate={weekStartDate}
      />
    </aside>
  );
}