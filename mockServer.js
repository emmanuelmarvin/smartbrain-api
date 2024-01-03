const app = require('http').createServer((req, res) => res.send('hi there !!!'));

const port = process.env.port

app.listen(port, () => {
    console.log('server running at port ' + port)
})