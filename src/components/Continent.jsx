import { ArrowUpDownIcon } from "@/assets/icons/ArrowUpDownIcon";

const Continent = () => {
  return (
    <div className="container mx-auto px-4 lg:max-w-5xl flex justify-between items-center m-2 p-4 shadow-md rounded-sm border">
      <h2>Select continent / Global</h2>
      <ArrowUpDownIcon />
    </div>
  );
};

export default Continent;
