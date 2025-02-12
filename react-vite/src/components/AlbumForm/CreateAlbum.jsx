import AlbumForm from "./AlbumForm";

const CreateAlbum = () => {
  const album = {
    title: "",
    image_url: "",
    release_year: null,
  };

  return <AlbumForm album={album} formType="createAlbum" />;
};

export default CreateAlbum;
