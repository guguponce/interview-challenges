type Registry = {
  firstName: string;
  lastName: string;
  country: string;
  continent: string;
  age: number;
  language: string;
};

export default function continentesRepresentados(array: Registry[]): boolean {
  let continents: string[] = [];
  array.forEach((user) => {
    !continents.includes(user.continent) && continents.push(user.continent);
  });
  return continents.length === 5;
}
