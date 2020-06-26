// server-handlers.js
// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import { rest } from 'msw'; // msw supports graphql too!

const handlers = [
  rest.get('/login', async (req, res, ctx) => res(ctx.json({ success: true }))),
  rest.post('/checkout', async (req, res, ctx) => res(ctx.json({ succes: true }))),
];

export { handlers };
