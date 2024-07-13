const { ObjectId } = require('mongodb');
module.exports = {
    async up(db) {
        await db.collection('addresses').insertMany([
            {
                _id: new ObjectId("5efc0d7da7076973f1515129"),
                lat: -33.580,
                lon: -70.567,
                address: "Avenida Apoquindo 300"
            }
        ]);
        await db.collection('trips').insertMany([
            {
                _id: new ObjectId("5efc0d7da7076973f1515120"),
                start: {
                    time: 1720108800000,
                    lat: -33.580158,
                    lon: -70.567227,
                    address: "Avenida Apoquindo 291"
                },
                end: {
                    time: 1720110300000,
                    lat: -33.581462,
                    lon: -70.566177,
                    address: "Avenida Apoquindo 1100"
                },
                distance: 1.2,
                duration: 1500000,
                overspeedsCount: 2,
                boundingBox: [
                    { lat: -33.580158, lon: -70.567227 },
                    { lat: -33.581462, lon: -70.566177 },
                    { lat: -33.581462, lon: -70.567227 },
                    { lat: -33.580158, lon: -70.566177 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515121"),
                start: {
                    time: 1720123200000,
                    lat: -33.543158,
                    lon: -70.553227,
                    address: "Avenida La Florida 923"
                },
                end: {
                    time: 1720123500000,
                    lat: -33.581542,
                    lon: -70.554177,
                    address: "Avenida El Peñón 65"
                },
                distance: 4.5,
                duration: 300000,
                overspeedsCount: 0,
                boundingBox: [
                    { lat: -33.543158, lon: -70.554177 },
                    { lat: -33.581542, lon: -70.553227 },
                    { lat: -33.581542, lon: -70.554177 },
                    { lat: -33.543158, lon: -70.553227 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515122"),
                start: {
                    time: 1720195200000,
                    lat: -33.450229,
                    lon: -70.673123,
                    address: "Alameda 1340"
                },
                end: {
                    time: 1720197000000,
                    lat: -33.418671,
                    lon: -70.604349,
                    address: "Av. Providencia 1208"
                },
                distance: 8.7,
                duration: 1800000,
                overspeedsCount: 1,
                boundingBox: [
                    { lat: -33.450229, lon: -70.673123 },
                    { lat: -33.418671, lon: -70.604349 },
                    { lat: -33.418671, lon: -70.673123 },
                    { lat: -33.450229, lon: -70.604349 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515123"),
                start: {
                    time: 1720209600000,
                    lat: -33.516788,
                    lon: -70.598671,
                    address: "Av. Vicuña Mackenna 4860"
                },
                end: {
                    time: 1720210800000,
                    lat: -33.457184,
                    lon: -70.664087,
                    address: "Nataniel Cox 125"
                },
                distance: 12.3,
                duration: 1200000,
                overspeedsCount: 3,
                boundingBox: [
                    { lat: -33.516788, lon: -70.664087 },
                    { lat: -33.457184, lon: -70.598671 },
                    { lat: -33.457184, lon: -70.664087 },
                    { lat: -33.516788, lon: -70.598671 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515124"),
                start: {
                    time: 1720281600000,
                    lat: -33.401944,
                    lon: -70.572902,
                    address: "Av. Las Condes 12340"
                },
                end: {
                    time: 1720282800000,
                    lat: -33.418671,
                    lon: -70.604349,
                    address: "Av. Providencia 1208"
                },
                distance: 6.2,
                duration: 1200000,
                overspeedsCount: 0,
                boundingBox: [
                    { lat: -33.401944, lon: -70.604349 },
                    { lat: -33.418671, lon: -70.572902 },
                    { lat: -33.418671, lon: -70.604349 },
                    { lat: -33.401944, lon: -70.572902 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515125"),
                start: {
                    time: 1720296000000,
                    lat: -33.423616,
                    lon: -70.604349,
                    address: "Av. Providencia 1500"
                },
                end: {
                    time: 1720297200000,
                    lat: -33.447877,
                    lon: -70.570378,
                    address: "Av. Ossa 1800"
                },
                distance: 5.8,
                duration: 1200000,
                overspeedsCount: 1,
                boundingBox: [
                    { lat: -33.447877, lon: -70.604349 },
                    { lat: -33.423616, lon: -70.570378 },
                    { lat: -33.423616, lon: -70.604349 },
                    { lat: -33.447877, lon: -70.570378 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515126"),
                start: {
                    time: 1720368000000,
                    lat: -33.447877,
                    lon: -70.570378,
                    address: "Av. Ossa 1800"
                },
                end: {
                    time: 1720369200000,
                    lat: -33.518327,
                    lon: -70.544221,
                    address: "Av. Tobalaba 11000"
                },
                distance: 9.4,
                duration: 1200000,
                overspeedsCount: 2,
                boundingBox: [
                    { lat: -33.518327, lon: -70.570378 },
                    { lat: -33.447877, lon: -70.544221 },
                    { lat: -33.447877, lon: -70.570378 },
                    { lat: -33.518327, lon: -70.544221 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515127"),
                start: {
                    time: 1720382400000,
                    lat: -33.518327,
                    lon: -70.544221,
                    address: "Av. Tobalaba 11000"
                },
                end: {
                    time: 1720383600000,
                    lat: -33.586697,
                    lon: -70.567227,
                    address: "Av. Apoquindo 1300"
                },
                distance: 10.2,
                duration: 1200000,
                overspeedsCount: 1,
                boundingBox: [
                    { lat: -33.586697, lon: -70.567227 },
                    { lat: -33.518327, lon: -70.544221 },
                    { lat: -33.518327, lon: -70.567227 },
                    { lat: -33.586697, lon: -70.544221 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515128"),
                start: {
                    time: 1720454400000,
                    lat: -33.586697,
                    lon: -70.567227,
                    address: "Av. Apoquindo 1300"
                },
                end: {
                    time: 1720455600000,
                    lat: -33.417897,
                    lon: -70.605864,
                    address: "Av. Pedro de Valdivia 100"
                },
                distance: 18.7,
                duration: 1200000,
                overspeedsCount: 3,
                boundingBox: [
                    { lat: -33.586697, lon: -70.605864 },
                    { lat: -33.417897, lon: -70.567227 },
                    { lat: -33.417897, lon: -70.605864 },
                    { lat: -33.586697, lon: -70.567227 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515129"),
                start: {
                    time: 1720468800000,
                    lat: -33.417897,
                    lon: -70.605864,
                    address: "Av. Pedro de Valdivia 100"
                },
                end: {
                    time: 1720470000000,
                    lat: -33.452178,
                    lon: -70.675302,
                    address: "Estación Central"
                },
                distance: 8.9,
                duration: 1200000,
                overspeedsCount: 1,
                boundingBox: [
                    { lat: -33.452178, lon: -70.675302 },
                    { lat: -33.417897, lon: -70.605864 },
                    { lat: -33.417897, lon: -70.675302 },
                    { lat: -33.452178, lon: -70.605864 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515130"),
                start: {
                    time: 1720540800000,
                    lat: -33.452178,
                    lon: -70.675302,
                    address: "Estación Central"
                },
                end: {
                    time: 1720542000000,
                    lat: -33.516788,
                    lon: -70.598671,
                    address: "Av. Vicuña Mackenna 4860"
                },
                distance: 11.5,
                duration: 1200000,
                overspeedsCount: 2,
                boundingBox: [
                    { lat: -33.516788, lon: -70.675302 },
                    { lat: -33.452178, lon: -70.598671 },
                    { lat: -33.452178, lon: -70.675302 },
                    { lat: -33.516788, lon: -70.598671 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515131"),
                start: {
                    time: 1720555200000,
                    lat: -33.516788,
                    lon: -70.598671,
                    address: "Av. Vicuña Mackenna 4860"
                },
                end: {
                    time: 1720556400000,
                    lat: -33.580158,
                    lon: -70.567227,
                    address: "Avenida Apoquindo 291"
                },
                distance: 9.8,
                duration: 1200000,
                overspeedsCount: 1,
                boundingBox: [
                    { lat: -33.580158, lon: -70.598671 },
                    { lat: -33.516788, lon: -70.567227 },
                    { lat: -33.516788, lon: -70.598671 },
                    { lat: -33.580158, lon: -70.567227 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515132"),
                start: {
                    time: 1720627200000,
                    lat: -33.580158,
                    lon: -70.567227,
                    address: "Avenida Apoquindo 291"
                },
                end: {
                    time: 1720628400000,
                    lat: -33.401944,
                    lon: -70.572902,
                    address: "Av. Las Condes 12340"
                },
                distance: 20.3,
                duration: 1200000,
                overspeedsCount: 4,
                boundingBox: [
                    { lat: -33.580158, lon: -70.572902 },
                    { lat: -33.401944, lon: -70.567227 },
                    { lat: -33.401944, lon: -70.572902 },
                    { lat: -33.580158, lon: -70.567227 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515133"),
                start: {
                    time: 1720641600000,
                    lat: -33.401944,
                    lon: -70.572902,
                    address: "Av. Las Condes 12340"
                },
                end: {
                    time: 1720642800000,
                    lat: -33.457184,
                    lon: -70.664087,
                    address: "Nataniel Cox 125"
                },
                distance: 13.7,
                duration: 1200000,
                overspeedsCount: 2,
                boundingBox: [
                    { lat: -33.457184, lon: -70.664087 },
                    { lat: -33.401944, lon: -70.572902 },
                    { lat: -33.401944, lon: -70.664087 },
                    { lat: -33.457184, lon: -70.572902 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515134"),
                start: {
                    time: 1720648800000,
                    lat: -33.457184,
                    lon: -70.664087,
                    address: "Nataniel Cox 125"
                },
                end: {
                    time: 1720650000000,
                    lat: -33.518327,
                    lon: -70.544221,
                    address: "Av. Tobalaba 11000"
                },
                distance: 15.9,
                duration: 1200000,
                overspeedsCount: 3,
                boundingBox: [
                    { lat: -33.518327, lon: -70.664087 },
                    { lat: -33.457184, lon: -70.544221 },
                    { lat: -33.457184, lon: -70.664087 },
                    { lat: -33.518327, lon: -70.544221 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515135"),
                start: {
                    time: 1720656000000,
                    lat: -33.518327,
                    lon: -70.544221,
                    address: "Av. Tobalaba 11000"
                },
                end: {
                    time: 1720657200000,
                    lat: -33.450229,
                    lon: -70.673123,
                    address: "Alameda 1340"
                },
                distance: 17.2,
                duration: 1200000,
                overspeedsCount: 3,
                boundingBox: [
                    { lat: -33.518327, lon: -70.673123 },
                    { lat: -33.450229, lon: -70.544221 },
                    { lat: -33.450229, lon: -70.673123 },
                    { lat: -33.518327, lon: -70.544221 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515136"),
                start: {
                    time: 1720663200000,
                    lat: -33.450229,
                    lon: -70.673123,
                    address: "Alameda 1340"
                },
                end: {
                    time: 1720664400000,
                    lat: -33.418671,
                    lon: -70.604349,
                    address: "Av. Providencia 1208"
                },
                distance: 8.9,
                duration: 1200000,
                overspeedsCount: 1,
                boundingBox: [
                    { lat: -33.450229, lon: -70.673123 },
                    { lat: -33.418671, lon: -70.604349 },
                    { lat: -33.418671, lon: -70.673123 },
                    { lat: -33.450229, lon: -70.604349 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515137"),
                start: {
                    time: 1720670400000,
                    lat: -33.418671,
                    lon: -70.604349,
                    address: "Av. Providencia 1208"
                },
                end: {
                    time: 1720671600000,
                    lat: -33.447877,
                    lon: -70.570378,
                    address: "Av. Ossa 1800"
                },
                distance: 5.7,
                duration: 1200000,
                overspeedsCount: 0,
                boundingBox: [
                    { lat: -33.447877, lon: -70.604349 },
                    { lat: -33.418671, lon: -70.570378 },
                    { lat: -33.418671, lon: -70.604349 },
                    { lat: -33.447877, lon: -70.570378 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515138"),
                start: {
                    time: 1720677600000,
                    lat: -33.447877,
                    lon: -70.570378,
                    address: "Av. Ossa 1800"
                },
                end: {
                    time: 1720678800000,
                    lat: -33.516788,
                    lon: -70.598671,
                    address: "Av. Vicuña Mackenna 4860"
                },
                distance: 9.3,
                duration: 1200000,
                overspeedsCount: 1,
                boundingBox: [
                    { lat: -33.516788, lon: -70.598671 },
                    { lat: -33.447877, lon: -70.570378 },
                    { lat: -33.447877, lon: -70.598671 },
                    { lat: -33.516788, lon: -70.570378 }
                ]
            },
            {
                _id: new ObjectId("5efc0d7da7076973f1515139"),
                start: {
                    time: 1720684800000,
                    lat: -33.516788,
                    lon: -70.598671,
                    address: "Av. Vicuña Mackenna 4860"
                },
                end: {
                    time: 1720686000000,
                    lat: -33.580158,
                    lon: -70.567227,
                    address: "Avenida Apoquindo 291"
                },
                distance: 9.8,
                duration: 1200000,
                overspeedsCount: 2,
                boundingBox: [
                    { lat: -33.580158, lon: -70.598671 },
                    { lat: -33.516788, lon: -70.567227 },
                    { lat: -33.516788, lon: -70.598671 },
                    { lat: -33.580158, lon: -70.567227 }
                ]
            }
        ]);
        await db.collection('addresses').createIndex({ lat: 1, lon: 1 });
        await db.collection('trips').createIndex({ "start.time": 1 });
    },
    async down(db) {
        await db.collection('addresses').deleteMany({});
        await db.collection('trips').deleteMany({});
        await db.collection('addresses').dropIndex({ lat: 1, lon: 1 });
        await db.collection('trips').dropIndex({ "start.time": 1 });
    }
}
