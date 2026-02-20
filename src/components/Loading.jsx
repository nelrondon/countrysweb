import { Reload } from "./Icons";
import { useCountry } from "../context/CountryContext";
import { useRef } from "react";
import { useEffect } from "react";

export const Loading = () => {
  const ref = useRef(null);
  const { isLoading } = useCountry();

  useEffect(() => {
    let timer = null;
    if (isLoading) {
      ref.current.classList.remove("hidden");
    } else {
      timer = setTimeout(() => {
        ref.current.classList.add("hidden");
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div ref={ref} className={`loading`}>
      <Reload />
      <p>Cargando...</p>
    </div>
  );
};
