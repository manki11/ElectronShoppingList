//Create menu template

let mainMenuTemplate = [
    {
        label: 'Electron',
        submenu: [
            {
                label: 'About',
                role: 'about'
            },{
                type: 'separator'
            }, {
                label: 'Add Items'
            }, {
                label: 'Clear Items'
            },{
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

module.exports= mainMenuTemplate;