import React, { useState } from "react";
import dataNotExist from "../assets/image/404.png";

const countryURL = "https://restcountries.com/v3.1/name/";

const Countries = () => {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCountry = async (link) => {
    try {
      const response = await fetch(link);
      const data = await response.json();

      if (response.status == 404) {
        setCountries();
      } else {
        setCountries(data);
        setIsLoading(false);
        console.log(data);
      }
    } catch (error) {
      setCountries([]);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name) {
      setIsLoading(true);
      fetchCountry(`${countryURL}${name}`);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const isExist = (data) => {
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {/* harus passing pake onChange onSubmit, pas dicoba pake nama custom malah jadi read-only input-nya */}
      <Form value={name} onChange={handleChange} onSubmit={handleSubmit} />

      {isExist(countries) ? (
        countries.map((country) => {
          return <Country key={country.cca3} {...country} />;
        })
      ) : (
        <NotFound />
      )}
    </>
  );
};

const Form = (props) => {
  const { value, onChange, onSubmit } = props;
  return (
    <div className="container">
      <h3 className="text-center mt-4">Search Country</h3>

      <div className="row mt-3 d-flex justify-content-center">
        <div className="col-lg-4">
          <form onSubmit={onSubmit}>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Country Name" value={value} onChange={onChange} />
              <button className="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Country = ({ name, cca3, flags, flag }) => {
  return (
    <React.Fragment>
      <p>{name.common}</p>
      <p>{cca3}</p>
      <img src={flags.png} alt={flag} />
    </React.Fragment>
  );
};

const NotFound = () => {
  return (
    <div className="text-center">
      <img src={dataNotExist} className="rounded" alt="Not Found" style={{ width: "300px" }} />
      <p className="fs-5 fw-lighter">Data not found</p>
    </div>
  );
};

export default Countries;
