import userEvent from '@testing-library/user-event';

export const clickNextPokemon = async (
  iterations: number,
  btnNext: HTMLElement,
) => {
  if (iterations > 0) {
    await userEvent.click(btnNext);
    await clickNextPokemon(iterations - 1, btnNext);
  }
};
