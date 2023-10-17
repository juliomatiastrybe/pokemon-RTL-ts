import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { pokemonsMock } from './mock/mockPokemons';

describe('Testa o componente <FavoritePokemon.tsx />', () => {
  it('verifica se é exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<FavoritePokemon />);
    const messageNotFav = screen.getByText('No favorite Pokémon found');
    expect(messageNotFav).toBeInTheDocument();
  });
  it('Verifica se apenas são exibidos os Pokémon favoritados.', async () => {
    vi.mock('./data.ts', () => {
      vi.fn().mockReturnValue(pokemonsMock);
    });

    const { user } = renderWithRouter(<App />, { route: '/favorites' });
    expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
    // volta para Home
    await user.click(screen.getByRole('link', { name: 'Home' }));
    // pega link para os detalhes
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    await user.click(moreDetails);
    // captura checkbox
    const checkboxFav = screen.getByRole('checkbox');
    await user.click(checkboxFav);
    // verifica se pokemon está favoritado ainda em /pokemon/id
    const imgFav = screen.getByRole('img', { name: `${pokemonsMock[0].name} is marked as favorite` });
    expect(imgFav).toBeInTheDocument();
    // navega para FavoritePokemon
    await user.click(screen.getByRole('link', { name: 'Favorite Pokémon' }));
    // verifica se tem pokemons favoritos
    const favorites = screen.getAllByTestId('pokemon-name');
    const verifyFavorites = favorites.length > 0;
    expect(verifyFavorites).toBe(true);
  });
});
