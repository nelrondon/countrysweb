import { Navigate, Route, Routes } from "react-router-dom";
import { BuscadorComponent } from "./components/BuscadorComponent.jsx";
import { CountryInfo } from "./components/CountryInfo.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BuscadorComponent />} />
        <Route path="/country/:name" element={<CountryInfo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
