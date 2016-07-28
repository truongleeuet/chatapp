import express from 'express';
import bodyParser from 'body-parser';
import uuid from 'node-uuid';
import rooms from './data/rooms.json';
import _ from 'lodash';

const app = express();


app.get('/', (req, res, next) => {
    res.render('index', {title : "Home"});
});

app.gert('/admin/rooms', (req, res, next) => {
    res.render('rooms', {
        title: "Admin Rooms",
        rooms: rooms
    })
});

app.get('/admin/rooms/add', (req, res, next) => {
    res.render('add');
});

app.post('/admin/rooms/add', (req, res, next) => {
    let room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);
    res.redirect("/admin/rooms");
})
app.get('/admin/rooms/edit/:id', (req, res, next) => {
    let roomId = req.params.id;
    let room = _.find(rooms, r => r.id === roomId);
    if (!room) {
        res.sendStatus(404);
        return;
    }

    res.render('edit', {room});
});
