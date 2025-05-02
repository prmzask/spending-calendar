import { Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import DetailPage from "./pages/DetailPage";
import SummaryPage from "./pages/SummaryPage";
import MenuListPage from "./pages/MenuListPage"; // ← 献立一覧ページ
import './components/Calendar.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="/detail/:date" element={<DetailPage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/menu-list" element={<MenuListPage />} /> {/* ✅ これが必要 */}
    </Routes>
  );
}

export default App;
