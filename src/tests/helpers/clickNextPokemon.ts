import userEvent from '@testing-library/user-event';

export const clickNextPokemon = async (
  lengthList: number,
  btnNext: HTMLElement,
) => {
  if (lengthList > 0) {
    await userEvent.click(btnNext);
    await clickNextPokemon(lengthList - 1, btnNext);
  }
};
