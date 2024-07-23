import Home, { QiitaArticle } from '@/app/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../../providers/token-provider', () => {
  const ActualReact = jest.requireActual('../../providers/token-provider');
  return {
    ...ActualReact,
    useUserInfoContext: () => ({ userInfo: { user: 'user', token: 'token' } }), // what you want to return when useContext get fired goes here
  };
});

describe('app/page.tsx', () => {
  test('fetch data successfully', async () => {
    const user = userEvent.setup();
    const mockData: QiitaArticle[] = [
      { title: 'title', url: 'url', created_at: '2021-01-01', page_views_count: 1, likes_count: 1, stocks_count: 1 },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => mockData,
    });

    await waitFor(() => render(<Home />));

    user.click(screen.getByTestId('get-data'));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith('https://qiita.com/api/v2/items?query=user:user', {
        headers: { authorization: 'Bearer token' },
      })
    );
  });

  test('fetch data failed', async () => {
    const user = userEvent.setup();
    const mockAlert = jest.spyOn(window, 'alert').mockReturnValue(undefined);
    global.fetch = jest.fn().mockResolvedValue({
      status: 401,
    });

    await waitFor(() => render(<Home />));

    user.click(screen.getByTestId('get-data'));

    await waitFor(() =>
      expect(mockAlert).toHaveBeenCalledWith('Authorization failed. Please check your access token.')
    );
  });
});
