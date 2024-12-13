import React from "react";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import "./Netflix.css";
import axios from "axios";
import { getRandomId, getRandomType } from "../utils/helper";
import {
	imagePathOriginal,
	TYPE_MOVIE,
	apiKey,
	lang,
	API_URL,
} from "../config";

const NetflixHeader = ({ movie, type = TYPE_MOVIE }) => {
	const title = type === TYPE_MOVIE ? movie?.title : movie?.name;
	const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`;
	const banner = {
		backgroundImage: `url('${imageUrl}')`,
		backgroundSize: "cover",
		backgroundPosition: "center center",
		color: "white",
		objectFit: "contain",
		height: "448px",
	};
	if (!movie) {
		return <></>;
	}

	return (
		<header style={banner}>
			<div className="banner__contents">
				<h1 className="banner__title">{title ?? "..."}</h1>
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
	const [type] = React.useState(getRandomType());
	const defaultMovieId = getRandomId(type);
	const url = `https://api.themoviedb.org/3/${type}/${defaultMovieId}?api_key=${apiKey}&language=${lang}`;
	React.useEffect(() => {
		axios
			.get(url)
			.then((response) => setHeaderMovie(response))
			.catch((error) => console.error(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<NetflixAppBar />
			<NetflixHeader movie={headerMovie?.data} type={type} />
			<NetflixRow wideImage={false} title="Films Netflix" />
			<NetflixRow wideImage={true} title="Série Netflix" />
			<NetFlixFooter />
		</div>
	);
};
export { NetflixApp };
