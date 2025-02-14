import './LeftNavbarPlaylists.css';
import PlaylistSidebar from '../PlaylistSidebar/PlaylistSidebar';

export default function LeftNavbarPlaylists({ sessionUser }) {
  return (
    <>
      {sessionUser && <PlaylistSidebar />}
    </>
  );
}
