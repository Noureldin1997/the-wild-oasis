import LoginMessage from "@/app/_components/LoginMessage";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { auth } from "@/app/_lib/auth";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}

// // PLACEHOLDER DATA
// const cabin = {
//   id: 89,
//   name: "001",
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
//   image:
//     "https://potdtkbxhqtwimqfirpe.supabase.co/storage/v1/object/public/cabin-images//0.582509577273641-cabin-004.jpg",
// };

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = await cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  console.log(ids);
  return ids;
}

export default async function Page({ params }) {
  // await params;
  const cabin = await getCabin(await params.cabinId);
  const session = await auth();

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            className="object-cover"
            fill
            src={cabin.image}
            alt={`Cabin ${cabin.name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {cabin.name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{cabin.description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{cabin.maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-10 text-accent-400">
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>
      <Suspense fallback={<Spinner />}>
        {session?.user ? (
          <Reservation cabin={cabin} user={session.user} />
        ) : (
          <LoginMessage />
        )}
      </Suspense>
    </div>
  );
}
