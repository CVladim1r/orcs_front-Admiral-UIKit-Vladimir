import { oraculusApi } from '@/shared/api/oraculus-api';
import { DataSetDto } from '@/shared/api/oraculus-api/OraculusApi';
import { useQuery } from '@tanstack/react-query';

export interface DataSet {
  dsfsname: string;
  dsname: string;
  dsport: number;
  id: string;
  srchost: string;
}

export function mapDataSets(DataSetDto: DataSetDto[]): DataSet[] {
  return DataSetDto;
}

export function useDataSets() {
  return useQuery({
    queryKey: ['data-sets'],
    queryFn: async () => {
      const response = await oraculusApi.getDataSets();

      return mapDataSets(response);
    },
  });
}
