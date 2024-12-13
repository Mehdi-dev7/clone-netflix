/* eslint-disable no-unused-vars */
import React from "react";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetflixFooter } from "./NetflixFooter";
import "./Netflix.css";
import axios from "axios";

const NetflixHeader = ({ movie }) => {
	// 🐶 si 'movie' n'est pas défini, retourne un fragment vide 🤖 <></>

	// 🐶 si 'movie' est défini, retourne le header
	const imageUrl = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;
	const banner = {
		backgroundImage: `url('${imageUrl}')`,
		backgroundSize: "cover",
		backgroundPosition: "center center",
		color: "white",
		objectFit: "contain",
		height: "450px",
	};
	if (!movie) {
		return <></>;
	}

	return (
		<header style={banner}>
			<div className="banner__contents">
				<h1 className="banner__title">{movie?.title ?? "..."}</h1>
				<div className="banner__buttons">
					<button className="banner__button banner__buttonplay">Lecture</button>
					<button className="banner__button banner__buttonInfo">
						Ajouter à ma liste
					</button>
				</div>
				<h1 className="synopsis">{movie?.overview ?? "..."}</h1>
			</div>
			<div className="banner--fadeBottom"></div>
		</header>
	);
};

const NetflixApp = () => {
	const [headerMovie, setHeaderMovie] = React.useState();
	const defaultMovieId = 399566;
	const apiKey = "4fc7b001e8a107fe1fddc6b41ed0f4af";
	const lang = "fr-fr";
	const url = `https://api.themoviedb.org/3/movie/${defaultMovieId}?api_key=${apiKey}&language=${lang}`;
	React.useEffect(() => {
		axios
			.get(url)
			.then((response) => setHeaderMovie(response))
			.catch((error) => console.error(error));
	}, [url]);

	return (
		<div>
			<NetflixAppBar />
			<NetflixHeader movie={headerMovie?.data} />
			<NetflixRow wideImage={false} title="Films Netflix" />
			<NetflixRow wideImage={true} title="Série Netflix" />
			<NetflixFooter />
		</div>
	);
};
export { NetflixApp };
