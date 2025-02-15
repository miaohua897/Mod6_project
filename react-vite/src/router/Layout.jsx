import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from '../context/Modal';
import { thunkAuthenticate } from '../redux/session';
import Navigation from '../components/Navigation/Navigation';
import * as albumActions from "../redux/albums";
import * as songActions from "../redux/songs";
import { getUserPlaylists, resetUserPlaylists } from '../redux/playlists';

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));

    dispatch(albumActions.thunkLoadAlbums());

    dispatch(songActions.getAllSongs());

    // dispatch(songActions.getCurrentAllSongs());

    dispatch(getUserPlaylists()).catch(async (res) => {
      const resError = await res.json();
      if (resError) {
        dispatch(resetUserPlaylists());
      }
    });
    
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        <Modal />
      </ModalProvider>
    </>
  );
}
