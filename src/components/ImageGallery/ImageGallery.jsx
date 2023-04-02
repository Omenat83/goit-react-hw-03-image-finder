import { Component } from 'react';
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
  };

  componentDidUpdate(prevProps, prevState) {
    // якщо змінилось слово для пошуку картинок
    if (prevProps.pictureFindName !== this.props.pictureFindName) {
      this.setState({ currentPage: 1, pictures: [] });
      fetch(
        `${API_URL}?key=${API_KEY}&q=${this.props.pictureFindName}&page=${this.state.currentPage}&per_page=12`
      )
        .then(res => res.json())
        .then(data => this.setState({ pictures: data.hits }))
        .catch(error => console.log(error));
    }
    // якщо змінився номер сторінки (Load more)
    if (prevState.currentPage !== this.state.currentPage) {
      fetch(
        `${API_URL}?key=${API_KEY}&q=${this.props.pictureFindName}&page=${this.state.currentPage}&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...data.hits],
          }));
        });
    }

    console.log('this.state.pictures :>> ', this.state.pictures);
  }

  onLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    return (
      <>
        {this.state.pictures.length > 0 && (
          <>
            <GalUl>
              {this.state.pictures.map(picture => {
                return (
                  <ImageGalleryItem
                    key={picture.id}
                    webformatURL={picture.webformatURL}
                  />
                );
              })}
            </GalUl>
            <LoadMoreBtn onClick={this.onLoadMore} />
          </>
        )}
        <Loader />
      </>
    );
  }
}
