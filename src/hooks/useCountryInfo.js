import { useEffect } from "react";
import { getByName } from "../api/country";
import { useState } from "react";
import { useCountry } from "../context/CountryContext";
import { useNavigate } from "react-router-dom";
import { normalize } from "../utils/libs";

export const useCountryInfo = (name) => {
  const { countries, setIsLoading, setHistory } = useCountry();
  const [country, setCountry] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      setIsLoading(true);
      setCountry({});
      try {
        const pais = countries.find((c) => {
          return normalize(c.translations.spa.common) === normalize(name);
        });
        if (!pais) return;
        const { data } = await getByName(pais.name.common);
        const paisData = data.find((c) => {
          return normalize(c.translations.spa.common) === normalize(name);
        });
        setCountry(paisData);
        const log = {
          name: paisData.translations.spa.common,
          flags: paisData.flags,
        };
        setHistory((prev) => {
          const lastOne = prev[0];
          if (lastOne.name === log.name) return prev;
          const prevSet = prev.filter((c) => log.name !== c.name);
          return [log, ...prevSet];
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountry();
  }, [name, countries]);

  const handleBack = () => {
    navigate("/");
  };

  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return {
    countries,
    country,
    navigate,
    handleBack,
    formatPopulation,
  };
};
