const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/login', async (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, 'login.html'));
});

router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body;

    if (password.length < 8) {
        ctx.body = 'To has³o jest zbyt krótkie';
        return;
    }

    if (username === 'admin' && password === 'adminadmin') {
        ctx.body = 'Zalogowany!';
    } else {
        ctx.body = 'Nieprawid³owa nazwa u¿ytkownika lub has³o';
    }
});

router.put('/login', async (ctx) => {
    ctx.body = 'Odebra³em polecenie PUT';
});

router.delete('/login', async (ctx) => {
    ctx.body = 'Odebra³em polecenie DELETE';
});

router.patch('/login', async (ctx) => {
    ctx.body = 'Odebra³em polecenie PATCH';
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
