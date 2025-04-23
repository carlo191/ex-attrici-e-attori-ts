type Person = {
  readonly id: number;
  readonly nome_completo: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
};
type Nationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese";

type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: Nationality;
};

function isActress(dati: unknown): dati is Actress {
  return (
    typeof dati === "object" &&
    dati !== null &&
    "id" in dati &&
    typeof dati.id === "number" &&
    "nome_completo" in dati &&
    typeof dati.nome_completo === "string" &&
    "birth_year" in dati &&
    typeof dati.birth_year === "number" &&
    "death_year" in dati &&
    typeof dati.birth_year === "number" &&
    "biography" in dati &&
    typeof dati.biography === "string" &&
    "image" in dati &&
    typeof dati.image === "string" &&
    "most_famous_movie" in dati &&
    dati.most_famous_movie instanceof Array &&
    dati.most_famous_movie.length === 3 &&
    dati.most_famous_movie.every((m) => typeof m === "string") &&
    "awards" in dati &&
    typeof dati.awards === "string" &&
    "nationality" in dati &&
    typeof dati.nationality === "string"
  );
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`
    );
    if (!response.ok) {
      return null;
    }
    const dati: unknown = await response.json();
    if (!isActress(dati)) {
      throw new Error("formato dati non valido");
    }
    return dati;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore:", error);
    } else {
      console.error("Errore sconosciuto", error);
    }
    return null;
  }
}
