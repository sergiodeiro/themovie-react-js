import React, { Component } from 'react';
import logo from './assets/img/themovie.svg';
import './App.css';
import MovieRow from './components/movieRow'
import $ from 'jquery';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    // const movies = [
    //   { id: 0, poster_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg", title: "Avengers: Infinits Wars", overview: "Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco." },
    //   { id: 1, poster_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg", title: "Init: Infinits Wars", overview: " The Avengers...." }
    // ]

    // var movieRows = [];
    // movies.forEach((movie) => {
    //   console.log(movie.title);
    //   const movieRow = <MovieRow movie={movie}/>
    //   movieRows.push(movieRow)
    // })

    // this.state = { rows: movieRows }

    this.performSearch("avengers");

  }

  performSearch(searchTerm){
    
    const urlApi = "https://api.themoviedb.org/3/search/movie?query=avengers&api_key=843c7c86f44282f1b092dca4b0582700&query=" + searchTerm
    
    $.ajax({
      url: urlApi,
      success: (searchResults) => {
        //console.log("Fetched Sucess")
        const results = searchResults.results;
        //console.log(results[0]);

        var movieRows = [];

        results.forEach((movie)=> {
          movie.poster_src = "https://image.tmdb.org/t/p/w185/" + movie.poster_path
          
          //console.log(movie.title)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})

      },
      error: (xhr,status,err) => {
        console.log("ERROR FAILED")
      }
    })

  }

  searchChangerHandler(event){
      console.log(event.target.value)
      const boundObject = this
      const searchTerm = event.target.value
      boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div className="App">
        <table className="bar_menu">
          <tbody>
            <tr>
              <td>
                <img alt="logo_icon" width="50" src={logo} />
              </td>
              <td>
                <h3 className="title_bar">MoviesDB Search</h3>
              </td>
            </tr>
          </tbody>
        </table>
        <input className="inputSearch" onChange={this.searchChangerHandler.bind(this)} placeholder="Enter search term" />
        {this.state.rows}
      </div>
    );
  }
}

export default App;
