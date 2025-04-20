import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function SummaryPage() {
  const [summaryData, setSummaryData] = useState(null);
  const [month, setMonth] = useState(dayjs().format("YYYY-MM")); // 現在の年月をデフォルトで取得
  const navigate = useNavigate();

  // 月ごとの集計を計算する関数
  const calculateSummary = (month) => {
    const allData = JSON.parse(localStorage.getItem("spendingData") || "{}");

    // 月別データをフィルタ
    const monthData = Object.keys(allData)
      .filter((date) => date.startsWith(month))
      .map((date) => allData[date]);

    const totals = {
      storeA: 0,
      storeB: 0,
      storeC: 0,
      total: 0,
    };

    // 月別データを集計
    monthData.forEach((data) => {
      totals.storeA += Number(data.storeA || 0);
      totals.storeB += Number(data.storeB || 0);
      totals.storeC += Number(data.storeC || 0);
    });

    totals.total = totals.storeA + totals.storeB + totals.storeC;

    setSummaryData(totals); // 集計結果をstateに保存
  };

  // ページが読み込まれたときに集計を計算
  useEffect(() => {
    calculateSummary(month);
  }, [month]);

  const goToCalendarPage = () => {
    navigate("/"); // カレンダーページに遷移
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{month} 月の集計</h2>
      <div>
        {summaryData ? (
          <>
            <div>コスモス: ¥{summaryData.storeA}</div>
            <div>マックス: ¥{summaryData.storeB}</div>
            <div>生協　　: ¥{summaryData.storeC}</div>
            <div>合計　　: ¥{summaryData.total}</div>
          </>
        ) : (
          <p>データがありません</p>
        )}
      </div>

      {/* 月切り替え用のボタン */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setMonth(dayjs(month).subtract(1, "month").format("YYYY-MM"))}>
          ← 前の月
        </button>
        <button onClick={() => setMonth(dayjs(month).add(1, "month").format("YYYY-MM"))}>
          次の月 →
        </button>
      </div>

      {/* カレンダーページに戻るボタン */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={goToCalendarPage}>カレンダーに戻る</button>
      </div>
    </div>
  );
}

export default SummaryPage;
