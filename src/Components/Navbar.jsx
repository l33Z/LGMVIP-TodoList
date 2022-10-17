import ListAltIcon from "@material-ui/icons/ListAlt";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="heading">
          <ListAltIcon id="tlogo"/>
          Todo List
        </div>
      </nav>
    </>
  );
};

export default Navbar;
