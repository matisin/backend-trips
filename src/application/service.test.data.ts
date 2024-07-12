import { Address } from '../adapters/secondary/mock.repository'
import { Reading, Trip } from 'src/domain/service.port'

export const geocodings = [
    { lat: -33.580, lon: -70.567, address: 'Avenida Apoquindo 300' },
    { lat: -33.543, lon: -70.553, address: 'Avenida La Florida 900' },
    { lat: -33.450, lon: -70.673, address: 'Alameda 1300' },
    { lat: -33.419, lon: -70.604, address: 'Av. Providencia 1200' },
    { lat: -33.517, lon: -70.599, address: 'Av. Vicuña Mackenna 4900' },
    { lat: -33.457, lon: -70.664, address: 'Nataniel Cox 100' },
    { lat: -33.402, lon: -70.573, address: 'Av. Las Condes 12300' },
    { lat: -33.581, lon: -70.567, address: 'Avenida Grecia 1000' },
    { lat: -33.581, lon: -70.554, address: 'Avenida El Peñón 70' },
    { lat: -33.582, lon: -70.567, address: 'Avenida Apoquindo 500' },
    { lat: -33.583, lon: -70.566, address: 'Avenida Apoquindo 700' },
    { lat: -33.584, lon: -70.566, address: 'Avenida Apoquindo 900' },
    { lat: -33.585, lon: -70.567, address: 'Avenida Apoquindo 1100' },
    { lat: -33.586, lon: -70.567, address: 'Avenida Apoquindo 1300' },
]

export const addresses: Address[] = [
    {
        id: '5efc0d7da7076973f1515129', lat: -33.580, lon: -70.567, address: 'Avenida Apoquindo 300'
    }
]

export const trips: Trip[] = [
    {
        id: '5efc0d7da7076973f1515120',
        start: {
            time: 1642539928000,
            lat: -33.580158,
            lon: -70.567227,
            address: 'Avenida Apoquindo 291'
        },
        end: {
            time: 1642541428000,
            lat: -33.580462,
            lon: -70.567177,
            address: 'Avenida Grecia 1043'
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
        id: '5efc0d7da7076973f1515121',
        start: {
            time: 1642541528000,
            lat: -33.543158,
            lon: -70.553227,
            address: 'Avenida La Florida 923'
        },
        end: {
            time: 1642541828000,
            lat: -33.580542,
            lon: -70.554177,
            address: 'Avenida El Peñón 65'
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
    {
        id: '5efc0d7da7076973f1515122',
        start: {
            time: 1642542000000,
            lat: -33.450229,
            lon: -70.673123,
            address: 'Alameda 1340'
        },
        end: {
            time: 1642543800000,
            lat: -33.418671,
            lon: -70.604349,
            address: 'Av. Providencia 1208'
        },
        distance: 8.7,
        duration: 1800000,
        overspeedsCount: 1,
        boundingBox: [
            { lat: -33.450229, lon: -70.673123 },
            { lat: -33.418671, lon: -70.604349 },
            { lat: -33.434450, lon: -70.638736 },
            { lat: -33.426340, lon: -70.621827 }
        ]
    },
    {
        id: '5efc0d7da7076973f1515123',
        start: {
            time: 1642544000000,
            lat: -33.516788,
            lon: -70.598671,
            address: 'Av. Vicuña Mackenna 4860'
        },
        end: {
            time: 1642545200000,
            lat: -33.457184,
            lon: -70.664087,
            address: 'Nataniel Cox 125'
        },
        distance: 12.3,
        duration: 1200000,
        overspeedsCount: 3,
        boundingBox: [
            { lat: -33.516788, lon: -70.598671 },
            { lat: -33.457184, lon: -70.664087 },
            { lat: -33.486986, lon: -70.631379 },
            { lat: -33.472085, lon: -70.646729 }
        ]
    },
    {
        id: '5efc0d7da7076973f1515124',
        start: {
            time: 1642545500000,
            lat: -33.401944,
            lon: -70.572902,
            address: 'Av. Las Condes 12340'
        },
        end: {
            time: 1642546700000,
            lat: -33.418671,
            lon: -70.604349,
            address: 'Av. Providencia 1208'
        },
        distance: 6.2,
        duration: 1200000,
        overspeedsCount: 0,
        boundingBox: [
            { lat: -33.401944, lon: -70.572902 },
            { lat: -33.418671, lon: -70.604349 },
            { lat: -33.410307, lon: -70.588625 },
            { lat: -33.414489, lon: -70.596737 }
        ]
    }
]

export const correctTrip: Reading[] = [
    { time: 1642500462000, speed: 30, speedLimit: 50, location: { lat: -33.580158, lon: -70.567227 } },
    { time: 1642500466000, speed: 55, speedLimit: 50, location: { lat: -33.581130, lon: -70.566995 } },
    { time: 1642500470000, speed: 60, speedLimit: 50, location: { lat: -33.582117, lon: -70.566633 } },
    { time: 1642500474000, speed: 45, speedLimit: 50, location: { lat: -33.583078, lon: -70.566408 } },
    { time: 1642500478000, speed: 40, speedLimit: 50, location: { lat: -33.584005, lon: -70.566498 } },
    { time: 1642500482000, speed: 65, speedLimit: 50, location: { lat: -33.585020, lon: -70.566837 } },
    { time: 1642500486000, speed: 35, speedLimit: 50, location: { lat: -33.586038, lon: -70.567265 } },
]

export const insufficientReadingsTrip: Reading[] = [
    { time: 1642500462000, speed: 30, speedLimit: 50, location: { lat: -33.580158, lon: -70.567227 } },
    { time: 1642500466000, speed: 35, speedLimit: 50, location: { lat: -33.581130, lon: -70.566995 } },
    { time: 1642500470000, speed: 40, speedLimit: 50, location: { lat: -33.582117, lon: -70.566633 } },
    { time: 1642500474000, speed: 45, speedLimit: 50, location: { lat: -33.583078, lon: -70.566408 } },
]

export const missingTimeTrip: Reading[] = [
    { time: 1642500462000, speed: 30, speedLimit: 50, location: { lat: -33.580158, lon: -70.567227 } },
    { time: 1642500466000, speed: 35, speedLimit: 50, location: { lat: -33.581130, lon: -70.566995 } },
    { speed: 40, speedLimit: 50, location: { lat: -33.582117, lon: -70.566633 } }, // Falta time
    { time: 1642500474000, speed: 45, speedLimit: 50, location: { lat: -33.583078, lon: -70.566408 } },
    { time: 1642500478000, speed: 50, speedLimit: 50, location: { lat: -33.584005, lon: -70.566498 } },
]
