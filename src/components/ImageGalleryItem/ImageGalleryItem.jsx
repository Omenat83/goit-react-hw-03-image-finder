import PropTypes from 'prop-types';
import { Li, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, id }) => {
  return (
    <Li>
      <Image src={webformatURL} id={id} alt="" />
    </Li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
