import React from 'react';
import logo from './images/Pokédex_logo.png';
import left_arrow from './images/left_arrow.png';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      textChange: '',
      style:null,
      pokemon_id: '1',
      pokemons: [],
      pokemon: []
    }
  }

  handleChange = event => {
    this.setState({textChange: event.target.value});
  };

  changeStyle(){
    if(this.state.style === null){
      this.setState({style: 1});
      document.body.style.backgroundColor = "#FFF";
    }else{
      this.setState({style: null});
      document.body.style.backgroundColor = "#222222";
    }
  }

  getAllPokemons() {
    fetch('http://localhost:4242/pokemons')
    .then(response => response.json())
    .then(response => {
        this.setState({pokemons: response})
      })
  }

  getOnePokemon(pokemon_id) {
    fetch('http://localhost:4242/pokemons/:'+pokemon_id)
    .then(response => response.json())
    .then(response => {
      console.log(response)
        this.setState({pokemon: response})
      })
  }

  componentDidMount() {
    this.getAllPokemons();
  }

  render() {
    return ( 
      this.state.pokemon.length === 0 ?
      <div className="container">
        <div className='div_theme' onClick={() => this.changeStyle()}>LIGHT THEME</div>
        <header className="App-header">
          <img className="img_entete" src={logo} alt="Logo"/><br/>
          <input className="search" type="text" placeholder="Search Pokemon" onChange={this.handleChange} />
         </header>
          <div className='pokemons'>
          {
            this.state.pokemons.length !== 0 ?
              this.state.pokemons.map((pokemons) => 
              pokemons.nom.toUpperCase().includes(this.state.textChange.toUpperCase()) ?
                <div className='pokemon' key={pokemons.numéro.toString()} onClick={() => this.getOnePokemon(pokemons.numéro)}>
                  <img className='img_pokemon' src={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+pokemons.numéro+'.png'} alt="pokemon" />
                  <div className='lib_pokemon'>#{pokemons.numéro}<br/>{pokemons.nom}</div>
                </div>
                :
                <p></p>
              )
            :
            <p>No DATA</p>
          }
          </div>
      </div>
      :
      <div className="container">
        <div className='div_theme' onClick={() => this.changeStyle()}>LIGHT THEME</div>
        <img className="left_arrow" src={left_arrow} alt="left_arrow" onClick={() => this.setState({pokemon: null})} />
        {}
        {             
        this.state.pokemon.map((pokemon) => 
        <div>
          <p className='TitrePoke' >{pokemon.numéro} {pokemon.nom}</p>
          <img className='imgPoke' src={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+pokemon.numéro+'.png'} alt="pokemon" />
          <div className="block">
            <p className="Identite">Identité</p>
            <hr/>
          <div className="block2">
          <table className="tabPoke" >
            <tr className='trPoke1' ><td>Couleur</td><td>{pokemon.couleur}</td></tr>
            <tr className='trPoke2'><td>Espece</td><td>{pokemon.espece}</td></tr>
            <tr className='trPoke1'><td>Type1</td><td>{pokemon.type1}</td></tr>
            <tr className='trPoke2'><td>Taille</td><td>{pokemon.taille}</td></tr>
            <tr className='trPoke1'><td>Poids</td><td>{pokemon.poids}</td></tr>
            <tr className='trPoke2'><td>Forme</td><td>{pokemon.forme}</td></tr>
          </table>
          </div>
          <div className="block2">
          <table className="tabPoke" >
            <tr className='trPoke1' ><td>Pokemon</td><td>{pokemon.nom}</td></tr>
            <tr className='trPoke2'><td>Nom FR</td><td>{pokemon.nom}</td></tr>
            <tr className='trPoke1'><td>Nom EN</td><td>{pokemon.nomen}</td></tr>
            <tr className='trPoke2'><td>Nom DE</td><td>{pokemon.nomde}</td></tr>
            <tr className='trPoke1'><td>Nom TM</td><td>{pokemon.nomtm}</td></tr>
            <tr className='trPoke2'><td>Nom JA</td><td>{pokemon.nomja}</td></tr>
          </table>
          </div>
          </div>
          <div className="block b1">
            <p className="Identite">Attaques</p>
            {
            pokemon.attaques.map((attaques) => 
                  <div className='Attaques'>
                    <p className='pPoke'><font className='fontPoke'>Niveau : </font>{attaques.niveau}</p><hr/>
                    <p className='pPoke'><font className='fontPoke'>Nom : </font>{attaques.nom}</p><hr/>
                    <p className='pPoke'><font className='fontPoke'>Puissance : </font>{attaques.puissance}</p><hr/>
                    <p className='pPoke'><font className='fontPoke'>Précision : </font>{attaques.precision}</p><hr/>
                    <p className='pPoke'><font className='fontPoke'>PP : </font>{attaques.pp}</p>
                  </div>
              )
            }
            <hr/>
          </div>
        </div>
        )
        }
      </div>
    );
  }
}

export default App;
