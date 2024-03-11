import axios from "axios";

const countryList = document.querySelector('.country-list');

type Country = {
  name: string;
  capital: string;
  population: number;
  region: string;
}

const fetchData = async () => {
  const taskUrl:string = 'http://localhost:3004/countries?_limit=20';
  let countries: Country[] = [];
  try {
    const response = await axios.get(taskUrl);
    response.data.forEach((element: Country) => {
      countries.push(element);
    });
    console.log('Tasks received successfully', response.data);
    return countries;
  } catch (error) {
    console.error('Failed to get tasks', error);
    return [];
  }
};

const addCountryElement = (newCountry: Country) => {
  let country = document.createElement('div');
  // const name = newCountry.name;
  country.className = 'country-list__country';
  country.innerHTML = `
    <p class="field">${newCountry.name}</p>
    <p class="field">Capital: ${newCountry.capital}</p>
    <p class="field">${newCountry.region}</p>`;
  countryList.append(country);
};

const loadAllCardsFromDb = (countries: Promise<Country[] | any[]>) => {
  countries.then((countries: Country[]) => {
    countries.forEach((card: Country) => {
      addCountryElement(card);
    });
  });
};

loadAllCardsFromDb(fetchData());
