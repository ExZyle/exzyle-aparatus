import { ExzyleParameterHolder } from './ExzyleParameterHolder.class';
/**
 * ExzyleAttributeHolder provides a base class for managing parameters and namespaced attributes.
 * @typeparam P Generic type for parameters.
 * @typeparam A Generic type for attributes.
 */
export declare class ExzyleAttributeHolder<P, A> extends ExzyleParameterHolder<P> {
    /**
     * A map of attribute namespaces.
     */
    protected attributeMap: Map<string, Map<string, A>>;
    /**
     * The default attribute namespace.
     */
    protected _defaultNamespace: string;
    constructor(initialParameters?: Map<string, P>);
    /**
     * Retrieves the name of the default namespace.
     */
    get defaultNamespace(): string;
    /**
     * Clears all attributes
     */
    clearAttributes(): void;
    /**
     * Retrieves an attribute.
     *
     * If no namespace is provided, the default namespace is used.
     *
     * A default value can be passed and will be returned if the attribute is not set.
     * @param attributeName The name of the attribute.
     * @param namespace The namespace for the attribute.
     * @param defaultValue A default value if the attribute is not set.
     */
    getAttribute(attributeName: string, namespace?: string | undefined, defaultValue?: A | undefined): A | undefined;
    /**
     * Retreives an array of attribute names.
     *
     * If no namespace is provided the default namespace will be used.
     * @param nameSpace The namespace for the attribute.
     */
    getAttributeNames(nameSpace?: string | undefined): Set<string>;
    /**
     * Retrieves all attributes in a namespace.
     *
     * If no namespace is provided the default namespace will be used.
     * @param namespace The namespace for the attributes.
     */
    getAttributes(namespace?: string | undefined): Map<string, A>;
    /**
     * Retrieves all the attribute namespaces.
     */
    get namespaces(): Set<string>;
    /**
     * Determines if an attribute name has been set.
     *
     * If no namespace is provided the default namespace will be used.
     * @param attributeName The attribute name.
     * @param namespace The namespace for the attribute.
     */
    hasAttribute(attributeName: string, namespace?: string | undefined): boolean;
    /**
     * Determines if a namespace exists.
     * @param namespace An attribute namespace.
     */
    hasNamespace(namespace: string): boolean;
    /**
     * Removes an attribute and returns the existing value if it is set.
     *
     * If the attribute does not exist it will return undefined.
     * @param attributeName The attribute name.
     * @param namespace The namespace for the attribute.
     */
    removeAttribute(attributeName: string, namespace?: string): A | undefined;
    /**
     * Removes an attribute namespace and all associated attributes.
     *
     * The removed attribute map will be returned or undefined if the namespace
     * doesn't exist.
     * @param namespace An attribute namespace.
     */
    removeAttributeNamespace(namespace: string): Map<string, A>;
    /**
     * Sets an attribute's value.
     *
     * If no namespace is provided the default namespace will be used.
     *
     * If the namespace doesn't exist it will be created.
     * @param attributeName The attribute name.
     * @param value The attribute value.
     * @param namespace An attribute namespace.
     */
    setAttribute(attributeName: string, value: A, namespace?: string): void;
    /**
     * Merges in a map or keyed object of attributes.
     * @param attributes The attributes to be set/merged.
     * @param namespace An attribute namespace.
     */
    setAttributes(attributes: Map<string, A>, namespace?: string): void;
}
