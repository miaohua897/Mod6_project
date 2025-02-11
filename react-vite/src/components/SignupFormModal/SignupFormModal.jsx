import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkSignup } from '../../redux/session';
import museicLogoIcon from './museic-logo-icon.png';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [artistName, setArtistName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          'Confirm Password field must be the same as the Password field',
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        artist_name: artistName,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <img
        src={museicLogoIcon}
        className="signup-modal-museic-logo"
        alt="Museic Logo"
      />
      <h1 className="signup-modal-h1">Sign up to start listening</h1>
      {errors.server && <p className="signup-modal-error">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-modal-form">
        <label className="signup-modal-label">
          Email
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            required
            className="signup-modal-input"
          />
          {errors.email && <p className="signup-modal-error">{errors.email}</p>}
        </label>
        <label className="signup-modal-label">
          Username
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            required
            className="signup-modal-input"
          />
          {errors.username && (
            <p className="signup-modal-error">{errors.username}</p>
          )}
        </label>
        <label className="signup-modal-label">
          Artist Name
          <input
            type="text"
            value={artistName}
            placeholder="Artist Name"
            onChange={e => setArtistName(e.target.value)}
            required
            className="signup-modal-input"
          />
          {errors.artistName && (
            <p className="signup-modal-error">{errors.artistName}</p>
          )}
        </label>
        <label className="signup-modal-label">
          Password
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
            className="signup-modal-input"
          />
          {errors.password && (
            <p className="signup-modal-error">{errors.password}</p>
          )}
        </label>
        <label className="signup-modal-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="signup-modal-input"
          />
          {errors.confirmPassword && (
            <p className="signup-modal-error">{errors.confirmPassword}</p>
          )}
        </label>
        <button type="submit" className="signup-modal-button">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
