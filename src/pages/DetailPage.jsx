import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function DetailPage() {
  const { date } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    storeA: "",
    storeB: "",
    storeC: "",
    menu: "", // ← ここに献立を追加
  });

  // 保存済みデータの読み込み
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("spendingData") || "{}");
    if (saved[date]) {
      setData({
        storeA: saved[date].storeA || "",
        storeB: saved[date].storeB || "",
        storeC: saved[date].storeC || "",
        menu: saved[date].menu || "", // ← 献立も読み込み
      });
    }
  }, [date]);

  // 入力変更時
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...data,
      [name]: value,
    };
    setData(updated);

    // 保存
    const allData = JSON.parse(localStorage.getItem("spendingData") || "{}");
    allData[date] = updated;
    localStorage.setItem("spendingData", JSON.stringify(allData));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{date} の支出と献立</h2>
      <div>
        <label>
          コスモス: ¥
          <input
            type="number"
            name="storeA"
            value={data.storeA}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "40px",
              fontSize: "16px",
              padding: "8px",
              marginBottom: "10px",
            }}
          />
        </label>
      </div>
      <div>
        <label>
          マックス: ¥
          <input
            type="number"
            name="storeB"
            value={data.storeB}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "40px",
              fontSize: "16px",
              padding: "8px",
              marginBottom: "10px",
            }}
          />
        </label>
      </div>
      <div>
        <label>
          生協　　: ¥
          <input
            type="number"
            name="storeC"
            value={data.storeC}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "40px",
              fontSize: "16px",
              padding: "8px",
              marginBottom: "10px",
            }}
          />
        </label>
      </div>
      <div>
        <label>
          献立　　　:
          <input
            type="text"
            name="menu"
            value={data.menu}
            onChange={handleChange}
            placeholder="例：ラーメン"
            style={{
              width: "100%",
              height: "40px",
              fontSize: "16px",
              padding: "8px",
              marginBottom: "20px",
            }}
          />
        </label>
      </div>
      <button onClick={() => navigate("/")}>← カレンダーに戻る</button>
    </div>
  );
}

export default DetailPage;
