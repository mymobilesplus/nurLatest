import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

export default class Searchbar extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        containerStyle={{backgroundColor: '#aa0114'}}
        inputStyle={{backgroundColor: '#aa0114', color: '#fff'}}
        // containerStyle={{backgroundColor: '#aa0114'}}
        // inputStyle={{color:'#fff', backgroundColor: '#aa0114'}}
        placeholderTextColor={'#fff'}
        inputContainerStyle={{ backgroundColor: '#aa0114' }}
        // style={{color:'#fff', backgroundColor: '#aa0114', padding: 0}}
        lightTheme
      />
    );
  }
}