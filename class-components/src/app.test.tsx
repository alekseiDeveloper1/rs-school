import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import SearchPanel from './pages/StarWars/components/SearchPanel.tsx';
import Page from './pages/StarWars/Page.tsx';
import { Api } from './api/api.ts';
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    store,
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
jest.mock('./api/api.ts', () => ({
  Api: jest.fn().mockImplementation(() => ({
    getList: jest.fn(),
  })),
}));
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });
});

beforeEach(() => {
  jest.clearAllMocks();
  mockLocalStorage.clear();
});

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    configurable: true,
  });
});

beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});

describe('SearchComponent', () => {
  it('renders search input and button', () => {
    render(
      <SearchPanel
        modelSearch={() => {}}
        searchValue=""
        acceptFilter={() => {}}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});

describe('User Input Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('updates input value when typing', async () => {
    await act(async () => {
      render(<Page />);
    });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'TypeScript' } });
    expect(input.value).toBe('TypeScript');
  });
});
describe('Search Functionality', () => {
  it('loads recent searches', async () => {
    const mockApiInstance = {
      getList: jest
        .fn()
        .mockResolvedValue([
          { uid: 1, title: 'Season 1', series: { title: '' } },
        ]),
    };

    (Api as jest.Mock).mockImplementation(() => mockApiInstance);

    await act(async () => {
      render(<Page />);
    });

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    const season1Element = await screen.findByRole('listitem', {
      name: /season 1 |/i,
    });
    expect(season1Element).toBeInTheDocument();
  });
});
describe('localStorage Integration', () => {
  it('saves recent searches to localStorage', async () => {
    await act(async () => {
      render(<Page />);
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'redux' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'search',
      expect.stringContaining('redux')
    );

    expect(window.localStorage.getItem).toHaveBeenCalledWith('search');
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('redux');
    });
  });
});
