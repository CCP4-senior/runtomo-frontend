import { deleteObject, ref, getStorage } from "firebase/storage";

const deleteStoredImage = async (imageRef) => {
  const storage = getStorage();

  const desertRef = ref(storage, imageRef);

  deleteObject(desertRef)
    .then(() => {
      console.log("Image is deleted successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default deleteStoredImage;
