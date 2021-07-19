require('dotenv').config()
const app = require('./server')
//Start server
app.listen(app.get('port'), ()=>{
    console.log('Server on port',app.get('port'))
})