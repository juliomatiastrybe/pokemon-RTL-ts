import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.tsx />', () => {
  const { id, name, summary, foundAt } = pokemonList[0];
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    const { getByText,
      getByRole } = renderWithRouter(<App />, { route: `/pokemon/${id}` });

    expect(getByText(`${name} Details`)).toBeInTheDocument();

    expect(getByRole('heading', { name: /summary/i }));

    expect(getByText(summary)).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    const { getByRole,
      getByText,
      getAllByAltText } = renderWithRouter(<App />, { route: `/pokemon/${id}` });

    expect(getByRole('heading', { name: `Game Locations of ${name}` })).toBeInTheDocument();

    foundAt.forEach((found, index) => {
      expect(getByText(found.location)).toBeInTheDocument();

      const img = getAllByAltText(`${name} location`)[index];

      expect(img.getAttribute('src')).toBe(found.map);
    });
  });
  it('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes:', async () => {
    const { getByRole,
      user, getByLabelText } = renderWithRouter(<App />, { route: `/pokemon/${id}` });

    const checkbox = getByRole('checkbox', { name: /pokémon favoritado\?/i });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();

    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
