const fs = require('fs')

const newDate = () => new Date().toISOString().split('T')[0]
const number = Math.round(Math.random() * (100 - 1) + 1);
const date = newDate();
const getNewId = (array) => {
    if (array.length > 0) {
        return number +  date.split('-').join('')
    } else {
        return 1
    }
}



function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'incorrect id',
                status: 404
            })
        }
        resolve(row)
    })
}

function retrieveOrders(filename) {
    const rawData = fs.readFileSync(filename, 'utf8');
    return JSON.parse(rawData);
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile,
    retrieveOrders
}