import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";

function Calendar({ year, month }) {
  const navigate = useNavigate();
  const startOfMonth = dayjs(`${year}-${month}-01`);
  const startDay = startOfMonth.day();
  const daysInMonth = startOfMonth.daysInMonth();

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const todayStr = dayjs().format("YYYY-MM-DD");
  const allData = JSON.parse(localStorage.getItem("spendingData") || "{}");

  return (
    <div className="calendar">
      <div className="calendar-header">
        {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
          <div key={d} className="calendar-cell header">
            {d}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {calendarDays.map((day, idx) => {
          const dateStr =
            day != null
              ? dayjs(`${year}-${month}-${String(day).padStart(2, "0")}`).format(
                  "YYYY-MM-DD"
                )
              : null;

          const spending = allData[dateStr];
          let total = 0;

          if (spending) {
            total += Number(spending.storeA || 0);
            total += Number(spending.storeB || 0);
            total += Number(spending.storeC || 0);
            total += Number(spending.storeD || 0); // ← 追加
          }
          

          const menu = spending?.menu;

          return (
            <div
              key={idx}
              className={`calendar-cell day ${dateStr === todayStr ? "today" : ""}`}
              onClick={() => day && navigate(`/detail/${dateStr}`)}
            >
              <div>{day}</div>

              {total !== 0 && (
                <div style={{ fontSize: "12px", marginTop: "4px", color: "#111" }}>
                  ¥{total.toLocaleString()}
                </div>
              )}

              {menu && (
                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "2px",
                    color: "#111",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%", // セルの横幅に合わせる
                  }}
                  title={menu}
                >
                  {menu}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
