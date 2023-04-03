import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { GalUl } from './ImageGallery.styled';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '33668245-88b2d78a431fcfde02e20361a';

export class ImageGallery extends Component {
  state = {
    currentPage: 1,
    pictures: [],
    status: 'idle',
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { pictureFindName } = this.props;
    const { currentPage } = this.state;
    // якщо змінилось слово для пошуку картинок
    if (prevProps.pictureFindName !== pictureFindName) {
      this.setState({ currentPage: 1, pictures: [], status: 'pending' });
      fetch(`${API_URL}?key=${API_KEY}&q=${pictureFindName}&page=1&per_page=12`)
        .then(res => res.json())
        .then(data => {
          if (data.totalHits <= 0) {
            this.setState({ status: 'resolved' });
            return toast.error(
              `Sorry, we didn't find picture including ${pictureFindName}`
            );
          }
          this.setState({ pictures: data.hits, status: 'resolved' });
        })
        .catch(error => toast.error('Sorry, something wrong. Try again later'));
    }
    // якщо змінився номер сторінки (Load more)
    if (prevState.currentPage !== currentPage && currentPage !== 1) {
      this.setState({ status: 'pending' });
      fetch(
        `${API_URL}?key=${API_KEY}&q=${pictureFindName}&page=${currentPage}&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          if (data.totalHits < 12) {
            this.setState({ status: 'resolved' });
            return toast.warn(
              `Sorry, picture including ${pictureFindName} ended :(`
            );
          }

          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...data.hits],
            status: 'resolved',
          }));
        })
        .catch(error => toast.error('Sorry, something wrong. Try again later'));
    }
  }
  // збільшуємо номер сторінки
  onLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { pictures, status, currentPage } = this.state;

    return (
      <>
        {status === 'pending' && currentPage === 1 && <Loader />}
        {pictures.length > 0 && (
          <>
            <GalUl>
              {pictures.map(picture => {
                return (
                  <ImageGalleryItem
                    key={picture.id}
                    webformatURL={picture.webformatURL}
                  />
                );
              })}
            </GalUl>
            {status === 'resolved' && <LoadMoreBtn onClick={this.onLoadMore} />}
            {status === 'pending' && <Loader />}
          </>
        )}
      </>
    );
  }
}
