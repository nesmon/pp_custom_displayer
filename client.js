const staticserv = require('./server/staticServer.js')
const dynamicserv = require('./server/dynamicServer.js')
const electron = require('electron')
const eventBus = require('./module/eventBus')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

dynamicserv.dynamicServ()
staticserv.staticServ()

let mainWindow;



function createWindow() {

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 800,
        height: 500,
        title: 'pp_displayer',
        maximized: false,
        center: true,
    });

    mainWindow.loadURL(`file://${__dirname}/src/index.html`)


    mainWindow.on('closed', () => {
        mainWindow = null
    })
    eventBus.subscribe('PP',message => mainWindow.webContents.send('PP', message))
    eventBus.subscribe('MUSIC_CHANGED',message => mainWindow.webContents.send('MUSIC_CHANGED', message))

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})