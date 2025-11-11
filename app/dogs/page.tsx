import { getDogs } from "../utils/getDog";
import DogList from "./components/DogList";

export default async function Home() {
const dogs = await getDogs({ limit: 30, page: 1 });

  return (
    <main className="container mx-auto px-4 py-8">
      <DogList dogs={dogs} />
    </main>
  );
}


