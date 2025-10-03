import { useQuery } from '@tanstack/react-query';

import { getUser } from '../../apis/apiAuth';

export function useUser() {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return { user: query.data, isLoading: query.isLoading };
}
