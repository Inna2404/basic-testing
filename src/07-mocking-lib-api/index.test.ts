// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash/throttle');

describe('throttledGetDataFromApi', () => {
  const mockAxiosClient = {
    get: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
  });
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('.posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockResponseData = { id: 1, title: 'Test Post' };
    mockAxiosClient.get.mockResolvedValue({ data: mockResponseData });

    await throttledGetDataFromApi('/posts/1');

    expect(mockAxiosClient.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockResponseData = { id: 1, title: 'Test Post' };
    mockAxiosClient.get.mockResolvedValue({ data: mockResponseData });

    const data = await throttledGetDataFromApi('/posts/1');

    expect(data).toEqual(mockResponseData);
  });
});
