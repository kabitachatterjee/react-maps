import React, {Component} from 'react';

class SearchForm extends Component {
  constructor(props){
    // use Component's constructor
    super(props)
    // set initial state
    this.state = {
      search: ''
    }
  }

  onInputChange(event){
    this.setState({
      search : event.target.value
    }
    )
  }
  onFormSubmit(event){
  console.log('form submitted')
  // this line keeps the page from refreshing!
  event.preventDefault()
   let search = this.state.search
   this.props.searchParks(search)
  this.setState({
    search: ''
  })
}
  render(){
    return (
      <div className='searchForm'>
        <h2>Search Parks Here!</h2>
        <form onSubmit={event => this.onFormSubmit(event)}>
        <input
        onChange={event => this.onInputChange(event)}
        placeholder='Park Name ...'
        type='text'
        value={this.state.search} />
          <button type='submit'>Search</button>
        </form>
      </div>
    )
  }
}

export default SearchForm
