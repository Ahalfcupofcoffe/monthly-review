const thermalFilmUrl = {
  movieUrl: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
  tvUrl: 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_hot/items',
  varietyUrl: 'https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items',
  bookUrl: "https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items",
  musicJapanUrl: "https://m.douban.com/rexxar/api/v2/subject_collection/music_japan_korea/items"
}
const filmDetailsUrl = {
  filmDetailUrl: "https://douban.uieee.com/v2/movie/subject/",
  bookDetailUrl: "https://douban.uieee.com/v2/book/",
  musicDetailUrl: "https://m.douban.com/rexxar/api/v2/elessar/subject/",
  shortCommentUrl: function(id){
    return {
      film: "https://douban.uieee.com/v2/movie/subject/"+id+"/comments",
      book: "https://m.douban.com/rexxar/api/v2/book/" + id + "/interests",
      music: "https://m.douban.com/rexxar/api/v2/music/" + id + "/interests",
      game: "https://m.douban.com/rexxar/api/v2/game/"+ id +"/interests"
    }
  },
}
const searchUrl = "https://m.douban.com/rexxar/api/v2/search";


//导出
exports.thermalFilmUrl = thermalFilmUrl;
exports.filmDetailsUrl = filmDetailsUrl;
exports.searchUrl = searchUrl;