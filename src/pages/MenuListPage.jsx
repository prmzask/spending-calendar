// MenuListPage.jsx
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";

function MenuListPage() {
  const [menuList, setMenuList] = useState([]);
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const navigate = useNavigate();
  const location = useLocation(); // ← ページ遷移検知

  useEffect(() => {
    const allData = JSON.parse(localStorage.getItem("spendingData") || "{}");
    const list = [];

    for (let day = 1; day <= 31; day++) {
      const dateStr = `${month}-${String(day).padStart(2, "0")}`;
      const entry = allData[dateStr];
      if (entry?.menu) {
        list.push({ date: dateStr, menu: entry.menu });
      }
    }

    setMenuList(list);
  }, [month, location]); // ← location を依存にして再読み込み

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>{month} の献立一覧</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuList.map((item) => (
          <li key={item.date} style={{ marginBottom: "12px", borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>
            <strong>{item.date}</strong>: {item.menu}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setMonth(dayjs(month).subtract(1, "month").format("YYYY-MM"))}>
          ← 前の月
        </button>
        <button onClick={() => setMonth(dayjs(month).add(1, "month").format("YYYY-MM"))} style={{ marginLeft: "10px" }}>
          次の月 →
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/")}>カレンダーに戻る</button>
      </div>
    </div>
  );
}

export default MenuListPage;
