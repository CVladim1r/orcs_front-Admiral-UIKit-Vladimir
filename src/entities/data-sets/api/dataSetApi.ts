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

export function mapDataSet(DataSetDto: DataSetDto[]): DataSet {
  return DataSetDto[0];
}

export function useDataSet(dataSetId: string) {
  return useQuery({
    queryKey: ['data-sets', dataSetId],
    queryFn: async () => {
      const response = await oraculusApi.getDataSetById(dataSetId);

      return mapDataSet(response);
    },
  });
}
