import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o Componente App', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação: Home, About, Favorite Pokémon ', () => {
    renderWithRouter(<App />);
    // pega o elemento nav
    const navElement = screen.getByRole('navigation');
    // pega os links do Nav
    const linksNav = navElement.getElementsByClassName('link');
    // verifica se o nav tem 3 elementos.
    expect(navElement.childElementCount).toBe(3);
    // verifica se o primeiro link tem o texto Home
    expect(linksNav[0].innerHTML).toBe('Home');
    // verifica se o segundo link tem o texto About
    expect(linksNav[1].innerHTML).toBe('About');
    // verifica se o terceiro link tem o texto Favorite Pokémon
    expect(linksNav[2].innerHTML).toBe('Favorite Pokémon');
  });
  it('Testa se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />);
    // pega elemento de link Home para ser clicado
    const homeLink = screen.getByRole('link', { name: 'Home' });
    await user.click(homeLink);
    const { pathname } = window.location;
    // verifica se ao clicar no link home, o path vai com /
    expect(pathname).toBe('/');
  });
  it('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    // pega elemento de link about para ser clicado
    const aboutLink = screen.getByRole('link', { name: 'About' });
    await user.click(aboutLink);
    const { pathname } = window.location;
    // verifica se ao clicar no link about, o path vai com /about
    expect(pathname).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    // pega elemento de link about para ser clicado
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    await user.click(favoriteLink);
    const { pathname } = window.location;
    // verifica se ao clicar no link Favorite Pokémon, o path vai com /favorites
    expect(pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    renderWithRouter(<App />, { route: '/listpokemons' });
    // verifica se pagina redireciona para um link inexistente
    const headingNotFound = screen.getByRole('heading', { name: 'Page requested not found' });
    // verifica se o componente NotFound foi renderizado
    expect(headingNotFound).toBeInTheDocument();
  });
});
