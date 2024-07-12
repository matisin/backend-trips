/**
 * Error lanzado cuando un recurso no se encuentra en el sistema.
 */
export class NotFound extends Error {
    /**
     * @param resource Nombre del recurso que no se encontró.
     */
    constructor(resource: string) {
        super(`${resource} does not exist`)
    }
}

/**
 * Error lanzado cuando falla la inserción de un recurso en el sistema.
 */
export class InsertError extends Error {
    /**
     * @param resource Nombre del recurso que no se pudo insertar.
     */
    constructor(resource: string) {
        super(`Could not insert ${resource}`)
    }
}

/**
 * Error lanzado cuando un campo no cumple con los criterios de validación.
 */
export class ValidationError extends Error {
    /**
     * @param field Nombre del campo que falló la validación.
     * @param message Descripción del error de validación.
     */
    constructor(field: string, message: string) {
        super(`Field ${field} should be  ${message}`)
    }
}

/**
 * Error lanzado cuando los readings no alcanzan la cantidad suficiente
 */
export class InsufficientReadingsError extends Error {
    /**
     * @param amount Cantidad de recordings minima esperada
     */
    constructor(amount: number) {
        super(`At least ${amount} readings are required`)
    }
}

/**
 * Error lanzado cuando a algun reading le falta el time
 */
export class MissingTimeReading extends Error {
    constructor() {
        super('All readings must have a time property')
    }
}

/**
 * Error lanzado cuando el servicio de geolocalizacion no encuentra la direccion para las coordenadas
 * especificadas
 */
export class AddressNotFound extends Error {
    /**
     * @param lat - Latitud de la ubicación en grados decimales.
     * @param lon - Longitud de la ubicación en grados decimales.
     */
    constructor(lat: number, lon: number) {
        super(`could not find address for lat ${lat} and lon ${lon}`)
    }
}
