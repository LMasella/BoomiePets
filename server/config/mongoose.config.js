const mongoose = require('mongoose');
const DB = 'boomiePets';

mongoose.connect(`mongodb://localhost/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established a connection to ${DB} database`))
    .catch(err => console.log(`Something went wrong when connecting to ${DB} database`, err));