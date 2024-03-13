import axios from 'axios';

const countryList = document.querySelector('.country-list');
const searchInput = document.querySelector('.search-bar');
const allSortButtons = document.querySelectorAll('.btn');
const sortByName = allSortButtons[0];
const sortByCapital = allSortButtons[1];
const sortByRegion = allSortButtons[2];
const sortByLanguage = allSortButtons[3];
const sortByCurrency = allSortButtons[4];

// Sort button that sorts ascending, but if clicked again, sorts descending

let ascendingName: boolean;
let ascendingCapital: boolean;
let ascendingRegion: boolean;
let ascendingLanguage: boolean;
let ascendingCurrency: boolean;

let currentDisplayedCountryAmount = 20;
let searchQuery = '';
let sortOrder = '';

type Country = {
  name: string;
  capital: string;
  region: string;
  language: {
    name: string;
    code: string;
  };
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
}

const addCountryElement = (newCountry: Country) => {
  const country = document.createElement('div');
  // const name = newCountry.name;
  country.className = 'country-list__country';
  country.innerHTML = `
    <p class="field">${newCountry.name}</p>
    <p class="field">${newCountry.capital}</p>
    <p class="field">${newCountry.region}</p>
    <p class="field">${newCountry.language.name}</p>
    <p class="field">${newCountry.currency.name}</p>`;
  countryList.append(country);
};

const updateCountryList = (countries: Country[]) => {
  countryList.innerHTML = '';
  countries.forEach((country: Country) => {
    addCountryElement(country);
  });
};

const fetchData = async (url: string, sort?: string) => {
  const taskUrl:string = sort ? `${url}&${sort}` : url; // Append sort parameter if provided
  const countries: Country[] = [];
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

sortByName.addEventListener('click', async () => {
  sortOrder = ascendingName ? '_sort=name' : '_sort=name&_order=desc';
  ascendingName = !ascendingName;
  const url = `http://localhost:3004/countries?_limit=${currentDisplayedCountryAmount}&q=${searchQuery}&${sortOrder}`;
  const sortedCountries: Country[] = await fetchData(url);
  updateCountryList(sortedCountries);
});

sortByCapital.addEventListener('click', async () => {
  sortOrder = ascendingCapital ? '_sort=capital' : '_sort=capital&_order=desc';
  ascendingCapital = !ascendingCapital;
  const url = `http://localhost:3004/countries?_limit=${currentDisplayedCountryAmount}&q=${searchQuery}&${sortOrder}`;
  const sortedCountries: Country[] = await fetchData(url);
  updateCountryList(sortedCountries);
});

sortByRegion.addEventListener('click', async () => {
  sortOrder = ascendingRegion ? '_sort=region' : '_sort=region&_order=desc';
  ascendingRegion = !ascendingRegion;
  const url = `http://localhost:3004/countries?_limit=${currentDisplayedCountryAmount}&q=${searchQuery}&${sortOrder}`;
  const sortedCountries: Country[] = await fetchData(url);
  updateCountryList(sortedCountries);
});

sortByLanguage.addEventListener('click', async () => {
  sortOrder = ascendingLanguage ? '_sort=language.name' : '_sort=language.name&_order=desc';
  ascendingLanguage = !ascendingLanguage;
  const url = `http://localhost:3004/countries?_limit=${currentDisplayedCountryAmount}&q=${searchQuery}&${sortOrder}`;
  const sortedCountries: Country[] = await fetchData(url);
  updateCountryList(sortedCountries);
});

sortByCurrency.addEventListener('click', async () => {
  sortOrder = ascendingCurrency ? '_sort=currency.name' : '_sort=currency.name&_order=desc';
  ascendingCurrency = !ascendingCurrency;
  const url = `http://localhost:3004/countries?_limit=${currentDisplayedCountryAmount}&q=${searchQuery}&${sortOrder}`;
  const sortedCountries: Country[] = await fetchData(url);
  updateCountryList(sortedCountries);
});

const loadAllCardsFromDb = (countries: Promise<Country[] | any[]>) => {
  countries.then((entry: Country[]) => {
    entry.forEach((card: Country) => {
      addCountryElement(card);
    });
  });
};

const threshold = 1;

document.addEventListener('scroll', async () => {
  if (window.innerHeight + window.pageYOffset + threshold >= document.body.offsetHeight) {
    currentDisplayedCountryAmount += 20;
    const url = `http://localhost:3004/countries?_limit=${currentDisplayedCountryAmount}&q=${searchQuery}&${sortOrder}`;
    const filteredCountries: Country[] = await fetchData(url);
    updateCountryList(filteredCountries);
  }
});

searchInput.addEventListener('input', async (event) => {
  searchQuery = (event.target as HTMLInputElement).value;
  const url = `http://localhost:3004/countries?_limit=${currentDisplayedCountryAmount}&q=${searchQuery}&${sortOrder}`;
  const filteredCountries: Country[] = await fetchData(url);
  updateCountryList(filteredCountries);
});

loadAllCardsFromDb(fetchData(`http://localhost:3004/countries?_limit=${currentDisplayedCountryAmount}`));
