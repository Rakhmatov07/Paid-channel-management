const {port} = require('../../config/index');

function run (app) {
    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    })
}

module.exports = run;