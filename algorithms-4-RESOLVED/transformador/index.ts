type Input = {
  nombres: string[];
  edades: number[];
};

type Output = {
  id: number;
  nombre: string;
  edad: number;
};

export default function transformador(input: Input): Output[] {
  return [...input.edades].map((edad, i) => {
    return {
      id: i + 1,
      nombre: input.nombres[i],
      edad: input.edades[i],
    };
  });
}
