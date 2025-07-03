import FrontendNavbar from "../components/FrontendNavbar";
import FrontendFooter from "../components/FrontendFooter";

const FrontendLayout = ({ children }) => {
  return (
    <>
      <div className="bg-white text-gray-900">
        <FrontendNavbar />
        <main>{children}</main>
        <FrontendFooter />
      </div>
    </>
  );
};

export default FrontendLayout;
