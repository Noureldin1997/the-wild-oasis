import Spinner from "../_components/Spinner";

function loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-2xl text-primary-200">Loading Cabins...</p>
    </div>
  );
}

export default loading;
