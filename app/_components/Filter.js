"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const buttonsStyles = "";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCapacityFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    //values: all, large, medium, small
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      {/* <button className={buttonsStyles} onClick={() => handleFilter("all")}>
        All Cabins
      </button>
      <button className={buttonsStyles} onClick={() => handleFilter("small")}>
        1&mdash;3
      </button>
      <button className={buttonsStyles} onClick={() => handleFilter("medium")}>
        4&mdash;7
      </button>
      <button className={buttonsStyles} onClick={() => handleFilter("large")}>
        8&mdash;12
      </button> */}
      <Button
        filter="all"
        activeCapacityFilter={activeCapacityFilter}
        handleFilter={handleFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        activeCapacityFilter={activeCapacityFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3
      </Button>
      <Button
        filter="medium"
        activeCapacityFilter={activeCapacityFilter}
        handleFilter={handleFilter}
      >
        4&mdash;7
      </Button>
      <Button
        filter="large"
        activeCapacityFilter={activeCapacityFilter}
        handleFilter={handleFilter}
      >
        8&mdash;12
      </Button>
    </div>
  );
}

function Button({ filter, activeCapacityFilter, handleFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeCapacityFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
