import { useCountry } from "../context/CountryContext.jsx";
import Buscador from "./BuscadorCountry";
import { Globe } from "./Icons.jsx";

export const BuscadorComponent = () => {
  const { countries } = useCountry();

  return (
    <section className="search-container">
      <header>
        <h1 className="title row">
          <Globe />
          Buscador de Paises
        </h1>
        <p>Contamos con +{countries.length} países a buscar.</p>
      </header>
      <Buscador />
    </section>
  );
};
