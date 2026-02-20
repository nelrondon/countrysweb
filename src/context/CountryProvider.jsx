import { useState } from "react";
import { CountryContext } from "./CountryContext";
import { useEffect } from "react";
import { getAll } from "../api/country";
import { Loading } from "../components/Loading";

export const CountryProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("history")) || [];
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getAll();
        setCountries(res.data);
      } catch (error) {
        console.error("Error al obtener países:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <CountryContext.Provider
      value={{
        isLoading,
        setIsLoading,
        countries,
        setCountries,
        history,
        setHistory,
      }}
    >
      <Loading />
      {children}
    </CountryContext.Provider>
  );
};
