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


export class CombinedFilter implements Filter {
    filters : Filter[] = [];

    add( filter: Filter ) {
        this.filters.push( filter );
    }

    remove( filter: Filter ){
        let index = this.filters.indexOf( filter );
        if (index > -1) {
            this.filters.splice( index, 1);
        }
    }

    get name() : string {
        return "Combined Filter Base-class"
    }

    match(movie: MovieListing): boolean {
        return false;
    }

    match_session(sess: Session): boolean {
        return false;
    }
}


export class CombinedAllFilter extends CombinedFilter {

    get name(): string{
        let inner = this.filters.map( a => { return a.name });
        return "All Of [" + inner.join( ", " ) + "]"
    }

    match( movie: MovieListing ) : boolean {
        // in the case of not having any filters, we act as a no-op... passing everything.
        if (this.filters.length === 0 ) {
            return true;
        }

        for( let filter of this.filters ) {
            // All filters must match to result in a match, so the first filter that does *not* match ends in a non-match.
            if (!filter.match(movie)) {
                return false;
            }
        }
        // All the filters matched.
        return true;
    }

    match_session(sess: Session): boolean {
        // in the case of not having any filters, we act as a no-op... passing everything.
        if (this.filters.length === 0 ) {
            return true;
        }

        for (let filter of this.filters) {
            if (!filter.match_session(sess)) {
                return false;
            }
        }
        return true;
    }
}


export class CombinedAnyFilter extends CombinedFilter {
    get name(): string{
        let inner = this.filters.map( a => { return a.name });
        return "Any Of [" + inner.join( ", " ) + "]"
    }

    match( movie: MovieListing ) : boolean {
        // in the case of not having any filters, we act as a no-op... passing everything.
        if (this.filters.length === 0 ) {
            return true;
        }

        for( let filter of this.filters ) {
            // Any filters may match, so the first filter that does match ends in a match.
            if (filter.match(movie)) {
                return true;
            }
        }
        // None of the filters matched.
        return false;
    }

    match_session(sess: Session): boolean {
        // in the case of not having any filters, we act as a no-op... passing everything.
        if (this.filters.length === 0 ) {
            return true;
        }

        for (let filter of this.filters) {
            if (filter.match_session(sess)) {
                return true;
            }
        }
        return false;
    }
}


export class DateFilter implements Filter {
    currentDay: Moment = moment.utc();

    get name() : string {
        return "Today";
    }

    match(movie: MovieListing): boolean {
        for( let session of movie.sessions ){
            if( this.match_session( session ) ) {
                return true;
            }
        }
        return false;
    }


    match_session(sess: Session): boolean {
        return moment.utc(sess.time).isSame( this.currentDay, 'day');
    }

    get Date() : Moment {
        return this.currentDay;
    }

    set Date( newDate: Moment ) {
        this.currentDay = newDate;
    }
}

export const GenreFilters = [
    new GenreFilter( "Animation", "Animation" ),
    new GenreFilter( "Comedy", "Comedy" ),
    new GenreFilter( "Crime", "Crime" ),
    new GenreFilter( "Documentary", "Documentary"),
    new GenreFilter( "Drama", "Drama"),
    new GenreFilter( "Fantasy", "Fantasy"),
    new GenreFilter( "Horror", "Horror")
];


export const TimeFilters = [
    new MatineeShowing(),
    new EveningShowing()
];


export const RatingFilters = [
    new RatingFilter( "G", "G" ),
    new RatingFilter( "PG", "PG"),
    new RatingFilter( "PG-13", "PG-13"),
    new RatingFilter( "R", "R" )
];