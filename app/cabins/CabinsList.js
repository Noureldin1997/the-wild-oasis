import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinsList({ filter }) {
  noStore();
  const cabins = await getCabins();
  let displayedCabins = cabins;
  if (filter == "all") displayedCabins = cabins;
  if (filter == "small")
    displayedCabins = displayedCabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter == "medium")
    displayedCabins = displayedCabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity < 8
    );
  if (filter == "large")
    displayedCabins = displayedCabins.filter((cabin) => cabin.maxCapacity >= 8);
  if (!displayedCabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinsList;
