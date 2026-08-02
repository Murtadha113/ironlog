import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import * as local from '../data/localData';
import { getUserLogs, addUserLog, deleteUserLog } from '../data/userLogsRepo';

// طبقة موحّدة لقراءة/كتابة السجل — تخزين محلي للضيف، Firestore للمسجّلين
export function useLogs() {
  const { user } = useAuth();
  const authed = !!user;
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    if (authed) {
      setLogs(await getUserLogs(user.uid));
    } else {
      setLogs(local.getLogs());
    }
    setLoading(false);
  }, [authed, user]);

  useEffect(() => {
    if (user !== undefined) reload();
  }, [reload, user]);

  async function addLog(entry) {
    if (authed) {
      const newLog = await addUserLog(user.uid, entry);
      setLogs((prev) => [newLog, ...prev]);
      return newLog;
    }
    const newLog = local.addLog(entry);
    setLogs(local.getLogs());
    return newLog;
  }

  async function deleteLog(id) {
    if (authed) {
      const updated = await deleteUserLog(user.uid, id);
      setLogs(updated);
      return;
    }
    setLogs(local.deleteLog(id));
  }

  return { logs, loading, addLog, deleteLog, reload, authed, user };
}
