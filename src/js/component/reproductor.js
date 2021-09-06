import { array } from "prop-types";
import React, { useRef, useState } from "react";

function Reproductor() {
	let refAudio = useRef(" ");
	let baseUrl = "https://assets.breatheco.de/apis/sound/";

	let [ultimaPosicion, setUltimaPosicion] = useState(0);

	const [musicas, setMusicas] = useState([
		{
			id: 1,
			category: "game",
			name: "Mario Castle",
			url: "files/mario/songs/castle.mp3"
		},
		{
			id: 2,
			category: "game",
			name: "Mario Star",
			url: "files/mario/songs/hurry-starman.mp3"
		},
		{
			id: 3,
			category: "game",
			name: "Mario Overworld",
			url: "files/mario/songs/overworld.mp3"
		}
	]);

	function reproducir(musicaUrl, index) {
		setUltimaPosicion(index);
		let urlCompleta = baseUrl + musicaUrl;
		refAudio.current.src = urlCompleta;
		refAudio.current.play();
	}

	function pausar() {
		refAudio.current.pause();
	}
	function anterior() {
		let siguientePosicion = ultimaPosicion - 1;
		if (
			siguientePosicion < 0
				? (siguientePosicion = musicas.length - 1)
				: ""
		);
		let siguienteCancion = musicas[siguientePosicion].url;
		reproducir(siguienteCancion, siguientePosicion);
	}
	function siguiente() {
		let siguientePosicion = ultimaPosicion + 1;
		if (
			siguientePosicion > musicas.length - 1
				? (siguientePosicion = 0)
				: ""
		);
		let siguienteCancion = musicas[siguientePosicion].url;
		reproducir(siguienteCancion, siguientePosicion);
	}
	return (
		<>
			<div>
				<h2>Music Player</h2>
				<h6>( Escoja canción a reproducir )</h6>
				<div className="container">
					<div className="row">
						<ul>
							{musicas.length > 0 &&
								musicas.map((musica, index) => {
									return (
										<>
											<li
												className="music"
												key={index}
												onClick={() =>
													reproducir(
														musica.url,
														index
													)
												}>
												{musica.name}
											</li>
										</>
									);
								})}
						</ul>
					</div>
				</div>
				<div className="footer">
					<a onClick={anterior}>
						<i className="fas fa-backward"></i>
					</a>
					<a onClick={pausar}>
						<i className="far fa-pause-circle"></i>
					</a>
					<a onClick={siguiente}>
						<i className="fas fa-forward"></i>
					</a>
				</div>
			</div>
			<audio ref={refAudio}></audio>
		</>
	);
}

export default Reproductor;
