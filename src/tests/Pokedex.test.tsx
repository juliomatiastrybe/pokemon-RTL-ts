import pokemonList from '../data';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import { getFavoritePokemonList } from '../services/pokedexService';
import { clickNextPokemon } from './helpers/clickNextPokemon';

describe('Testa o componente <Pokedex.tsx />', () => {
  const dataTestID = 'pokemon-name';
  const nextNameBtn = 'Próximo Pokémon';
  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ getFavoritePokemonList() }
    />);

    expect(getByRole('heading', { name: 'Encountered Pokémon' })).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', async () => {
    const { getByRole, user, getByTestId } = renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ getFavoritePokemonList() }
    />);

    // garantindo que renderiza o primeiro pokemon da lista
    const firstPokRender = getByTestId(dataTestID).innerHTML;
    const dataFirstPokemon = pokemonList[0].name;
    expect(firstPokRender).toBe(dataFirstPokemon);

    const btnNext = getByRole('button', { name: nextNameBtn });

    // função para clicar para proximo pokemon até o ultimo da lista
    await clickNextPokemon(pokemonList.length - 1, btnNext);

    // garantindo que foi clicado até renderizar o ultimo pokemon da lista
    const lastPokemon = getByTestId(dataTestID).innerHTML;
    const dataLastPokemon = pokemonList[pokemonList.length - 1].name;
    expect(lastPokemon).toBe(dataLastPokemon);

    // clicar no botão de proximo deve retorna o primeiro pokemon da lista
    await user.click(btnNext);
    const firstPokemon = getByTestId(dataTestID).innerHTML;
    expect(firstPokemon).toBe(dataFirstPokemon);
  });
  it('Teste se a Pokédex tem os botões de filtro:', async () => {
    const { getAllByTestId, user, getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ getFavoritePokemonList() }
    />);
    const pokemonTypes = pokemonList.map((pokemon) => pokemon.type);
    const filterButtons = getAllByTestId('pokemon-type-button');

    // Verifica se cada tipo de Pokémon tem um botão de filtro
    pokemonTypes.forEach((type) => {
      const buttonExists = filterButtons.some((btn) => btn.innerHTML === type);
      expect(buttonExists).toBe(true);
    });
    // Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo.
    const buttonFire = filterButtons.find((btn) => (btn.innerHTML === 'Fire'));
    if (buttonFire) {
      await user.click(buttonFire);
    }
    const pokemonFire = pokemonList.filter((pokemon) => (pokemon.type === 'Fire'))
      .map((pokemon) => (pokemon.name));

    const btnNext = getByRole('button', { name: nextNameBtn });
    // função para clicar para proximo pokemon até o ultimo da lista Fire
    await clickNextPokemon(pokemonFire.length - 1, btnNext);
    // garantindo que será clicado no proximo do ultimo pokemon, voltara para o primeiro
    await user.click(btnNext);
    const firstFirePokemon = getByTestId(dataTestID).innerHTML;
    expect(firstFirePokemon).toBe(pokemonFire[0]);

    // O botão All precisa estar sempre visível
    const btnAll = getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro:', async () => {
    const { getByRole, user, getAllByTestId, getByTestId } = renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ getFavoritePokemonList() }
    />);

    const filterButtons = getAllByTestId('pokemon-type-button');

    const buttonFire = filterButtons.find((btn) => (btn.innerHTML === 'Fire'));
    if (buttonFire) {
      await user.click(buttonFire);
    }
    const pokemonFire = pokemonList.filter((pokemon) => (pokemon.type === 'Fire'))
      .map((pokemon) => (pokemon.name));

    const btnNext = getByRole('button', { name: nextNameBtn });
    // função para clicar para proximo pokemon até o ultimo da lista Fire
    await clickNextPokemon(pokemonFire.length - 1, btnNext);
    // garantindo que será clicado no proximo do ultimo pokemon, voltara para o primeiro
    await user.click(btnNext);
    const firstFirePokemon = getByTestId(dataTestID).innerHTML;
    expect(firstFirePokemon).toBe(pokemonFire[0]);

    const btnAll = getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    // clicando no botão All para limpar o filtro
    await user.click(btnAll);
    // verificando se ao clicar no proximo percorre a lista sem filtro
    // função para clicar para proximo pokemon até o ultimo da lista
    await clickNextPokemon(pokemonList.length - 1, btnNext);

    // garantindo que foi clicado até renderizar o ultimo pokemon da lista
    const lastPokemon = getByTestId(dataTestID).innerHTML;
    const dataLastPokemon = pokemonList[pokemonList.length - 1].name;
    expect(lastPokemon).toBe(dataLastPokemon);

    // clicar no botão de proximo deve retorna o primeiro pokemon da lista
    await user.click(btnNext);
    const dataFirstPokemon = pokemonList[0].name;
    const firstPokemon = getByTestId(dataTestID).innerHTML;
    expect(firstPokemon).toBe(dataFirstPokemon);
  });
});
