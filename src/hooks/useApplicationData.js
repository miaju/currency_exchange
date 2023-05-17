import { useState, useEffect } from "react";
import axios from "axios";

// Handles state and getting data from apis
export default function useApplicationData() {
  const [state, setState] = useState({});

  useEffect(() => {
    getCountries();
  }, []);

  // gets list of countries from restcountries.com
  // WARNING!!!! API WILL SHUT DOWN AT END OF MAY 2023
  function getCountries() {
    return axios
      .get("https://restcountries.com/v3.1/all?fields=name,currencies")
      .then((res) => {
        const countries = res.data
          .filter((country) => Object.keys(country.currencies).length > 0)
          .sort(function (a, b) {
            if (a.name.common < b.name.common) {
              return -1;
            }
            if (a.name.common > b.name.common) {
              return 1;
            }
            return 0;
          });
        return setState({ ...state, countries });
      });
  }

  //gets of currency exhcange between the base currency (from) and the desired currency (to)
  function getRate(from, to) {
    return axios
      .get(
        `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EX_RATE_KEY}/latest/${from}`
      )
      .then((data) => {
        return data.data.conversion_rates[to];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //gets the FIRST currency listed in the currency list for the country
  // TO DO: allow choice for countries with multiple currencies
  function getCurrency(country) {
    return axios
      .get(`https://restcountries.com/v3.1/name/${country}?fields=currencies`)
      .then((data) => {
        data = data.data[0].currencies;
        const code = Object.keys(data)[0];
        return { ...data[code], code };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // converts base currency (from) to other at the given rate
  function convert(from, rate) {
    return from * rate;
  }

  //gets all the data using the above functions
  function findData(from_name, to_name, amount) {
    if (from_name && to_name && amount) {
      return getCurrency(to_name)
        .then((to) => {
          return getCurrency(from_name).then((from) => {
            return getRate(from.code, to.code).then((rate) => {
              const conversion = convert(amount, rate);
              return setState({
                ...state,
                to,
                from,
                to_name,
                from_name,
                conversion,
                rate,
                amount,
                errMes: null,
              });
            });
          });
        })
        .catch((error) => {
          console.log(error);
          return setState({ ...state, errMes: "Something went wrong" });
        });
    }
  }

  function setError() {
    return setState({
      ...state,
      errMes: "Please enter valid input for all required values",
    });
  }

  function setCountries(direction, country) {
    if (direction === "to") {
      console.log(state);
      return setState({ ...state, to: country });
    }
    if (direction === "from") {
      console.log(state);
      return setState({ ...state, from: country });
    }
    if (direction === "from_name") {
      console.log(state);
      return setState({ ...state, from_name: country });
    }
    if (direction === "to_name") {
      console.log(state);
      return setState({ ...state, to_name: country });
    }
  }

  function setAmount(amount) {
    return setState({ ...state, amount });
  }

  return {
    state,
    setCountries,
    findData,
    setError,
    setAmount,
  };
}
