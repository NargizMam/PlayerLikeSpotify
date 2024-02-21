import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Artist from "./models/Artist";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try{
       await db.dropCollection(collectionName);
    }catch (e) {
        console.log(`Collection ${collectionName} was missing. skipping derop ...`)
    }
};
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['artists', 'albums', 'tracks', 'trackHistory', 'users'];
    for (const collectionName of collections){
        await dropCollection(db, collectionName)
    }
    const [user1, user2, user3] = await User.create({
            username: 'Misha',
            password: "123",
            token: crypto.randomUUID()
        },
        {
            username: 'Anna',
            password: '0000',
            token: crypto.randomUUID()
        },
        {
            username: 'John',
            password: "456",
            token: crypto.randomUUID()
        });
    const [artist1, artist2, artist3] = await Artist.create(
        {
        name: 'MiaGy',
        image: 'fixtures/miyagi.jpg',
        id: crypto.randomUUID()
        },
        {
            name: 'Eminem',
            image: 'fixtures/eminem.jpg',
            id: crypto.randomUUID()
        },
        {
            name: 'Zivert',
            image: 'fixtures/zivert.jpg',
            id: crypto.randomUUID()
        },
    )
    await db.close();
};

void run();
