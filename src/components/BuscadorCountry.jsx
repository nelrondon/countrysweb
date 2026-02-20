import { useNavigate } from "react-router-dom";
import { Search } from "./Icons";
import { useRef } from "react";
import { useCountry } from "../context/CountryContext";
import { normalize } from "../utils/libs.js";
import { useState } from "react";

function BuscarCountry() {
  const inputRef = useRef(null);
  const [error, setError] = useState(false);
  const { countries, setIsLoading } = useCountry();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const entry = inputRef.current.value;
    if (!entry) return;
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
      return setError(true);
    }
    setIsLoading(true);
    const nameCountry = pais.translations.spa.common;
    navigate(`/country/${normalize(nameCountry)}`);
  };

  const handleFocus = () => {
    setError(false);
    inputRef.current.focus();
  };

  return (
    <form
      className={`search-form ${error ? "error" : ""}`}
      onClick={handleFocus}
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
      <p className={`error ${error ? "" : "hidden"}`}>Pais no encontrado</p>
    </form>
  );
}
export default BuscarCountry;
