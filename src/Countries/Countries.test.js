import React from "react";
import notFound from "../assets/image/404.png";

const countryURL = "https://restcountries.com/v3.1/name/";

class Countries extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { name: "sia", countries: [] };
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = this.state.name;

    fetch(`${countryURL}${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        this.setState({ countries: data });
      })
      .catch((error) => {
        this.setState({ countries: undefined });
        console.log(error);
      });
  }

  render() {
    const countryName = this.state.name;
    const countryData = this.state.countries;
    return (
      <>
        <div className="container">
          <FormCountry onSubmit={this.handleSubmit} onChange={this.handleChange} name={countryName} />
        </div>

        <div className="container">
          <div className="row">
            {countryData ? (
              countryData.map((country) => {
                return <CountryDetail key={country.cca3} {...country} />;
              })
            ) : (
              <DataNotFound />
            )}
          </div>
        </div>
      </>
    );
  }
}

const FormCountry = (props) => {
  const { onSubmit, onChange, name } = props;
  return (
    <>
      <h3 className="text-center mt-4">Search Country Test</h3>

      <div className="row mt-3 d-flex justify-content-center">
        <div className="col-md-4">
          <form onSubmit={onSubmit}>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Country Name" value={name} onChange={onChange} />
              <button className="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

function CountryDetail({ cca3, name, flags, flag }) {
  return (
    <div className="col-md-4 mt-5 mb-2">
      <div className="card mb-3 border-dark">
        <div className="row g-0">
          <div className="col-lg-6">
            <img src={flags.png} className="img-fluid rounded-start" alt={flag} style={{ height: "125px", width: "100%" }} />
          </div>
          <div className="col-lg-6">
            <div className="card-body text-dark">
              <h5 className="card-title">{name.common}</h5>
              <p className="card-text">
                <small className="text-muted">{cca3}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DataNotFound = () => {
  return (
    <div className="text-center mt-5">
      <img src={notFound} className="rounded" alt="Not Found" style={{ width: "300px" }} />
      <p className="fs-5 fw-lighter">Data not found</p>
    </div>
  );
};

export default Countries;
