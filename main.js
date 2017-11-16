const electron = require('electron');
const url = require('url');
const path = require('path');
const mainMenuTemplate= require('./main/menu');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

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

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});
