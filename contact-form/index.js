import express from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';

const app = express();

app.get('/contact', async (req, res) => {
    if(JSON.stringify(req.query) === '{}')
        return res.sendFile(path.resolve('./files/form.html'));
    
        try {
            let database = await fs.readFile('./database.json', 'utf-8');
            database = JSON.parse(database);
            database.push(req.query);
            await fs.writeFile('./database.json', JSON.stringify(database));
        } catch {
            await fs.writeFile('./database.json', JSON.stringify([req.query]));
        }
        res.send(`<script> alert('Message successfully sent'); window.location.href = "/contact"; </script>`)
    });

app.listen(3000);