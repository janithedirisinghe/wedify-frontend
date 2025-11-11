import api from "./api";

/**
 * SWR fetcher function
 * Used with useSWR hook for data fetching
 */
export const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

/**
 * Fetcher with POST method
 */
export const postFetcher = async (url: string, data: any) => {
  const response = await api.post(url, data);
  return response.data;
};

/**
 * Fetcher with PUT method
 */
export const putFetcher = async (url: string, data: any) => {
  const response = await api.put(url, data);
  return response.data;
};

/**
 * Fetcher with DELETE method
 */
export const deleteFetcher = async (url: string) => {
  const response = await api.delete(url);
  return response.data;
};

/**
 * Fetcher with custom config
 */
export const fetcherWithConfig = async (url: string, config?: any) => {
  const response = await api.get(url, config);
  return response.data;
};

export default fetcher;
