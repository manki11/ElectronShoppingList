const electron = require('electron');
const {app} = electron;
//Create menu template

module.exports = function(fns) {
    let mainMenuTemplate = [
        {
            label: 'Electron',
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

    return mainMenuTemplate;
};