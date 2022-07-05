import { ref, getStorage, listAll } from "firebase/storage";
import deleteStoredImage from "./deleteStoredImage";

const deleteImageDirectory = async (imageRef) => {
  try {
    const storage = getStorage();

    const desertRef = ref(storage, `${imageRef}/events`);

    listAll(desertRef).then((listResults) => {
      const promises = listResults.items.map((el) => {
        return deleteStoredImage(el._location.path_);
      });
      Promise.all(promises);
    });
  } catch (e) {
    consol.elog(e);
  }
};

export default deleteImageDirectory;
