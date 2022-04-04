const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const searchedMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  searchedMovies.forEach((movie) => {
    const movieElement = document.createElement('li');
    let movieText = movie.info.title + ' - ';
    for (const key in movie.info) {
      //iterate through the object nested in newMovie
      if (key !== 'title') {
        movieText = movieText + `${key}: ${movie.info[key]}, `;
      }
    }
    movieElement.textContent = movieText;
    // movieElement.textContent = movie.info.title; //.info is fron the nested object in new movie handler // I originally had both these textcontents in, mistakenly , and the second - title only, was overriding the first, as it was the last one triggered.
    movieList.append(movieElement);
  });
};

const addMovieHandler = () => {
  const favMovieLine = document.getElementById('title').value;
  const exInName = document.getElementById('extra-name').value;
  const exInValue = document.getElementById('extra-value').value;

  if (favMovieLine === '' || exInName === '' || exInValue === '') {
    return;
  }

  const newMovie = {
    info: {
      title: favMovieLine,
      [exInName]: exInValue,
    },
    id: Math.random(),
  };
  movies.push(newMovie);
  console.log(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const searchInput = document.getElementById('filter-title').value;
  renderMovies(searchInput);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
