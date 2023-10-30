import Sidebar from "./sidebar";

const LayoutDefault = ({ children }) => {
  return (
    <>
      <div className="flex overflow-auto">
        <Sidebar />
        <div className="w-full pl-22 md:pl-64">{children}</div>
      </div>
    </>
  );
};

export default LayoutDefault;
