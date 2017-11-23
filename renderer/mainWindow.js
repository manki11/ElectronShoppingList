const electron = require('electron');
const fs = require("fs")
const {ipcRenderer} = electron;
const filename = 'shopping-list'

const ul = document.querySelector('ul');

ipcRenderer.on('item: add', (e, item) => {
    addEntry(item);
    fs.appendFile(filename, item +'\n')
});

function addEntry(item) {
    ul.className = 'collection';
    const li = document.createElement('li');
    const itemText = document.createTextNode(item);
    li.appendChild(itemText);
    li.className = 'collection-item';
    ul.appendChild(li);
}

ipcRenderer.on('item: clear', () => {
    ul.innerHTML = '';
    ul.className = '';
    deleteFile();
});

function deleteFile(){
    fs.unlink(filename, (err) => {
        if (err) {
            alert("An error ocurred updating the file" + err.message);
            console.log(err);
            return;
        }
        console.log("File succesfully deleted");
    });
}

ul.addEventListener('dblclick', (e) => {
    e.target.remove();
    if (ul.children.length === 0) {
        ul.className = '';
    }
});

function loadAndDisplayContacts() {
    //Check if file exists
    if (fs.existsSync(filename)) {
        let data = fs.readFileSync(filename, 'utf8').split('\n')

        data.forEach((item, index) => {
            if(item.length!==0){
                addEntry(item)
            }
        });

        if (ul.children.length === 0) {
            ul.className = '';
        }

    } else {
        console.log("File Doesn\'t Exist. Creating new file.")
        fs.writeFile(filename, '', (err) => {
            if (err)
                console.log(err)
        })
    }
}

loadAndDisplayContacts()