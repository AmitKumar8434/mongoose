const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/ttchannel", { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})
    .then(() => console.log("connection successful!!"))
    .catch((err) => console.log(err));
    
//Schema:A Mongoose schema defines the structure of the document,
//default values,validators,etc.
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
        lowercase: true,
        trim: true,
        minlength: [2,"Min length is 2"],
        maxlength:10,
    },
    ctype: {
        type: String,
        lowercase: true,
        required:true,
        enum:["frontend","backend","database"],
    },
    videos: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Negative!!!!!!!!!!!!!!!!!!!!");
            }
        }
    },
    author: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email!!!!!!!!!!!!!!!!!!");
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default:Date.now
    }
})

//A Mongoose model is a wrapper on the Mongoose schema.
//A mongoose schema defines the structure of the document,
//default values,validators,etc, whereas a Mongoose model
//provides an interface to the database for creating,
//quering,updating,deleting records,etc.

//collection creation:-
const Playlist = new mongoose.model("Playlist", playlistSchema);

//Create or insert a document
const createDocument = async () => {
    try {
        // const jsPlaylist = new Playlist({
        //     name: "javascript",
        //     ctype: "Front End",
        //     videos: 150,
        //     author: "Thapa Technical",
        //     active: true,
        // })
        const mongoPlaylist = new Playlist({
            name: "moongoose",
            ctype: "Database",
            videos: 15,
            author: "Thapa Technical",
            email:"thapyo@go.com",
            active: true,
        })
        // const expressPlaylist = new Playlist({
        //     name: "Express JS",
        //     ctype: "Backend",
        //     videos: 20,
        //     author: "Thapa Technical",
        //     active: true,
        // })
        const result = await Playlist.insertMany([mongoPlaylist]);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
createDocument();


const getDocument = async () => {
    try {
        const result = await Playlist
            .find({ $or: [{ ctype: "Back End" }, { author: "Thapa Technical" }] })
            .select({ name: -1 })
            // .countDocuments()
            .sort({name:-1});
            // .limit(1);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

const updateDocument = async (_id) => {
    try {
        const result = await Playlist.updateOne({ _id }, {
            $set: {
                name: "Javascript"
            }
        });
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

// getDocument();
updateDocument("61004e7a4b429130a8e78b9b");

//delete document


const deleteDocument = async (_id) => {
    try {
        const result = await Playlist.findByIdAndDelete({ _id });
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
// deleteDocument("6102e297a0f1ab29c4096a21");