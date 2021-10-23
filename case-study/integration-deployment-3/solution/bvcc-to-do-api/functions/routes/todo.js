const express = require("express");
const config = require("config");
const admin = require("firebase-admin");

const router = express.Router();

admin.initializeApp();
const db = admin.firestore();
const collectionPath = config.get("collectionPath");
const collection = db.collection(collectionPath).withConverter({
    toFirestore(item) {
        return {title: "", isComplete: false, user: "unknown", request: null, ...item};
    },
    fromFirestore (snapshot, options) {
        const data = snapshot.data(options);
        return {id: snapshot.id, ...data};
    }
});

router.get("/", async (req, res) => {
    let query = collection;
    req.query || Object.keys(req.query).forEach(k => query = query.where(k, "==", req.query[k]));
    const snapshot = await query.get();
    res.json(snapshot.docs.map(s => s.data()));
});

router.get("/:id", async (req, res) => {
    const reference = collection.doc(req.params.id);
    const snapshot = await reference.get();
    if (!snapshot.exists) {
        res.status(404).send("The item was not found.");
    }
    res.json(snapshot.data());
});

router.post("/", async (req, res) => {
    const reference = await collection.add(req.body);
    const snapshot = await reference.get()
    res.json(snapshot.data());
});

router.put("/:id", async (req, res) => {
    const reference = collection.doc(req.params.id);
    await reference.set(req.body, {merge: true});
    const snapshot = await reference.get();
    res.json(snapshot.data());
});

router.delete("/:id", async (req, res) => {
    await collection.doc(req.params.id).delete();
    res.sendStatus(200);
});

module.exports = router;