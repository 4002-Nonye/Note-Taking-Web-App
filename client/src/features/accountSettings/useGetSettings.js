import { useQuery } from '@tanstack/react-query';

import { getAccountSettings as getAccountSettingsApi } from '../../apis/apiAccountSettings';

export function useGetSettings() {
  const query = useQuery({
    queryKey: ['accountSettings'],
    queryFn: () => getAccountSettingsApi(),
  });

  return { getAccountSettings: query.data, isPending: query.isFetching };
}
