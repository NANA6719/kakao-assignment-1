"use client";

import { useEffect, useState } from "react";

import MainPanel from "./components/MainPanel";
import SidePanel from "./components/SidePanel";

const WEEK_START_STORAGE_KEY = "react-week-start-date";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getWeekStartDate(date: Date) {
  const currentDate = new Date(date);
  const day = currentDate.getDay();

  const diff = day === 0 ? -6 : 1 - day;

  currentDate.setDate(currentDate.getDate() + diff);

  return formatDate(currentDate);
}

export default function Home() {
  const today = new Date();

  const [todos, setTodos] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [filter, setFilter] = useState("all");
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(today));

  async function fetchTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  }

  useEffect(() => {
    fetchTodos();

    const savedWeekStartDate = localStorage.getItem(WEEK_START_STORAGE_KEY);

    if (savedWeekStartDate !== null) {
      setWeekStartDate(savedWeekStartDate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WEEK_START_STORAGE_KEY, weekStartDate);
  }, [weekStartDate]);

  return (
    <div className="app">
      <MainPanel
        todos={todos}
        setTodos={setTodos}
        fetchTodos={fetchTodos}
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