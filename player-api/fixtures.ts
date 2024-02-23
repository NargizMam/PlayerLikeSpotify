import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    }
    catch (e) {
        console.log(`Collection ${collectionName} was missing. skipping drop ...`)
    }
};
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['artists', 'albums', 'tracks'];
    for (const collectionName of collections) {
        await dropCollection(db, collectionName)
    }

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
    const [album1, album2, album3, album4, album5, album6, album7] = await Album.create(
        {
            id: crypto.randomUUID(),
            title: 'Yamakasi',
            artist: artist1.id,
            issueDate: 2020,
            image: 'fixtures/yamakasi.jpeg'
        },
        {
            id: crypto.randomUUID(),
            title: 'Hattori',
            artist: artist1.id,
            issueDate: 2022,
            image: 'fixtures/hattori.jpeg'
        },
        {
            id: crypto.randomUUID(),
            title: 'Buster Ceaton',
            artist: artist1.id,
            issueDate: 2020,
            image: 'fixtures/buster.jpeg'
        },
        {
            id: crypto.randomUUID(),
            title: 'Zima',
            artist: artist3.id,
            issueDate: 2022,
            image: 'fixtures/zima.jpeg'
        },
        {
            id: crypto.randomUUID(),
            title: 'Сияй',
            artist: artist3.id,
            issueDate: 2018,
            image: 'fixtures/siyay.jpeg'
        },
        {
            id: crypto.randomUUID(),
            title: 'Relaps: Refill',
            artist: artist2.id,
            issueDate: 2009,
            image: 'fixtures/relaps.jpeg'
        },
        {
            id: crypto.randomUUID(),
            title: 'The Marshall Mathers LP 2',
            artist: artist2.id,
            issueDate: 2009,
            image: 'fixtures/marshall.jpeg'
        },
    )
    const [] = await Track.create(
        {
            id: crypto.randomUUID(),
            title: 'Еще хочу',
            album: album5.id,
            duration: '3:26',
            serialNumber: 1
        },
        {
            id: crypto.randomUUID(),
            title: 'Сияй',
            album: album5.id,
            duration: '3:26',
            serialNumber: 2
        },
        {
            id: crypto.randomUUID(),
            title: 'Тра ля ',
            album: album5.id,
            duration: '4:26',
            serialNumber: 3
        },
        {
            id: crypto.randomUUID(),
            title: 'Тра ля ',
            album: album5.id,
            duration: '4:26',
            serialNumber: 4
        },
        {
            id: crypto.randomUUID(),
            title: 'Можно ',
            album: album5.id,
            duration: '4:26',
            serialNumber: 5
        },
        {
            id: crypto.randomUUID(),
            title: 'Айсберг',
            album: album4.id,
            duration: '3:03',
            serialNumber: 4
        },
        {
            id: crypto.randomUUID(),
            title: 'Дискотека на двоих',
            album: album4.id,
            duration: '3:04',
            serialNumber: 5
        },
        {
            id: crypto.randomUUID(),
            title: 'Возможно',
            album: album4.id,
            duration: '3:04',
            serialNumber: 3
        }, {
            id: crypto.randomUUID(),
            title: 'Не знаю',
            album: album4.id,
            duration: '3:04',
            serialNumber: 2
        }, {
            id: crypto.randomUUID(),
            title: 'Нельзя',
            album: album4.id,
            duration: '3:04',
            serialNumber: 1
        },
        {
            id: crypto.randomUUID(),
            title: 'Dr. West Skit',
            album: album6.id,
            duration: '1:03',
            serialNumber: 1
        },
        {
            id: crypto.randomUUID(),
            title: 'My Mom',
            album: album6.id,
            duration: '5:03',
            serialNumber: 2
        },
        {
            id: crypto.randomUUID(),
            title: 'Dr. Skit',
            album: album6.id,
            duration: '1:03',
            serialNumber: 3
        },
        {
            id: crypto.randomUUID(),
            title: 'My sister',
            album: album6.id,
            duration: '5:03',
            serialNumber: 4
        },
        {
            id: crypto.randomUUID(),
            title: 'My brother',
            album: album6.id,
            duration: '5:03',
            serialNumber: 5
        },
        {
            id: crypto.randomUUID(),
            title: 'Bad Guy',
            album: album7.id,
            duration: '7:14',
            serialNumber: 1
        },
        {
            id: crypto.randomUUID(),
            title: 'So much better',
            album: album7.id,
            duration: '7:14',
            serialNumber: 2
        },
        {
            id: crypto.randomUUID(),
            title: 'Good',
            album: album7.id,
            duration: '7:14',
            serialNumber: 3
        },
        {
            id: crypto.randomUUID(),
            title: 'Find',
            album: album7.id,
            duration: '7:14',
            serialNumber: 4
        },
        {
            id: crypto.randomUUID(),
            title: 'Better',
            album: album7.id,
            duration: '7:14',
            serialNumber: 5
        },
        {
            id: crypto.randomUUID(),
            title: 'Intro',
            album: album3.id,
            duration: '1:03',
            serialNumber: 2
        },
        {
            id: crypto.randomUUID(),
            title: 'Bad',
            album: album3.id,
            duration: '1:03',
            serialNumber: 1
        },
        {
            id: crypto.randomUUID(),
            title: 'Good',
            album: album3.id,
            duration: '1:03',
            serialNumber: 3
        },
        {
            id: crypto.randomUUID(),
            title: 'Fine',
            album: album3.id,
            duration: '1:03',
            serialNumber: 4
        },
        {
            id: crypto.randomUUID(),
            title: 'Later',
            album: album3.id,
            duration: '1:03',
            serialNumber: 5
        },
        {
            id: crypto.randomUUID(),
            title: 'Saloon',
            album: album2.id,
            duration: '3:03',
            serialNumber: 1
        },
        {
            id: crypto.randomUUID(),
            title: 'Временно',
            album: album2.id,
            duration: '4:03',
            serialNumber: 3
        },
        {
            id: crypto.randomUUID(),
            title: 'Moon',
            album: album2.id,
            duration: '3:03',
            serialNumber: 2
        },
        {
            id: crypto.randomUUID(),
            title: 'Мое солнце',
            album: album2.id,
            duration: '3:03',
            serialNumber: 5
        },
        {
            id: crypto.randomUUID(),
            title: 'Mother',
            album: album2.id,
            duration: '4:03',
            serialNumber: 4
        },
        {
            id: crypto.randomUUID(),
            title: 'Атлант',
            album: album1.id,
            duration: '3:07',
            serialNumber: 5
        },
        {
            id: crypto.randomUUID(),
            title: 'Атлант',
            album: album1.id,
            duration: '3:07',
            serialNumber: 4
        },
        {
            id: crypto.randomUUID(),
            title: 'Психопатия',
            album: album1.id,
            duration: '3:29',
            serialNumber: 3
        },
        {
            id: crypto.randomUUID(),
            title: 'Мозг',
            album: album1.id,
            duration: '3:07',
            serialNumber: 2
        },
        {
            id: crypto.randomUUID(),
            title: 'Лучшее',
            album: album1.id,
            duration: '3:29',
            serialNumber: 1
        },
    )


    await db.close();
};

void run();

