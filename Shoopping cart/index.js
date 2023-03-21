import express from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';
import { engine } from 'express-handlebars';

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('box');
});

app.get('/buy', (req, res) => {
    res.render('buy');
});

app.get('/success', (req, res) => {
    res.render('mes');
});


app.get('/admin', async (req, res) => {
    let data = await fs.readFile('./database.json', 'utf-8');
    data = JSON.parse(data);
    res.render('admin', { orders: data });
});

app.post('/saved', async (req, res) => {
    try {
        database = await fs.readFile('./database.json', 'utf-8');
        database = JSON.parse(database);
        database.push(req.body);
        await fs.writeFile('./database.json', JSON.stringify(database));
    } catch {
        await fs.writeFile('./database.json', JSON.stringify([req.body]));
    }

    res.redirect('/success');
});

app.listen(8000);
