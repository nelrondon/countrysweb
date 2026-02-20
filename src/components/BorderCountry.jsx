import { useNavigate } from "react-router-dom";

export const BorderCountry = ({ country }) => {
  const navigate = useNavigate();

  if (!country) return null;

  const nameSpa = country.translations.spa.common;
  const { png: flag, alt } = country.flags;

  const handleSearchBorder = () => {
    navigate(`/country/${String(nameSpa).toLowerCase()}`);
  };

  return (
    <li className="border-country" onClick={handleSearchBorder}>
      <img src={flag} alt={alt} />
      <p>{nameSpa}</p>
    </li>
  );
};
