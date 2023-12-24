import { HostUserDto } from '@/shared/api/oraculus-api/OraculusApi';
import { oraculusApi } from '@/shared/api/oraculus-api';
import { useQuery } from '@tanstack/react-query';

export interface HostUser {
  description: string | null;
  id: string;
  login: string;
  need_sudo: boolean;
  sshkey?: string;
  use_ssh_key: boolean;
}

export function mapHostUser(hostUserDto: HostUserDto[]): HostUser {
  return hostUserDto[0];
}

export function useHostUser(hostUserId: string) {
  return useQuery({
    queryKey: ['host-users', hostUserId],
    queryFn: async () => {
      const response = await oraculusApi.getHostUserById(hostUserId);
      return mapHostUser(response);
    },
  });
}
