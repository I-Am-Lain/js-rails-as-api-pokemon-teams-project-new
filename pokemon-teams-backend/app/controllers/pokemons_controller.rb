class PokemonsController < ApplicationController
    def create
        pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: pokemon_params[:trainer_id])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])

        pokemon.destroy

        render json: pokemon
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
