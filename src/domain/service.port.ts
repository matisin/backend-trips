/**
 * Tipo que representa el resultado de una operación.
 * @template T - El tipo de dato del resultado exitoso.
 * @returns Una tupla donde el primer elemento es el resultado y el segundo es un error (o null si no hay error).
 */
export type Result<T> = [T, Error | null]

/**
 * Representa una geolocalización con tiempo y dirección.
 */
export type Geolocation = {
    /** Tiempo en milisegundos desde la época Unix */
    time: number
    /** Latitud en grados decimales */
    lat: number
    /** Longitud en grados decimales */
    lon: number
    /** Dirección correspondiente a las coordenadas */
    address: string
}

/**
 * Representa un par de coordenadas geográficas.
 */
export type Coordinates = {
    /** Latitud en grados decimales */
    lat: number
    /** Longitud en grados decimales */
    lon: number
}

/**
 * Representa un viaje completo con sus detalles.
 */
export type Trip = {
    /** Identificador único del viaje */
    id?: string
    /** Información de inicio del viaje */
    start: Geolocation
    /** Información de fin del viaje */
    end: Geolocation
    /** Distancia total del viaje */
    distance: number
    /** Duración total del viaje en milisegundos */
    duration: number
    /** Número de segmentos con exceso de velocidad */
    overspeedsCount: number
    /** Array de coordenadas que definen el bounding box del viaje */
    boundingBox: Coordinates[]
}

/**
 * Representa una lectura individual durante un viaje.
 */
export type Reading = {
    /** Tiempo de la lectura en milisegundos desde la época Unix */
    time?: number
    /** Velocidad actual en la unidad correspondiente */
    speed: number
    /** Límite de velocidad en la ubicación actual */
    speedLimit: number
    /** Coordenadas de la lectura */
    location: Coordinates
}

/**
 * Clase abstracta que define los casos de uso para un servicio de trips.
 * Este es el contrato que utilizan los adaptadores primarios (como web).
 */
export abstract class Service {
    /**
    * Obtiene una lista de viajes basada en los criterios especificados.
    * @param limit - Número máximo de resultados a devolver
    * @param offset - Número de resultados a omitir (para paginación)
    * @param startGte - (Opcional) Tiempo de inicio mínimo para filtrar viajes (en milisegundos desde la época Unix)
    * @param startLte - (Opcional) Tiempo de inicio máximo para filtrar viajes (en milisegundos desde la época Unix)
    * @param distanceGte - (Opcional) Distancia mínima para filtrar viajes (en la unidad de medida correspondiente)
    * @returns Una promesa que resuelve a un Result con un array de Trips
    */
    abstract getTrips: (limit: number, offset: number, startGte?: number, startLte?: number, distanceGte?: number)
        => Promise<Result<Trip[]>>

    /**
     * Crea un nuevo viaje a partir de una serie de lecturas.
     * @param readings - Array de lecturas que componen el viaje
     * @returns Una promesa que resuelve a un Result con el ID del nuevo viaje creado
     */
    abstract newTrip: (readings: Reading[]) => Promise<Result<string>>
}
