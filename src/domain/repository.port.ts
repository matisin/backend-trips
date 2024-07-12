import { Result, Trip } from "./service.port"

/**
 * Clase abstracta que define la interfaz para el repositorio de datos de trips.
 * Actúa como puerto secundario que el servicio debe utilizar.
 */
export abstract class Repository {
    /**
     * Inserta un viaje en el repositorio.
     * @param trip - Objeto Trip a insertar
     * @returns Una promesa que resuelve a un Result con el ID o identificador de la operación de inserción
     */
    abstract insertTrip: (trip: Trip) => Promise<Result<string>>

    /**
     * Busca viajes en el repositorio según los criterios especificados.
     * @param limit - Número máximo de resultados a devolver
     * @param offset - Número de resultados a omitir (para paginación)
     * @param startGte - (Opcional) Tiempo de inicio mínimo para filtrar viajes (en milisegundos desde la época Unix)
     * @param startLte - (Opcional) Tiempo de inicio máximo para filtrar viajes (en milisegundos desde la época Unix)
     * @param distanceGte - (Opcional) Distancia mínima para filtrar viajes (en la unidad de medida correspondiente)
     * @returns Una promesa que resuelve a un Result con un array de objetos Trip
     */
    abstract findTrips: (
        limit: number, offset: number, startGte?: number, startLte?: number, distanceGte?: number
    ) => Promise<Result<Trip[]>>

    /**
     * Inserta una nueva dirección asociada a las coordenadas geográficas proporcionadas.
     * 
     * @param lat - Latitud de la ubicación en grados decimales.
     * @param lon - Longitud de la ubicación en grados decimales.
     * @param address - Dirección a almacenar asociada con las coordenadas.
     * @returns Una promesa que resuelve a un Result.
     *          En caso de éxito, el Result contendrá un identificador único de la inserción como string.
     *          En caso de error, el Result contendrá null como primer elemento y el error como segundo.
     */
    abstract insertAddress: (lat: number, lon: number, address: string) => Promise<Result<string>>

    /**
     * Obtiene la dirección correspondiente a las coordenadas geográficas proporcionadas.
     * 
     * @param lat - Latitud de la ubicación en grados decimales.
     * @param lon - Longitud de la ubicación en grados decimales.
     * @returns Una promesa que resuelve a un Result.
     *          En caso de éxito, el Result contendrá la dirección como string.
     *          En caso de error (por ejemplo, si no se encuentra una dirección), 
     *          el Result contendrá null como primer elemento y el error como segundo.
     */
    abstract findAddress: (lat: number, lon: number) => Promise<Result<string>>
}
