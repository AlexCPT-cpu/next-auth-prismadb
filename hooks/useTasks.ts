import useSwr from 'swr'
import fetcher from '../libs/fetcher';

const useTasks = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/tasks', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    mutate,
    isLoading
  }
};

export default useTasks;