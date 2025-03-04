import SideNavigation from "../_components/SideNavigation";

function layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      {/* <div>
      </div> */}
      <div className="py-1">{children}</div>
    </div>
  );
}

export default layout;
