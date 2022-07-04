import * as ImagePicker from "expo-image-picker";

const selectImage = async (setImageUri, setPhotoHasChanged) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      if (setPhotoHasChanged) {
        setPhotoHasChanged(true);
      }
    }
  } catch (e) {
    alert("Something went wrong. Please try again!");
    console.log(e);
  }
};

export default selectImage;
