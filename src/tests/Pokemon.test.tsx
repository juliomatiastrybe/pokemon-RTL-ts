import { Pokemon } from '../components';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <Pokemon.tsx />', () => {
  it('Testa se é renderizado um card com as informações de determinado Pokémon:', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      showDetailsLink
      isFavorite
    />);

    const { name, type, image, averageWeight } = pokemonList[0];
    const { measurementUnit, value } = averageWeight;

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(name);

    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe(type);

    const pokemonWeight = getByTestId('pokemon-weight').innerHTML;
    const dataPokemonWeight = `Average weight: ${value} ${measurementUnit}`;
    expect(pokemonWeight).toBe(dataPokemonWeight);

    const pokemonImage = getByRole('img', { name: /pikachu sprite/i }).getAttribute('src');
    expect(pokemonImage).toBe(image);
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido.', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      showDetailsLink
      isFavorite
    />);
    const { id } = pokemonList[0];
    const linkDetails = getByRole('link', { name: 'More details' }).getAttribute('href');
    const linkDataDetails = `/pokemon/${id}`;
    expect(linkDetails).toBe(linkDataDetails);
  });
  it('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
    const { user, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      showDetailsLink
      isFavorite
    />);
    const { id } = pokemonList[0];

    const linkDetails = getByRole('link', { name: 'More details' });
    await user.click(linkDetails);
    const { pathname } = window.location;
    expect(pathname).toBe(`/pokemon/${id}`);
  });
  it('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      showDetailsLink
      isFavorite
    />);
    const { name } = pokemonList[0];

    const imgFav = getByRole('img', { name: `${name} is marked as favorite` });
    expect(imgFav.getAttribute('alt')).toBe(`${name} is marked as favorite`);
    expect(imgFav.getAttribute('src')).toBe('/star-icon.png');
  });
});
