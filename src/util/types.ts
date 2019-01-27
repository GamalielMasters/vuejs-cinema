export interface Session {
	id: string;
	time: string;
	seats: number;
}

export interface Rating {
	Source: string;
	Value: string;
}


export interface Movie {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: Rating[];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
}

export interface MovieListing {
	id: string;
	movie: Movie;
	sessions: Session[];
}


export interface Filter {
	name: string;
	match( movie: MovieListing ) : boolean;
	match_session( sess: Session) : boolean;

}
