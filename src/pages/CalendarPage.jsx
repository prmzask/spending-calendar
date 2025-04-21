import Calendar from "../components/Calendar";
import dayjs from "dayjs";
import { useState } from "react";

function CalendarPage() {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState(today);

  const year = currentDate.year();
  const month = String(currentDate.month() + 1).padStart(2, "0");

  const goToPrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  // 🌟 月全体の出費データをここで計算
  const allData = JSON.parse(localStorage.getItem("spendingData") || "{}");
  const currentMonthStr = `${year}-${month}`;

  let monthlyTotal = 0;
  let storeTotals = {
    storeA: 0,
    storeB: 0,
    storeC: 0,
    storeD: 0,
  };

  for (const date in allData) {
    if (date.startsWith(currentMonthStr)) {
      const spending = allData[date];
      storeTotals.storeA += Number(spending.storeA || 0);
      storeTotals.storeB += Number(spending.storeB || 0);
      storeTotals.storeC += Number(spending.storeC || 0);
      storeTotals.storeD += Number(spending.storeD || 0);
      monthlyTotal +=
        Number(spending.storeA || 0) +
        Number(spending.storeB || 0) +
        Number(spending.storeC || 0) +
        Number(spending.storeD || 0);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        <button onClick={goToPrevMonth}>←</button>
        {year}年 {month}月
        <button onClick={goToNextMonth}>→</button>
      </h1>
      <Calendar year={year} month={month} />

      {/* 🌟 出費まとめ表示エリア */}
      <div
        style={{
          marginTop: "60px",
          textAlign: "left",
          maxWidth: "400px",
          margin: "60px auto",
          position: "relative",
        }}
      >
        {/* 🌟 上にふわっと重なる画像 */}
        <img
          src="/images/moomin.jpg"
          alt="装飾画像"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "400px",
            opacity: 0.9,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <h2>月間支出まとめ</h2>
        <p>コスモス: ¥{storeTotals.storeA.toLocaleString()}</p>
<p>マックス: ¥{storeTotals.storeB.toLocaleString()}</p>
<p>生協　　: ¥{storeTotals.storeC.toLocaleString()}</p>
<p>外食　　: ¥{storeTotals.storeD.toLocaleString()}</p>
<hr />
<p><strong>合計: ¥{monthlyTotal.toLocaleString()}</strong></p>

      </div>
    </div>
  );
}

export default CalendarPage;
