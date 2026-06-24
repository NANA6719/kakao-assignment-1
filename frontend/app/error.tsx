"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="app">
      <main className="main-panel">
        <p className="empty-message">문제가 발생했습니다.</p>

        <button className="filter-button active" onClick={() => reset()}>
          다시 시도
        </button>
      </main>
    </div>
  );
}