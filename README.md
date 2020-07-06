# LearnVault
A way to organize, share and discover great developer links of tutorials, blogs, and podcasts.

![](getting-started/learnvault.png?raw=true)

## Project Structure
- /client
  > React project
- /server
  > Node-Express project (using MongoDB)

## Getting Started
- After cloning
  - cd into both client and server and `npm install`,
  - then `npm start` in either client or server folder.
- Project uses concurrently to invoke both React (port 8080) and Node (port 5000).
- To seed the Mongo DB use the following:
  - [User Collection](getting-started/users.json)
  - [Collections Collection](getting-started/collections.json)

  - Example `mongoimport` commands.  The values for your DB can be found in Atlas, under Clusters -> Collections -> Command Lines Tools -> Data Import and Export Tools section:
  <pre><code>mongoimport --host YOUR_MONGO_CLUSTER --ssl --username USERNAME --password PASSWORD --authenticationDatabase admin --db DB --collection collections --type json --file ../getting-started/collections.json --jsonArray</code></pre>

  <pre><code>mongoimport --host YOUR_MONGO_CLUSTER --ssl --username USERNAME --password PASSWORD --authenticationDatabase admin --db DB --collection users --type json --file ../getting-started/users.json --jsonArray</code></pre>
- Project uses an `.env` file to store sensitive data.  Create one in the root of `./server` and store the following values
  - `DB=MONGO_DB_CONNECTION_STRING` (can be found in Atlas, under Clusters -> Connect -> Connect your application)
  - `PORT=SERVER_PORT` (the code will default to 5000)

## Future work:
1. Save Button
    - Currently saves to dabase (BE done) but UI FE requires work.
2. Usage of fontawesome is currently via CDN.
    - npm a fontawesome package for performance.

[Scratch Project Presentation Deck](https://bit.ly/Peridot-Demo)
