import { oraculusApi } from '@/shared/api/oraculus-api';
import { SystemUserDto } from '@/shared/api/oraculus-api/OraculusApi';
import { useQuery } from '@tanstack/react-query';

export interface SystemUser {
  id: string;
  login: string;
  full_name: string;
  email: string;
  user_type: string;
  user_locked: boolean;
  use_ldap: boolean;
}

export function mapSystemUsers(systemUsersDto: SystemUserDto[]): SystemUser[] {
  return systemUsersDto;
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await oraculusApi.getUsers();

      return mapSystemUsers(response);
    },
  });
}
