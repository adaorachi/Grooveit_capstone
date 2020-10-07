const filteredGenres = props => {
  const { musicArtist, genreFilter } = props;

  if (musicArtist) {
    return musicArtist.map(artist => {
      if (genreFilter === 'All') {
        return artist.filter(a => a.name === 'All')[0];
      }

      return artist.filter(a => a.name === genreFilter)[0];
    });
  }

  return [];
};

export default filteredGenres;
