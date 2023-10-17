import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe(' Teste o componente <NotFound.tsx />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found.', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { name: /page requested not found/i })).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem com o texto alternativo Clefairy pushing buttons randomly with text I have no idea what i\'m doing.', () => {
    renderWithRouter(<NotFound />);
    const altStandard = 'Clefairy pushing buttons randomly with text I have no idea what i\'m doing';
    const imgNotFound = screen.getByRole('img');
    const altImg = imgNotFound.getAttribute('alt');

    expect(altImg).toBe(altStandard);
  });
});
