import './navigation.style.scss'
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react"; //likes ng-container to help unnecessary dom build. tips: <></> Short Syntax
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

function Navigation() {
  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">SHOP</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
