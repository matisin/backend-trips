module.exports = {
    async up(db) {
        // Insertar direcciones
        await db.collection('addresses').insertMany([
            {
                _id: "5efc0d7da7076973f1515129",
                lat: -33.580,
                lon: -70.567,
                address: "Avenida Apoquindo 300"
            }
        ]);

        // Insertar viajes
        await db.collection('trips').insertMany([
            {
                _id: "5efc0d7da7076973f1515120",
                start: {
                    time: 1642539928000,
                    lat: -33.580158,
                    lon: -70.567227,
                    address: "Avenida Apoquindo 291"
                },
                end: {
                    time: 1642541428000,
                    lat: -33.580462,
                    lon: -70.567177,
                    address: "Avenida Grecia 1043"
                },
                distance: 10.4,
                duration: 1500000,
                overspeedsCount: 2,
                boundingBox: [
                    { lat: -33.580462, lon: -70.567177 },
                    { lat: -33.580432, lon: -70.567147 },
                    { lat: -33.580432, lon: -70.567147 },
                    { lat: -33.580433, lon: -70.567144 }
                ]
            },
            {
                _id: "5efc0d7da7076973f1515121",
                start: {
                    time: 1642541528000,
                    lat: -33.543158,
                    lon: -70.553227,
                    address: "Avenida La Florida 923"
                },
                end: {
                    time: 1642541828000,
                    lat: -33.580542,
                    lon: -70.554177,
                    address: "Avenida El Peñón 65"
                },
                distance: 4.5,
                duration: 300000,
                overspeedsCount: 0,
                boundingBox: [
                    { lat: -33.580462, lon: -70.567177 },
                    { lat: -33.580432, lon: -70.567147 },
                    { lat: -33.580432, lon: -70.567147 },
                    { lat: -33.580433, lon: -70.567144 }
                ]
            },
            // ... (insertar los otros viajes aquí)
        ]);

        // Crear índices si es necesario
        await db.collection('addresses').createIndex({ lat: 1, lon: 1 });
        await db.collection('trips').createIndex({ "start.time": 1 });
    },

    async down(db) {
        // Eliminar datos
        await db.collection('addresses').deleteMany({});
        await db.collection('trips').deleteMany({});

        // Eliminar índices si es necesario
        await db.collection('addresses').dropIndex({ lat: 1, lon: 1 });
        await db.collection('trips').dropIndex({ "start.time": 1 });
    }
};
