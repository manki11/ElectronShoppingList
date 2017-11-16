const electron = require('electron');
const {app} = electron;
//Create menu template

module.exports = function (fns) {
    let mainMenuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'About',
                    role: 'about'
                }, {
                    type: 'separator'
                }, {
                    label: 'Add Items',
                    click: () => {
                        fns.createAddWindow();
                    }
                }, {
                    label: 'Clear Items'
                }, {
                    type: 'separator'
                }, {
                    label: 'Quit',
                    click: () => {
                        app.quit();
                    },
                    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q'
                }
            ]
        }
    ];

    //Add developer tools item if not in production
    if(process.env.NODE_ENV !== 'production') {
        mainMenuTemplate.push({
            label: 'Developer Tools',
            submenu: [
                {
                    label: 'Toggle Dev Tools',
                    click: (item, foccusedWindow) => {
                        foccusedWindow.toggleDevTools();
                    },
                    accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I'
                }, {
                    type: 'separator'
                },  {
                    role: 'reload'
                }
            ]
        })
    }

    //If mac add empty object to menu
    if (process.platform === 'darwin') {
        mainMenuTemplate.unshift({});
    }

    return mainMenuTemplate;

};