import * as ImagePicker from "expo-image-picker";

const selectImage = async (setImageUri) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  } catch (e) {
    alert("Something went wrong. Please try again!");
    console.log(e);
  }
};

export default selectImage;
