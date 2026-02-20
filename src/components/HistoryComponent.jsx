import { useCountry } from "../context/CountryContext";
import { useNavigate } from "react-router-dom";
import { normalize } from "../utils/libs";

export function HistoryComponent() {
  const { history } = useCountry();
  const navigate = useNavigate();
  const handleClick = (country) => {
    navigate(`/country/${normalize(country)}`);
  };

  return (
    <section className="history-container">
      <h4 className="title">Historial de busquedas ({history.length})</h4>
      <ul className="history-list">
        {history.length === 0 && <p>No hay búsquedas recientes</p>}
        {history.map((country, index) => (
          <li
            key={index}
            className="history-item"
            onClick={() => {
              handleClick(country.name);
            }}
          >
            <img src={country.flags.svg} alt={country.flags.alt} />
            <p>{country.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
