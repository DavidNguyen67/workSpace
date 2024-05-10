import { useCallback, useEffect, useState } from 'react';
import { insertUsers, setMaxRecord, setUsers } from '../redux/slices';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { findAll } from '../services';
import { HARD_CODE_LIMIT_DOCUMENT } from '../constants';
import { HttpStatusCode } from 'axios';

const useUsers = (triggerFetchMore: boolean) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { users, maxRecord } = useAppSelector((state) => state.app);
  const [isFirstTimeNotFound, setIsFirstTimeNotFound] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleFetchUsers = useCallback(async () => {
    setIsLoading(true);
    const response = await findAll({
      limit: HARD_CODE_LIMIT_DOCUMENT,
      skip: users.length,
    });
    setIsLoading(false);

    if (response.statusCode === HttpStatusCode.NotFound) {
      setIsFirstTimeNotFound(false);
      return;
    }
    if (users?.length < 1) {
      dispatch(setUsers(response.data));
      response.maxRecord && dispatch(setMaxRecord(response.maxRecord));
    }
    if (users?.length > 1) dispatch(insertUsers(response.data));
  }, [users]);

  useEffect(() => {
    if (triggerFetchMore || users.length < 1) handleFetchUsers();
  }, [triggerFetchMore]);

  return { users, isLoading };
};

export default useUsers;
