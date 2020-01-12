/**
 * ExzyleParameterHolder provides a base class for managing parameters.
 * @typeparam V Generic type for paramter values.
 */
export declare class ExzyleParameterHolder<V> {
    /**
     * Internal storage of parameters.
     */
    private parameterMap;
    /**
     * Constructor accepts an initial map of parameters.
     * @param initialParameters
     */
    constructor(initialParameters?: Map<string, V>);
    /**
     * Clears all parameters.
     */
    clearParameters(): void;
    /**
     * Retrieves the named parameter.
     * @param parameterName The name of the parameter.
     * @param defaultValue A default value returned if the parameter has not been set.
     * @returns The value associated with the parameter or the defaultValue if the parameter is not set.
     */
    getParameter(parameterName: string, defaultValue?: V | undefined): V | undefined;
    /**
     * Retrieves a set of parameter names.
     */
    get parameterNames(): Set<string>;
    /**
     * Retrieves a Map of the parameters. The returned map is a shallow clone of the internal
     * parameter map store.
     */
    get parameters(): Map<string, V>;
    /**
     * Indicates if the named parameter exists.
     * @param parameterName The name of the parameter.
     */
    hasParameter(parameterName: string): boolean;
    /**
     * Removes the named parameter. Returns the value of the parameter if it exists,
     * otherwise it returns undefined.
     * @param parameterName The name of the parameter.
     * @returns Previous value of the parameter or undefined if it is not set.
     */
    removeParameter(parameterName: string): V | undefined;
    /**
     * Sets the named parameter's value.
     * @param parameterName The name of the parameter.
     * @param value The value to associate with the parameter
     */
    setParameter(parameterName: string, value: V): void;
    /**
     * Merges in a map or keyed object of parameters.
     */
    setParameters(parameters: Map<string, V>): void;
}
