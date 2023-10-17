import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.tsx />', () => {
  describe('Testa se a página contém as informações sobre a Pokédex.', () => {
    it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
      renderWithRouter(<About />);
      // pega o h2
      const heading = screen.getByRole('heading', { name: 'About Pokédex' });
      expect(heading).toBeInTheDocument();
    });
    it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
      renderWithRouter(<About />);
      // pega os parágrafos da tela
      const paragraphs = screen.getAllByText(/Pokémon/);
      // verifica se na pagina contem 2 parágrafos
      expect(paragraphs.length).toBe(2);
    });
    it('Testa se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
      renderWithRouter(<About />);
      const srcStandard = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      const imgPokedex = screen.getByRole('img');
      const srcValueImg = imgPokedex.getAttribute('src');
      console.log(srcValueImg);
      expect(srcValueImg).toBe(srcStandard);
    });
  });
});
