import { Result } from "./service.port"

/**
 * Clase abstracta que define la interfaz para servicios de geolocalización.
 * Proporciona métodos para obtener direcciones a partir de coordenadas geográficas.
 */
export abstract class Geocoding {
    /**
     * Obtiene la dirección correspondiente a las coordenadas geográficas proporcionadas.
     * 
     * @param lat - Latitud de la ubicación en grados decimales.
     * @param lon - Longitud de la ubicación en grados decimales.
     * @returns Una promesa que resuelve a un Result conteniendo la dirección como string.
     *          En caso de éxito, el Result contendrá la dirección.
     *          En caso de error, el Result contendrá null como primer elemento y el error como segundo.
     */
    abstract getAddress: (lat: number, lon: number) => Promise<Result<string>>
}
