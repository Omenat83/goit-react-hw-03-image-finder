import { Li, Image } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ webformatURL }) => {
  return (
    <Li>
      <Image src={webformatURL} alt="" />
    </Li>
  );
};
