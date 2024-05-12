import { useEffect, useState } from "react";

interface IndexedDBHookReturn {
    putData: (storeName: string, data: any) => Promise<boolean>;
    cursorGetDataAll: (storeName: string) => Promise<any>;
    cursorSetDataAll: (storeName: string, data: any) => Promise<boolean>;
    cursorRemoveDataAll: (storeName: string, userId: string) => Promise<boolean>;
    data : any;
    isInitialized: boolean; // 添加一个标识，表示IndexedDB是否已初始化完成
  }
  

  export function useIndexDB(dbName: string, version: number = 1): IndexedDBHookReturn {
    const [db, setDb] = useState<IDBDatabase | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [data, setData] = useState({});
    useEffect(() => {
      const request = window.indexedDB.open(dbName, version);
  
      request.onerror = (event: any) => {
        console.error('IndexedDB initialization error:', event);
      };
  
      request.onsuccess = (event: any) => {
        const db = event.target.result;
        setDb(db);
        (async () => {  
            try {  
              const data = await cursorGetDataAll('user_info');  
              setData(data);  
            } catch (err) {  
            }  
          })();  
        setIsInitialized(true);
      };
  
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        let objectStore;
        if (!db.objectStoreNames.contains('user_info')) {
          objectStore = db.createObjectStore('user_info', {
            keyPath: 'userId',
            unique: true,
          });
        }
      };
    }, [dbName, version]);
  
    const putData = async (storeName: string, data: any): Promise<boolean> => {
      return new Promise((res, rej) => {
        if (!db) {
          rej('数据库未初始化');
          return;
        }
  
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);
  
        request.onsuccess = () => res(true);
        request.onerror = () => rej(false);
      });
    };
  
    const cursorGetDataAll = async (storeName: string): Promise<{ [userId: string]: API.UserInfo }> => {
      return new Promise((res, rej) => {
        if (!db) {
          rej('数据库未初始化');
          return;
        }
  
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
  
        const request = store.openCursor();
        let dataObject = {};
  
        request.onsuccess = (e) => {
          const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
            const userData = cursor.value;
            dataObject = userData;
            cursor.continue();
          } else {
            res(dataObject);
          }
        };
  
        request.onerror = () => rej(false);
      });
    };
  
    const cursorSetDataAll = async (storeName: string, data: any): Promise<boolean> => {
      return new Promise((res, rej) => {
        if (!db) {
          rej('数据库未初始化');
          return;
        }
  
        const transaction = db.transaction([storeName], 'readwrite');
        const request = transaction.objectStore(storeName).add(data);
  
        request.onsuccess = () => {
          res(true);
        };
  
        request.onerror = () => {
          rej(false);
        };
      });
    };
  
    const cursorRemoveDataAll = async (storeName: string, userId: string): Promise<boolean> => {
      return new Promise((res, rej) => {
        if (!db) {
          rej('数据库未初始化');
          return;
        }
  
        const transaction = db.transaction([storeName], 'readwrite');
        const request = transaction.objectStore(storeName).delete(userId);
  
        request.onsuccess = () => {

          res(true);
        };
  
        request.onerror = () => {

          rej(false);
        };
      });
    };
  
    return { putData, cursorGetDataAll, cursorSetDataAll, cursorRemoveDataAll, isInitialized, data };
  }
  
  