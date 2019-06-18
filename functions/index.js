const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();

var db = firebase.firestore();

// api calls
var usersRef = db.collection('users');

app.post('/api/users', async (req, res) => {
    console.log("Inside the posting of USERS *******");
    let curUser = req.body.user;

    try {
        let querySnapshot = await usersRef.get();
        let numRecords = querySnapshot.docs.length;

        curUser.index = numRecords
        
        usersRef.doc(curUser.email.toString()).set(curUser);
        res.send(curUser);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});

// Get a list of all of the items in the museum.
app.get('/api/users', async (req, res) => {
    try{
        let querySnapshot = await usersRef.get();
        res.send(querySnapshot.docs.map(doc => doc.data()));
    }catch(err){
        res.sendStatus(500);
    }
});

app.delete('/api/users/:email', async (req,res) => {
    
    // console.log("req.params.id: ", req.params.id.toString());

    let id = req.params.email.toString();

    try {
        var documentToDelete = usersRef.doc(id);
        var doc = await documentToDelete.get();
        if(!doc.exists) {
            res.status(404).send("Sorry, that user doesn't exist");
            return;
        }
        else{
            documentToDelete.delete();
            res.status(200).send("Jerk. You successfully deleted my favorite user:" + req.params.email);
            return;
        }
    }catch(err){
        res.status(500).send("Error deleting document: ", err);
    }
});

app.put('/api/users/:id', async (req,res) => {
    
    // console.log("req.params.id: ", req.params.id.toString());

    let id = req.params.id.toString();

    try {

        var documentToEdit = usersRef.doc(id);
        
        var doc = await documentToEdit.get();

        if(!doc.exists) {
            console.log("That user doesn't exist");
            res.status(404).send("Sorry, that item doesn't exist");
            return;
        }
        else {
            
            documentToEdit.update({index: req.body.index, num: req.body.num});
            console.log("Successfully updated document with id: " + id);
            res.status(200).send("Successfully updated item with id# " + req.params.id);
            return;
        }

    }catch(err) {
        console.log("500 status error while deleting doc");
        res.status(500).send("Error deleting document: ", err);
    }
});

exports.app = functions.https.onRequest(app);