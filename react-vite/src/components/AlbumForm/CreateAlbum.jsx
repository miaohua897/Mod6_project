import AlbumForm from "./AlbumForm";

const CreateAlbum = () => {
  const album = {
    title: "",
    image_url: "",
    release_year: null,
  };

  return (
    <AlbumForm album={album} albumId={null} formType="createAlbum" />
  )
};

export default CreateAlbum;
