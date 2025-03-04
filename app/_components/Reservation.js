import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin, user }) {
  const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(cabin.id);
  return (
    <div className="grid grid-cols-2 min-h-[400px] border border-primary-800">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} user={user} />
    </div>
  );
}

export default Reservation;
