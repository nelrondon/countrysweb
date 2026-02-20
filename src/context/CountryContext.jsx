import { createContext, useContext } from "react";

export const CountryContext = createContext();

export const useCountry = () => useContext(CountryContext);
