import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from '../../redux/session';

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector(store => store.session.user);
  const ulRef = useRef();

  const toggleMenu = e => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = e => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle
          style={{ width: '100%', height: 'auto' }}
          className="profile-button-icon"
        />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          <li>
            <div>{user.username}</div>
            <div>{user.email}</div>
          </li>
          <li onClick={logout} className="log-out-button">
            Log out
          </li>
        </ul>
      )}
    </>
  );

  // ORIGINAL CODE:
  // return (
  //   <>
  //     <button onClick={toggleMenu}>
  //       <FaUserCircle />
  //     </button>
  //     {showMenu && (
  //       <ul className={"profile-dropdown"} ref={ulRef}>
  //         {user ? (
  //           <>
  //             <li>{user.username}</li>
  //             <li>{user.email}</li>
  //             <li>
  //               <button onClick={logout}>Log Out</button>
  //             </li>
  //           </>
  //         ) : (
  //           <>
  //             <OpenModalMenuItem
  //               itemText="Log In"
  //               onItemClick={closeMenu}
  //               modalComponent={<LoginFormModal />}
  //             />
  //             <OpenModalMenuItem
  //               itemText="Sign Up"
  //               onItemClick={closeMenu}
  //               modalComponent={<SignupFormModal />}
  //             />
  //           </>
  //         )}
  //       </ul>
  //     )}
  //   </>
  // );
}

export default ProfileButton;
