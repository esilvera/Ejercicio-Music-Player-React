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
		/* 		alert("Reproducir esta Canción"); */
		/* 		console.log(index); */
		setUltimaPosicion(index);
		let urlCompleta = baseUrl + musicaUrl;
		refAudio.current.src = urlCompleta;
		refAudio.current.play();
	}

	function pausar() {
		refAudio.current.pause();
	}
	function anterior() {
		alert("Canción Anterior");
	}
	function siguiente() {
		let siguientePosicion = ultimaPosicion + 1;

		console.log("siguiente posicion antes del if: " + siguientePosicion);
		if (
			siguientePosicion > musicas.length - 1
				? (siguientePosicion = 0)
				: ""
		);
		console.log("siguiente posicion despues: " + siguientePosicion);

		let siguienteCancion = musicas[siguientePosicion].url;
		reproducir(siguienteCancion, siguientePosicion);
	}
	return (
		<>
			<div>
				<h1>Music Player</h1>
				<ul>
					{musicas.length > 0 &&
						musicas.map((musica, index) => {
							return (
								<>
									<li
										key={index}
										onClick={() =>
											reproducir(musica.url, index)
										}>
										{musica.name}
									</li>
								</>
							);
						})}
				</ul>
				<h6 onClick={pausar}>Pausa</h6>
				<h6 onClick={anterior}>Anterior</h6>
				<h6 onClick={siguiente}>Siguiente</h6>
			</div>
			<audio ref={refAudio}></audio>
		</>
	);
}

export default Reproductor;
