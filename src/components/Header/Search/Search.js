import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      search : ''
    }
    this.updateSearch = this.updateSearch.bind(this);
  }
  updateSearch(e){
    this.setState({search: e.target.value});
    if (e.target.value === ""){
      this.props.clearSearch();
    }
  

  }
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={this.updateSearch} placeholder="Search Your Feed" />

          <SearchIcon onClick={()=>this.props.search(this.state.search)}id="Search__icon" />
          
        </div>
        
      </section>
    )
  }
}