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
  search: string = "";

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
    });

  }


  ngOnInit(): void {
    this.getAllPokemon();
  }



}




