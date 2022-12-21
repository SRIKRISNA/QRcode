const express = require('express');
const app = express();
const bp = require('body-parser');
const qr = require('qrcode');

app.listen(5000, () => console.log('server at 5000 port'));

app.set('view engine', 'ejs');
app.use(bp.json());
app.use(bp.urlencoded({extended: false}));

app.get("/", (req,res) => {
    res.render('qrcode'); //qrcode.ejs file
})

app.post('/scan', (req,res) => {
    const url = req.body.url;

    if(url.length === 0) res.send('empty data..!')

    qr.toDataURL(url, (err, src) => {
        if(err) res.send('Error occured');

        res.render('scan', {src});
    })
})