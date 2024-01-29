const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const https = require('https');
const {BoxScore, fetchPlayerStats} = require('./playerstats-api.js');
const Datastore = require('nedb');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const HttpResponse = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  IM_A_TEAPOT: 418
}

const db = {};

const intializeDatabase = async () => {
  const data = await fetchPlayerStats();
  db.boxscores = new Datastore();
  db.boxscores.insert(data, (err, newDocs) => {
    if (err) {
      ipcMain.emit("init-error", err.message);
      return;
    }
  });
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  db.boxscores.find({playerId: 203468}).exec((err, docs) => console.log(docs));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => await intializeDatabase())
               .then(ipcMain.handle('fetch-boxscore-data', async () => await db.boxscores.getAllData()))
               .then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.