import uuid from "react-native-uuid";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const uploadImage = async (type, imageUri) => {
  const storage = getStorage();
  if (imageUri === "") return;

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", imageUri, true);
    xhr.send(null);
  });

  if (!blob) return;

  const id = uuid.v4();
  const currentRef = `images/${type}/${id}`;

  const storageRef = ref(storage, currentRef);

  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert("Image upload was unsuccessful. Please try again.");
        reject(error);
      },
      () => {
        resolve(currentRef);
      }
    );
  });
};

export default uploadImage;
