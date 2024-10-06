import {app, port} from "./server.js";
import dbConnection from "./util/database.js";  // for mongoose connection

dbConnection();

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});