import { useEffect, useState } from "react";

import MainPanel from "./MainPanel/MainPanel";
import SidePanel from "./SidePanel/SidePanel";

const TODOS_STORAGE_KEY = "react-todo-list";
const WEEK_START_STORAGE_KEY = "react-week-start-date";

/**
 * Date 객체를 YYYY-MM-DD 형식으로 변환
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * 현재 날짜가 포함된 주의 월요일 계산
 */
function getWeekStartDate(date) {
  const currentDate = new Date(date);
  const day = currentDate.getDay();

  // 일요일이면 -6, 그 외에는 월요일까지 이동
  const diff = day === 0 ? -6 : 1 - day;

  currentDate.setDate(currentDate.getDate() + diff);

  return formatDate(currentDate);
}

export default function App() {
  const today = new Date();

  /**
   * Todo 목록
   * - 처음 실행될 때 localStorage에서 Todo 데이터를 불러온다.
   * - JSON 파싱 실패 시 빈 배열로 시작한다.
   */
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);

      if (savedTodos === null) {
        return [];
      }

      return JSON.parse(savedTodos);
    } catch (error) {
      console.error("Todo 데이터를 불러오지 못했습니다.", error);
      return [];
    }
  });

  /**
   * 현재 선택된 날짜
   * - 앱 최초 실행 시 오늘 날짜로 설정
   */
  const [selectedDate, setSelectedDate] = useState(formatDate(today));

  /**
   * 필터 상태
   * all: 전체
   * ing: 진행중
   * clear: 완료
   */
  const [filter, setFilter] = useState("all");

  /**
   * 현재 보고 있는 주의 시작일
   * - localStorage에 저장된 주차가 있으면 그 값을 사용
   * - 없으면 오늘 날짜 기준 이번 주 월요일 사용
   */
  const [weekStartDate, setWeekStartDate] = useState(() => {
    const savedWeekStartDate = localStorage.getItem(WEEK_START_STORAGE_KEY);

    if (savedWeekStartDate === null) {
      return getWeekStartDate(today);
    }

    return savedWeekStartDate;
  });

  /**
   * todos가 바뀔 때마다 localStorage에 자동 저장
   */
  useEffect(() => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  /**
   * weekStartDate가 바뀔 때마다 localStorage에 자동 저장
   * 도전 미션: 새로고침 후에도 주간 뷰 상태 유지
   */
  useEffect(() => {
    localStorage.setItem(WEEK_START_STORAGE_KEY, weekStartDate);
  }, [weekStartDate]);

  return (
  <div className="app">
    <MainPanel
      todos={todos}
      setTodos={setTodos}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      filter={filter}
    />

    <SidePanel
      todos={todos}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      filter={filter}
      setFilter={setFilter}
      weekStartDate={weekStartDate}
      setWeekStartDate={setWeekStartDate}
    />
  </div>
);
}