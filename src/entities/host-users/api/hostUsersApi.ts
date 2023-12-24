import { oraculusApi } from '@/shared/api/oraculus-api';
import { HostUserDto } from '@/shared/api/oraculus-api/OraculusApi';
import { useQuery } from '@tanstack/react-query';

export interface HostUser {
  description: string | null;
  id: string;
  login: string;
  need_sudo: boolean;
  use_ssh_key: boolean;
  sshkey?: string;
}

export function mapHostUsers(hostUserDto: HostUserDto[]): HostUser[] {
  return hostUserDto;
}

export function useHostUsers() {
  return useQuery({
    queryKey: ['host-users'],
    queryFn: async () => {
      const response = await oraculusApi.getHostUsers();
      return mapHostUsers(response);
    },
  });
}
