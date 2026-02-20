import { useCountry } from "../context/CountryContext.jsx";
import Buscador from "./BuscadorCountry";
import { Globe } from "./Icons.jsx";

export const BuscadorComponent = () => {
  const { countries } = useCountry();

  return (
    <section className="search-container">
      <header>
        <h1 className="title row">
          Buscador de Paises
          <Globe />
        </h1>
        <p>
          Datos disponibles de <b>{`+${countries.length} paises.`}</b>
        </p>
      </header>
      <Buscador />
    </section>
  );
};
