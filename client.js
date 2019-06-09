const staticserv = require('./server/staticServer.js')
const dynamicserv = require('./server/dynamicServer.js')
const electron = require('electron')
const app = electron.app

const BrowserWindow = electron.BrowserWindow

dynamicserv.dynamicServ()
staticserv.staticServ()

let mainWindow;


function createWindow() {

    mainWindow = new BrowserWindow({
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
