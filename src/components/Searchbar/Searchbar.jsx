import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Header, Form, Button, Span, Input } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    localInput: '',
  };

  // відслідковування input-a
  inputChange = ({ target: { value } }) => {
    this.setState({ localInput: value });
  };

  // передача значення зі стейту в App під час сабміту форми
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.localInput.trim() === '') {
      toast.warn('Enter something');
      return;
    }
    this.props.onSubmit(this.state.localInput);
    this.setState({ localInput: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <BiSearchAlt2 size="25px" />
            <Span>Search</Span>
          </Button>

          <Input
            type="text"
            name="localInput"
            value={this.state.localInput}
            onChange={this.inputChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
