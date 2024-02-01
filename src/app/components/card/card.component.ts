import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service'
import { PokemonData } from '../../models/pokemonData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  allPokemons: PokemonData[];
  borderColor: string = "";

  constructor(private service: PokemonService) {
    this.allPokemons = [{
      id: 0,
      name: "",
      sprites: {
        front_default: ""
      },
      types: [{
        slot: 0,
        type: {
          name: "",
          url: ""
        }
      }]
    }];

  }

  setBorderColor(type: string): string {
    switch (type) {
      case "normal":
        return "border-gray-400";
      case "fire":
        return "border-red-600";
      case "water":
        return "border-blue-600";
      case "electric":
        return "border-yellow-400";
      case "grass":
        return "border-green-600";
      case "ice":
        return "border-blue-300";
      case "fighting":
        return "border-red-800";
      case "poison":
        return "border-purple-600";
      case "ground":
        return "border-yellow-800";
      case "flying":
        return "border-blue-400";
      case "psychic":
        return "border-purple-400";
      case "bug":
        return "border-green-400";
      case "rock":
        return "border-yellow-600";
      case "ghost":
        return "border-purple-800";
      case "dragon":
        return "border-red-400";
      case "dark":
        return "border-gray-800";
      case "steel":
        return "border-gray-600";
      case "fairy":
        return "border-pink-400";
      default:
        return "border-gray-400";
    }
  }

  getAllPokemon(): void {
    this.service.getAllPokemon().subscribe((data: any) => {
      this.allPokemons = data.results.map((pokemon: any, index: number) => {
        return {
          id: index + 1,
          name: pokemon.name,
          sprites: {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
          },
          types: [{
            slot: 0,
            type: {
              name: "",
              url: ""
            }
          }]
        }
      }
      );
      this.getPokemonTypes();
    });
  }

  getPokemonTypes() {
    this.allPokemons.forEach((pokemon: any) => {
      this.service.getPokemon(pokemon.name).subscribe((data: any) => {
        pokemon.types = data.types;
      });
    }
    );
  }


  ngOnInit(): void {
    this.getAllPokemon();

  }



}




