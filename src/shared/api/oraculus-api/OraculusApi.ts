import { axiosInstanse } from '@/shared/lib/axios';

export interface SystemUserDto {
  id: string;
  login: string;
  full_name: string;
  email: string;
  user_type: string;
  user_locked: boolean;
  use_ldap: boolean;
}

export interface RevertToVdbSnapshotData {
  vdbId: string;
  snapname: string;
  saveState: boolean;
}

export interface VdbSnapshotDto {
  datecreated: string;
  id: string;
  sintname: string;
  sname: string;
  stype: number;
}

export interface CreateVdbSnapshotData {
  vdbId: string;
  snapname: string;
}
export interface CreateDataSetSnapshotData {
  dataset: string;
  snapname: string;
}
export interface DataSetDto {
  dsfsname: string;
  dsname: string;
  dsport: number;
  id: string;
  srchost: string;
}

export interface userLoginDto {
  username: string;
  password: string;
}

export interface EditDataSetData {
  id: string;
  dataset_name: string;
  dsport: number;
}

export interface DataSetSnapshotDto {
  dataset: string;
  datecreated: string;
  id: string;
  isexported: boolean;
  sintname: string;
  sname: string;
  sparent: string;
  stype: 0 | 1 | 2 | 3;
}

export interface HostUserDto {
  description: string | null;
  id: string;
  login: string;
  need_sudo: boolean;
  sshkey?: string;
  use_ssh_key: boolean;
}

export interface DbHostDto {
  db_os_user: string;
  db_path: string;
  db_port: number;
  db_type: string;
  host_desc?: string;
  host_name: string;
  host_user_id: string;
  id: string;
  is_virtual: boolean;
}

export interface VdbDto {
  dbport: number;
  dsid: string;
  hostid: string;
  id: string;
  snapid: string;
  vdbname: string;
  vdbpath: string;
}

export interface CreateUserData {
  login: string;
  pwd: string;
  full_name: string;
  email: string;
  user_type: string;
  user_locked: boolean;
  use_ldap: boolean;
}

export interface EditUserData {
  id: string;
  login: string;
  pwd: string;
  full_name: string;
  email: string;
  user_type: string;
  user_locked: boolean;
  use_ldap: boolean;
}

export interface CreateHostUserData {
  login: string;
  description: string;
  pwd: string;
  need_sudo: boolean;
  use_ssh_key: boolean;
  sshkey?: string;
}

export interface EditHostUserData {
  id: string;
  login: string;
  description: string;
  pwd: string;
  need_sudo: boolean;
  use_ssh_key: boolean;
  sshkey?: string;
}

export interface CreateDbHostData {
  host_desc: string;
  host_name: string;
  ssh_port: number;
  db_path: string;
  db_port: number;
  db_type: string;
  db_os_user: string;
  is_virtual: boolean;
  host_user_id: string;
}

export interface EditDbHostData {
  id: string;
  host_desc: string;
  host_name: string;
  ssh_port: number;
  db_path: string;
  db_port: number;
  db_type: string;
  db_os_user: string;
  is_virtual: boolean;
  host_user_id: string;
}

export interface CreateDataSetByBcpData {
  ds_name: string;
  src_host: string;
  remote_path: string;
  table_space_id: string;
}

export interface CreateDataSetByReplData {
  ds_name: string;
  src_host: string;
  repl_user: string;
  repl_user_pwd: string;
}

export interface CreateVdbData {
  snapid: string;
  hostid: string;
  vdbpath: string;
  vdbname: string;
  dbport: number;
  dsid: string;
  ownerid:string;
}

export interface EdtiVdbData {
  id: string;
  vdbname: string;
  dbport: number;
}

