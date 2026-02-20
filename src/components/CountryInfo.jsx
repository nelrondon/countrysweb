import { BorderCountry } from "./BorderCountry";
import { useCountryInfo } from "../hooks/useCountryInfo";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  GlobeAmericas,
  GlobeAsia,
  GlobeEurope,
  Home,
  Persons,
} from "./Icons";

const Widget = ({ icon, caption, value }) => {
  return (
    <div className="column">
      <h3>{caption}</h3>
      <p className="row">
        {icon}
        {value}
      </p>
    </div>
  );
};

export const CountryInfo = () => {
  const { name } = useParams();
  const { country, countries, handleBack, formatPopulation } =
    useCountryInfo(name);

  const getContinentIcon = () => {
    const continents = country.region;
    if (continents.includes("Europe") || continents.includes("Africa")) {
      return <GlobeEurope />;
    }
    if (continents.includes("Asia") || continents.includes("Australia")) {
      return <GlobeAsia />;
    }
    return <GlobeAmericas />;
  };

  if (Object.keys(country).length > 0) {
    return (
      <section className="country-info">
        <button className="btn-back row" onClick={handleBack}>
          <ArrowLeft />
          Volver
        </button>
        <header>
          <div className="imgs">
            <img
              className="bandera"
              src={country.flags.svg}
              alt={country.flags.alt}
            />
            <img
              className="escudo"
              src={country.coatOfArms.svg}
              alt={country.coatOfArms.alt}
            />
          </div>
          <div className="info">
            <h1>{country.translations.spa.common}</h1>
            <span>
              <h4>Nombre Oficial: </h4>
              <p>{country.translations.spa.official}</p>
            </span>
          </div>
        </header>
        <section>
          <div className="content">
            <Widget icon={<Home />} caption="Capital" value={country.capital} />
            <Widget
              icon={getContinentIcon()}
              caption="Región"
              value={country.region}
            />
            <Widget
              icon={<Globe />}
              caption="Continente"
              value={country.continents[0]}
            />
            <Widget
              icon={<Persons />}
              caption="Población"
              value={formatPopulation(country.population)}
            />
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
          <h3>Idiomas:</h3>
          <ul className="languages-list">
            {Object.entries(country.languages).map(([key, lang], index) => {
              return (
                <li key={index}>
                  <p>{`${lang} (${key})`}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    );
  }
};
