import { Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import DetailPage from "./pages/DetailPage";
import SummaryPage from "./pages/SummaryPage";
import './components/Calendar.css'; // components フォルダにある場合
function App() {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="/detail/:date" element={<DetailPage />} />
      <Route path="/summary" element={<SummaryPage />} />
    </Routes>
  );
}

export default App;
