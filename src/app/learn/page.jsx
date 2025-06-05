import { Categories, Continent } from "@/components";
import { CategoryProvider } from "@/contexts";

export default function Learn() {
  return (
    <div className="container mx-auto px-4 lg:max-w-5xl">
      <Continent />
      <CategoryProvider>
        <Categories />
      </CategoryProvider>
      Learn Page
    </div>
  );
}
