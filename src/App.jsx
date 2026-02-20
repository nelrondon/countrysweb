import { Navigate, Route, Routes } from "react-router-dom";
import { BuscadorComponent } from "./components/BuscadorComponent.jsx";
import { CountryInfo } from "./components/CountryInfo.jsx";
import { HomePage } from "./components/HomePage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:name" element={<CountryInfo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
