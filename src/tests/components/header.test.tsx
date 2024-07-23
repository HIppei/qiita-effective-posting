import Header from '@/components/header';
import { LocalStorageKey } from '@/constants/key-names';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe(Header.name, () => {
  Object.defineProperty(window, 'localStorage', {
    value: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() },
  });

  test('display empty inputs when no local storage values', async () => {
    await waitFor(() => render(<Header />));
    expect(screen.getByTestId('name')).toHaveValue('');
    expect(screen.getByTestId('token')).toHaveValue('');
  });

  test('display values in inputs when local storage values exist', async () => {
    jest.spyOn(localStorage, 'getItem').mockImplementation((key) => {
      if (key === LocalStorageKey.User) return 'ls-user';
      if (key === LocalStorageKey.Token) return 'ls-token';
      return null;
    });

    await waitFor(() => render(<Header />));

    expect(screen.getByTestId('name')).toHaveValue('ls-user');
    expect(screen.getByTestId('token')).toHaveValue('ls-token');
  });

  test('disable set button with empty value in either name or token', async () => {
    const user = userEvent.setup();
    await waitFor(() => render(<Header />));

    // Both empty
    expect(screen.getByTestId('set')).toBeDisabled();

    // Token empty
    await user.type(screen.getByTestId('name'), 'user-name');
    expect(screen.getByTestId('set')).toBeDisabled();

    // Name empty
    await user.clear(screen.getByTestId('name'));
    await user.type(screen.getByTestId('token'), 'user-token');
    expect(screen.getByTestId('set')).toBeDisabled();
  });

  test('disable clear button when both name and token are empty', async () => {
    const user = userEvent.setup();
    await waitFor(() => render(<Header />));

    // Both empty
    expect(screen.getByTestId('clear')).toBeDisabled();

    // Either name or token is not empty
    await user.type(screen.getByTestId('name'), 'user-name');
    expect(screen.getByTestId('clear')).not.toBeDisabled();

    await user.clear(screen.getByTestId('name'));
    await user.type(screen.getByTestId('token'), 'user-token');
    expect(screen.getByTestId('clear')).not.toBeDisabled();
  });

  test('set inputs values to local storage when set button clicked with yes value', async () => {
    const user = userEvent.setup();
    const mockSetItem = jest.spyOn(localStorage, 'setItem').mockReturnValue();

    await waitFor(() => render(<Header />));

    await user.type(screen.getByTestId('name'), 'user-name');
    await user.type(screen.getByTestId('token'), 'user-token');

    jest.spyOn(global, 'confirm').mockReturnValue(true);
    user.click(screen.getByTestId('set'));

    await waitFor(() => expect(mockSetItem).toHaveBeenCalledTimes(2));
    expect(mockSetItem).toHaveBeenNthCalledWith(1, LocalStorageKey.User, 'user-name');
    expect(mockSetItem).toHaveBeenNthCalledWith(2, LocalStorageKey.Token, 'user-token');
  });

  test('not set inputs values to local storage when set button clicked with no value', async () => {
    const mockSetItem = jest.spyOn(localStorage, 'setItem').mockReturnValue();

    await waitFor(() => render(<Header />));

    await userEvent.type(screen.getByTestId('name'), 'user-name');
    await userEvent.type(screen.getByTestId('token'), 'user-token');

    userEvent.click(screen.getByTestId('set'));

    jest.spyOn(global, 'confirm').mockReturnValue(false);

    await waitFor(() => expect(mockSetItem).not.toHaveBeenCalled());
  });

  test('clear name and token', async () => {
    const user = userEvent.setup();
    const mockRemoveItem = jest.spyOn(localStorage, 'removeItem').mockReturnValue();

    await waitFor(() => render(<Header />));

    await user.type(screen.getByTestId('name'), 'user-name');
    await user.type(screen.getByTestId('token'), 'user-token');

    user.click(screen.getByTestId('clear'));

    await waitFor(() => {
      expect(screen.getByTestId('name')).toHaveValue('');
      expect(screen.getByTestId('token')).toHaveValue('');
      expect(mockRemoveItem).toHaveBeenCalledTimes(2);
      expect(mockRemoveItem).toHaveBeenNthCalledWith(1, LocalStorageKey.User);
      expect(mockRemoveItem).toHaveBeenNthCalledWith(2, LocalStorageKey.Token);
    });
  });
});
