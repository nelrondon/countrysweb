import { useState } from "react";
import { CountryContext } from "./CountryContext";
import { useEffect } from "react";
import { getAll } from "../api/country";
import { Loading } from "../components/Loading";

export const CountryProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);

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
    console.log(isLoading);
  }, [isLoading]);

  return (
    <CountryContext.Provider
      value={{
        isLoading,
        setIsLoading,
        countries,
        setCountries,
      }}
    >
      <Loading />
      {children}
    </CountryContext.Provider>
  );
};
