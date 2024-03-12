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

const fetchData = async (url: string) => {
  const taskUrl:string = url;
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
  let sortedCountries: Country[];
  if (ascendingName) {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=name&_limit=20');
    ascendingName = false;
  } else {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=name&_order=desc&_limit=20');
    ascendingName = true;
  }
  updateCountryList(sortedCountries);
});

sortByCapital.addEventListener('click', async () => {
  let sortedCountries: Country[];
  if (ascendingCapital) {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=capital&_limit=20');
    ascendingCapital = false;
  } else {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=capital&_order=desc&_limit=20');
    ascendingCapital = true;
  }
  updateCountryList(sortedCountries);
});

sortByRegion.addEventListener('click', async () => {
  let sortedCountries: Country[];
  if (ascendingRegion) {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=region&_limit=20');
    ascendingRegion = false;
  } else {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=region&_order=desc&_limit=20');
    ascendingRegion = true;
  }
  updateCountryList(sortedCountries);
});

sortByLanguage.addEventListener('click', async () => {
  let sortedCountries: Country[];
  if (ascendingLanguage) {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=language.name&_limit=20');
    ascendingLanguage = false;
  } else {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=language.name&_order=desc&_limit=20');
    ascendingLanguage = true;
  }
  updateCountryList(sortedCountries);
});

sortByCurrency.addEventListener('click', async () => {
  let sortedCountries: Country[];
  if (ascendingCurrency) {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=currency.name&_limit=20');
    ascendingCurrency = false;
  } else {
    sortedCountries = await fetchData('http://localhost:3004/countries?_sort=currency.name&_order=desc&_limit=20');
    ascendingCurrency = true;
  }
  updateCountryList(sortedCountries);
});

const loadAllCardsFromDb = (countries: Promise<Country[] | any[]>) => {
  countries.then((entry: Country[]) => {
    entry.forEach((card: Country) => {
      addCountryElement(card);
    });
  });
};

searchInput.addEventListener('input', async (event) => {
  const searchValue = (event.target as HTMLInputElement).value;
  const filteredCountries: Country[] = await fetchData(`http://localhost:3004/countries?q=${searchValue}&_limit=20`);
  updateCountryList(filteredCountries);
});

loadAllCardsFromDb(fetchData('http://localhost:3004/countries?_limit=20'));
