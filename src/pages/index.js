import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {useState} from "react";

export default function Home() {
	const [pokeImage, setPokeImage] = useState("");
	const [pokeName, setPokeName] = useState("");
	const [guess, setGuess] = useState("");

	const guessIsCorrect = () => {
		return pokeName.toLowerCase() === guess.toLowerCase();
	}

	const getNewPokemon = async () => {
		const getRandomPokemonNumber = () => {
			const maxPokemonNumber = 151;
			const number = Math.floor(Math.random() * maxPokemonNumber);
			return number === 0 ? 1 : number;
		};

		const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemonNumber());
		const pokemonData = await response.json();
		setPokeImage(pokemonData.sprites.front_default);
		setPokeName(pokemonData.name);
	};

	const altText = () => {
		return guessIsCorrect() ? pokeName : "Who's that pokemon?";
	};

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<main>
				<h1>Who's that pokemon</h1>
				<button onClick={getNewPokemon}>New pokemon</button>
				<img src={pokeImage} alt={altText()} className={`${styles.pokeImage} ${!guessIsCorrect() && styles.mask}`}/>
				<input value={guess} onChange={(e) => {setGuess(e.target.value)}}/>
			</main>
		</>
	);
}
