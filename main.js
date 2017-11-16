const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

var fns = {createAddWindow: createAddWindow};
const mainMenuTemplate = require('./main/menu')(fns);


//Listen for app to be ready
app.on('ready', () => {
    //Create new window
    mainWindow = new BrowserWindow();

    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'renderer/mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Quit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create add Window
function createAddWindow() {
    //Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });

    //Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'renderer/addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Garbage collection handle
    addWindow.on('closed', () => {
        addWindow = null;
    });
}

//Catch add item
ipcMain.on('item: add', (e, item)=> {
    mainWindow.webContents.send('item: add',item);
    addWindow.close();
});


