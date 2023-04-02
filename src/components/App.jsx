import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Div } from './App.styled';

export class App extends Component {
  state = {
    pictureName: '',
  };

  // передача значення інпуту з Searchbar під час сабміту форми
  onFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  render() {
    return (
      <Div>
        <ToastContainer autoClose={2500} />
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery pictureFindName={this.state.pictureName} />
      </Div>
    );
  }
}
