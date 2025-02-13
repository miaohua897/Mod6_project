import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import LeftNavbar from './LeftNavbar';
import LoginFormModal from '../LoginFormModal';
import MusicPlayer from './MusicPlayer';
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import museicLogoIcon from './museic-logo-icon.png';
import './Navigation.css';

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <nav className="nav-container">
        <div className="museic-logo-div">
          <NavLink to="/">
            <img
              src={museicLogoIcon}
              className="museic-logo"
              alt="Museic Logo"
            />
          </NavLink>
        </div>
        <div className="nav-container-right">
          {isLoaded && !sessionUser && (
            <>
              <div className="sign-up-button">
                <OpenModalButton
                  modalComponent={<SignupFormModal />}
                  buttonText="Sign up"
                />
              </div>
              <div className="log-in-button">
                <OpenModalButton
                  modalComponent={<LoginFormModal />}
                  buttonText="Log in"
                />
              </div>
            </>
          )}
          {isLoaded && sessionUser && (
            <div className="profile-button">
              <ProfileButton />
            </div>
          )}
        </div>
      </nav>

      <main>
        <LeftNavbar isLoaded={isLoaded} sessionUser={sessionUser} />
        <div className="right-main-div">
          <Outlet />
        </div>
      </main>

      <MusicPlayer isLoaded={isLoaded} sessionUser={sessionUser} />
    </>
  );

  // ORIGINAL CODE:
  // return (
  //   <ul>
  //     <li>
  //       <NavLink to="/">Home</NavLink>
  //     </li>

  //     <li>
  //       <ProfileButton />
  //     </li>
  //   </ul>
  // );
}
