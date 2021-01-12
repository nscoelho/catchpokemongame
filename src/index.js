import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';


function App() {
  const [pokedex, setPokedex] = useState([])
  const [wildPokemon, setWildPokemon] = useState({})
  const [pokemonData, setPokemonData] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    spattack: "",
    spdefense: "",
    speed: "",
    type: "",
  });

  useEffect(() => {
    encounterWildPokemon()
  }, [])

  const pokeId = () => {
    const min = Math.ceil(1)
    const max = Math.floor(893)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const encounterWildPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeId())
    .then(response => {
      console.log(response.data);
      setWildPokemon(response.data);
      setPokemonData({

        name: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        spattack: response.data.stats[3].base_stat,
        spdefense: response.data.stats[4].base_stat,
        speed: response.data.stats[5].base_stat,
        type: response.data.types[0].type.name,
      });
    })
  }

  const catchPokemon = (pokemon) => {
    setPokedex(state => {
      const monExists = (state.filter(p => pokemon.id === p.id).length > 0);

      if (!monExists) {
        state = [...state, pokemon]
        state.sort(function (a, b) {
          return a.id - b.id
        })
      }
      return state
    })
    encounterWildPokemon()
  }

  const releasePokemon = id => {
    setPokedex(state => state.filter(p => p.id !== id))
  }
  return <div className="app-wrapper">
    <header>
      <h1 className="title">POKEMON</h1>
      <h3 className="subtitle">Catch A Random Pokemon</h3>
      <h6> THERE ARE 893 POKEMON TO CATCH</h6>
    </header>

    <section className="wild-pokemon">
      <h2>Wild Encounter</h2>
      <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
      + wildPokemon.id + ".png"} className="sprite" alt="Pokemon"></img>
      <h3>{wildPokemon.name}</h3>
      {/* <h1>{pokemonData.name}</h1>
        <img src={pokemonData.img} alt="Pokemon"/> */}
        <h4>Type: {pokemonData.type}</h4>
        <h3 style={{ fontSize: "13px"}}> BASE STATS: </h3>
        <h4>HP: {pokemonData.hp}</h4>
        <h4>Attack: {pokemonData.attack}</h4>
        <h4>Defense: {pokemonData.defense}</h4>
        <h4>Special Attack: {pokemonData.spattack}</h4>
        <h4>Special Defense: {pokemonData.spdefense}</h4>
        <h4>Speed: {pokemonData.speed}</h4>
      <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button>
    </section>

    <section className="pokedex">
      <h2>Pokédex</h2>
      <div className="pokedex-list">
        {pokedex.map(pokemon => (
          <div className="pokemon" key={pokemon.id}>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
              + pokemon.id + ".png"} alt="Pokemons" className="spritePokedex"/>
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
            </div>
        ))}
      </div>
    </section>
  </div>
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
