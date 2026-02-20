import { useNavigate } from "react-router-dom";
import { Search } from "./Icons";
import { useRef } from "react";
import { useCountry } from "../context/CountryContext";
import { normalize } from "../utils/libs.js";

function BuscarCountry() {
  const inputRef = useRef(null);
  const { countries, setIsLoading } = useCountry();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const entry = inputRef.current.value;

    const pais = countries.find((country) => {
      const nameSpa = country.translations.spa.common;
      const nameEng = country.name.common;
      const cca3 = country.cca3;

      return (
        normalize(nameSpa) === normalize(entry) ||
        normalize(nameEng) === normalize(entry) ||
        normalize(cca3) === normalize(entry)
      );
    });

    if (!pais) {
      console.log("No se encontro el pais");
      return;
    }
    setIsLoading(true);
    const nameCountry = pais.translations.spa.common;
    navigate(`/country/${normalize(nameCountry)}`);
  };

  return (
    <form
      className="search-form"
      onClick={() => {
        inputRef.current.focus();
      }}
      onSubmit={handleSearch}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Ingrese un pais para empezar la busqueda."
      />
      <button>
        <Search />
      </button>
    </form>
  );
}
export default BuscarCountry;
