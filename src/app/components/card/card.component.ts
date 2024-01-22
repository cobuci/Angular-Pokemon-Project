import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service'
import { PokemonData } from '../../models/pokemonData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  pokemon: PokemonData;
  search: string = "";


  constructor(private service: PokemonService) {
    this.pokemon = {
      id: 0,
      name: "",
      sprites: {
        front_default: ""
      },
      types: []
    }
  }

  searchPokemon(search: string) {
    this.service.getPokemon(search.toLowerCase())
      .subscribe({
        next: (data) => {
          this.pokemon = {
            id: data.id,
            name: data.name,
            sprites: {
              front_default: data.sprites.front_default
            },
            types: data.types
          }
        },
        error: (error) => {

        }
      }
      );

  }

  ngOnInit(): void {
    this.service.getPokemon("charizard")
      .subscribe({
        next: (data) => {
          this.pokemon = {
            id: data.id,
            name: data.name,
            sprites: {
              front_default: data.sprites.front_default
            },
            types: data.types
          }
        },
        error: (error) => {
          console.log(error)
        }
      }
      );

  }
}




