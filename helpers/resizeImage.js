import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const resizeImage = async (imageUri, width = 200, height) => {
  const result = await manipulateAsync(
    imageUri,
    [{ resize: { width: width, height: height } }],
    {
      compress: 1,
      format: SaveFormat.PNG,
    }
  );
  return result.uri;
};

export default resizeImage;
