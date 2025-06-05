
import { useGlobal } from "@/contexts/GlobalContext";

export const useAuditLog = () => {
  const { logAction } = useGlobal();

  const logCreate = (module: string, entityType: string, entityId: string, data: any) => {
    logAction(`Created ${entityType}`, module, entityId, entityType, null, data);
  };

  const logUpdate = (module: string, entityType: string, entityId: string, oldData: any, newData: any) => {
    logAction(`Updated ${entityType}`, module, entityId, entityType, oldData, newData);
  };

  const logDelete = (module: string, entityType: string, entityId: string, data: any) => {
    logAction(`Deleted ${entityType}`, module, entityId, entityType, data, null);
  };

  const logView = (module: string, entityType: string, entityId: string) => {
    logAction(`Viewed ${entityType}`, module, entityId, entityType);
  };

  return {
    logCreate,
    logUpdate,
    logDelete,
    logView,
    logAction,
  };
};
