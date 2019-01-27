import {Filter, MovieListing, Session} from "./types";
import moment, {Moment} from 'moment-timezone';

class TimeFilter implements Filter {
    name: string;

    constructor( name: string ){
        this.name = name;
    }

    match( movie: MovieListing ) : boolean {
        for( let sess of movie.sessions ) {
            let time = moment.utc(sess.time);
            console.log( time.toString(), moment.utc().toString(), time.isSame(moment()));
            if (time.isSame( moment.utc(), 'day' ) && this.check_time(sess)) {
                return true;
            }
        }
        return false;
    }

    match_session(sess: Session): boolean {
        return this.check_time( sess )
    }

    check_time( sess: Session ) : boolean {
        return true;
    }

}


class MatineeShowing extends TimeFilter {

    readonly sixoclock: Moment = moment.utc( "6:00pm", "h:mma" );

    constructor() {
        super("Matinee");
    }

    check_time( sess: Session ) : boolean {
        return moment.utc(sess.time).isSameOrBefore( this.sixoclock );
    }
}


class EveningShowing extends TimeFilter {
    readonly sixoclock: Moment = moment.utc( "6:00pm", "h:mma" );

    constructor() {
        super( "Evening" );
    }

    check_time( sess: Session ) : boolean {
        return moment.utc(sess.time).isSameOrAfter(this.sixoclock );
    }
}


class GenreFilter implements Filter {
  name: string;
  genre: string;

  constructor( name: string, genre: string ) {
    this.name = name;
    this.genre = genre;
  }

  match( movie: MovieListing ) : boolean {
    return movie.movie.Genre.includes( this.genre );
  }

  match_session( sess: Session ) {
      return true;
  }
}


class RatingFilter implements Filter {
    name : string;
    rating: string;

    constructor( name: string, rating: string) {
        this.name = name;
        this.rating = rating;
    }

    match( movie: MovieListing ) : boolean {
        return movie.movie.Rated === this.rating;
    }

    match_session( sess: Session ) {
        return true;
    }
}

let GenreFilters = [
    new GenreFilter( "Animation", "Animation" ),
    new GenreFilter( "Comedy", "Comedy" ),
    new GenreFilter( "Crime", "Crime" ),
    new GenreFilter( "Documentary", "Documentary"),
    new GenreFilter( "Drama", "Drama"),
    new GenreFilter( "Fantasy", "Fantasy"),
    new GenreFilter( "Horror", "Horror")
];


let TimeFilters = [
    new MatineeShowing(),
    new EveningShowing()
];


let RatingFilters = [
    new RatingFilter( "G", "G" ),
    new RatingFilter( "PG", "PG"),
    new RatingFilter( "PG-13", "PG-13"),
    new RatingFilter( "R", "R" )
];

export { GenreFilters, TimeFilters, RatingFilters }