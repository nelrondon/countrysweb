import { BorderCountry } from "./BorderCountry";
import { useCountryInfo } from "../hooks/useCountryInfo";
import { useParams } from "react-router-dom";
import { ArrowLeft, Globe, Home, Persons } from "./Icons";

export const CountryInfo = () => {
  const { name } = useParams();
  const { country, countries, handleBack, formatPopulation } =
    useCountryInfo(name);

  if (Object.keys(country).length > 0) {
    return (
      <section className="country-info">
        <button className="btn-back row" onClick={handleBack}>
          <ArrowLeft />
          Volver
        </button>
        <header>
          <img src={country.flags.svg} alt={country.flags.alt} />
          <div className="info">
            <h1>{country.translations.spa.common}</h1>
            <h4>Nombre Oficial: </h4>
            <p>{country.translations.spa.official}</p>
          </div>
        </header>
        <section>
          <div className="content">
            <div className="column">
              <h3>Capital:</h3>
              <p className="row">
                <Home />
                {country.capital}
              </p>
            </div>
            <div className="column">
              <h3>Region:</h3>
              <p className="row">
                <Globe /> {country.region}
              </p>
            </div>
            <div className="column">
              <h3>Población:</h3>
              <p className="row">
                <Persons />
                {formatPopulation(country.population)}
              </p>
            </div>
          </div>
          <h3>Fronteras:</h3>
          {!country.borders && <p>No tiene fronteras</p>}
          {country.borders && (
            <ul className="borders-list">
              {country.borders.map((border, index) => {
                const bddata = countries.find((c) => c.cca3 === border);
                return <BorderCountry key={index} country={bddata} />;
              })}
            </ul>
          )}
          <h3>Idiomas</h3>
          <ul className="languages-list">
            {Object.entries(country.languages).map(([key, lang], index) => {
              return <li key={index}>{`${lang} (${key})`}</li>;
            })}
          </ul>
        </section>
      </section>
    );
  }
};