export class OraculusApi {
  getUsers() {
    const responseData = axiosInstanse
      .get<SystemUserDto[]>('/user')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  userLogin(user:userLoginDto) {
    console.log(user);
    }

  createUser(data: CreateUserData) {
    const responseData = axiosInstanse
      .post<unknown>('/user', data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  updateUser(data: EditUserData) {
    const { id: userId, ...newUserData } = data;
    const responseData = axiosInstanse
      .post<unknown>(`/user/${userId}`, newUserData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  deleteUser(userId: string) {
    const responseData = axiosInstanse
      .delete(`/user?userid=${userId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  getDataSets() {
    const responseData = axiosInstanse
      .get<DataSetDto[]>('/dataset')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  getDataSetById(dataSetId: string) {
    const responseData = axiosInstanse
      .get<DataSetDto[]>(`/dataset/${dataSetId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  createDataSetByBcp(data: CreateDataSetByBcpData) {
    console.log(data)
    const responseData = axiosInstanse
      .post<string>('/dataset/bybcp', data)
      .then((response) => {
        console.log(response)
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  updateDataSet(data: EditDataSetData) {
    const { id: dataSetId, ...newDataSetData } = data;
    const responseData = axiosInstanse
      .post<unknown>(`/dataset/${dataSetId}`, newDataSetData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  createDataSetByRepl(data: CreateDataSetByReplData) {
    const responseData = axiosInstanse
      .post<string>('/dataset/byrepl', data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  deleteDataSet(dataSetId: string) {
    const responseData = axiosInstanse
      .delete(`dataset?dataset=${dataSetId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  getSnapshotsByDataSetId(dataSetId: string) {
    const responseData = axiosInstanse
      .get<DataSetSnapshotDto[]>(`/dataset/snapshot?dataset=${dataSetId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  deleteDataSetSnapshotsByDataSetId(dataSetId: string) {
    const responseData = axiosInstanse
      .delete(`/dataset/snapshot?dataset=${dataSetId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  deleteDataSetSnapshotBySnapshotId(snapshotId: string) {
    console.log(snapshotId);
    // const responseData = axiosInstanse
    //   .delete(`/dataset/snapshot?dataset=${dataSetId}`)
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });
    // return responseData;
  }

  getHostUsers() {
    const responseData = axiosInstanse
      .get<HostUserDto[]>('/hostuser')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  getHostUserById(hostUserId: string) {
    const responseData = axiosInstanse
      .get<HostUserDto[]>(`/hostuser/${hostUserId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }
  deleteHostUser(hostUserId: string) {
    const responseData = axiosInstanse
      .delete(`/hostuser/${hostUserId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }
  updateHostUser(data: EditHostUserData) {
    const { id: hostUserId, ...newHostUserData } = data;
    const responseData = axiosInstanse
      .post<unknown>(`/hostuser/${hostUserId}`, newHostUserData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  createHostUser(hostUserData: CreateHostUserData) {
    const responseData = axiosInstanse
      .post<string>('/hostuser', hostUserData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  getDbHosts() {
    const responseData = axiosInstanse
      .get<DbHostDto[]>('/dbhost')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  getDbHostById(dbHostId: string) {
    const responseData = axiosInstanse
      .get<DbHostDto[]>(`/dbhost/${dbHostId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  updateDbHost(data: EditDbHostData) {
    const { id: dbHostId, ...newDbHostData } = data;
    const responseData = axiosInstanse
      .post<unknown>(`/dbhost/${dbHostId}`, newDbHostData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  createDbHost(dbHostData: CreateDbHostData) {
    const responseData = axiosInstanse
      .post<unknown>('/dbhost', dbHostData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  getVdbs() {
    const responseData = axiosInstanse
      .get<VdbDto[]>('/vdb')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  createVdb(data: CreateVdbData) {
    const responseData = axiosInstanse
      .post<string>('/vdb', data)
      .then((response) => {
        return response.data;
    
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  updateVdb(data: EdtiVdbData) {
    const { id: vdbId, ...newVdbData } = data;
    const responseData = axiosInstanse
      .post<unknown>(`/vdb/${vdbId}`, newVdbData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  deleteVdb(vdbId: string) {
    const responseData = axiosInstanse
      .delete(`vdb?vdbid=${vdbId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  deleteDbHost(hostId: string) {
    const responseData = axiosInstanse
      .delete(`dbhost?hostid=${hostId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  revertToVdbSnaphsot(data: RevertToVdbSnapshotData) {
    const responseData = axiosInstanse
      .get<unknown>(
        `/vdb/revert?vdbid=${data.vdbId}&snapname=${data.snapname}&savestate=${data.saveState}`,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  createVdbSnapshot(data: CreateVdbSnapshotData) {
    const responseData = axiosInstanse
      .post<unknown>(
        `/vdb/snapshot?vdbid=${data.vdbId}&snapname=${data.snapname}`,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  updateVdbToLatestDSDnapshot(vdbId: string) {
    const responseData = axiosInstanse
      .get<string[]>(`vdb/sync/${vdbId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  createDataSetSnapshot(data: CreateDataSetSnapshotData) {
    const responseData = axiosInstanse
      .post<unknown>(
        `/dataset/snapshot?dataset=${data.dataset}&snapname=${data.snapname}`,
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }
  getVdbSnapshotsByVdbId(vdbId: string) {
    const responseData = axiosInstanse
      .get<VdbSnapshotDto[]>(`/vdb/snapshot?vdbid=${vdbId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }

  getLogs(lastn: number) {
    const responseData = axiosInstanse
      .get<string[]>(`/logs?lastn=${lastn}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    return responseData;
  }
}
