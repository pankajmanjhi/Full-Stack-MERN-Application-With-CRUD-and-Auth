const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/e-com",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
});
//mongoose.connect('mongodb://127.0.0.1/test')