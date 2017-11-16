const electron= require('electron');
const url= require('url');
const path= require('path');

const {app, BrowserWindow, Menu}= electron;

let mainWindow;

//Create menu template
let mainMenuTemplate =[
    {
        label:'Electron',
        submenu: [
            {
                label: 'About',
                click: () => {
                    console.log('About Clicked');
                }
            }, {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ]
    }
];

//Listen for app to be ready
app.on('ready', () => {
    //Create new window
    mainWindow= new BrowserWindow();

    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }));

    //Build menu from template
    const mainMenu= Menu.buildFromTemplate(mainMenuTemplate);

    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});
