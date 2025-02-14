import AlbumForm from "./AlbumForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditAlbum = () => {
  const { albumId } = useParams();
  const album = useSelector((state) => state.albums[albumId]);

  if (!album) return <h2>Loading...</h2>;

  return (
    <AlbumForm album={album} albumId={albumId} formType="editAlbum" />
  )
};

export default EditAlbum;
