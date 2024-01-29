const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld("api", {
    fetchBoxscoreData: () => ipcRenderer.invoke('fetch-boxscore-data'),
    onBoxscoreData: callBack => {
        const handler = (evt, ...args) => callBack(...args);
        ipcRenderer.on('boxscore-data', handler);

        return () => ipcRenderer.removeListener('boxscore-data', handler);
    }
})
