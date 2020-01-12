"use strict";
/*
  Exyle Aparatus: A set of utilities and tools for data storage and manipulation.
  Copyright (C) 2020  Exzyle <exzyle@protonmail.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const ExzyleParameterHolder_class_1 = require("./ExzyleParameterHolder.class");
/**
 * ExzyleAttributeHolder provides a base class for managing parameters and namespaced attributes.
 * @typeparam P Generic type for parameters.
 * @typeparam A Generic type for attributes.
 */
class ExzyleAttributeHolder extends ExzyleParameterHolder_class_1.ExzyleParameterHolder {
    constructor(initialParameters) {
        super(initialParameters);
        /**
         * The default attribute namespace.
         */
        this._defaultNamespace = 'com.exzyle';
        this.attributeMap = new Map([
            [this._defaultNamespace, new Map()],
        ]);
    }
    /**
     * Retrieves the name of the default namespace.
     */
    get defaultNamespace() {
        return this._defaultNamespace;
    }
    /**
     * Clears all attributes
     */
    clearAttributes() {
        this.attributeMap = new Map([
            [this.defaultNamespace, new Map()],
        ]);
    }
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
    getAttribute(attributeName, namespace = undefined, defaultValue = undefined) {
        if (!namespace) {
            namespace = this.defaultNamespace;
        }
        if (this.hasNamespace(namespace)) {
            const attributes = this.getAttributes(namespace);
            if (attributes.has(attributeName)) {
                return attributes.get(attributeName);
            }
        }
        return defaultValue;
    }
    /**
     * Retreives an array of attribute names.
     *
     * If no namespace is provided the default namespace will be used.
     * @param nameSpace The namespace for the attribute.
     */
    getAttributeNames(nameSpace = undefined) {
        if (!nameSpace) {
            nameSpace = this.defaultNamespace;
        }
        if (this.attributeMap.has(nameSpace)) {
            const attributes = this.attributeMap.get(nameSpace);
            return new Set([...attributes.keys()]);
        }
        return new Set();
    }
    /**
     * Retrieves all attributes in a namespace.
     *
     * If no namespace is provided the default namespace will be used.
     * @param namespace The namespace for the attributes.
     */
    getAttributes(namespace = undefined) {
        if (!namespace) {
            namespace = this.defaultNamespace;
        }
        if (this.attributeMap.has(namespace)) {
            const attributes = this.attributeMap.get(namespace);
            return new Map(attributes.entries());
        }
        return new Map();
    }
    /**
     * Retrieves all the attribute namespaces.
     */
    get namespaces() {
        return new Set([...this.attributeMap.keys()]);
    }
    /**
     * Determines if an attribute name has been set.
     *
     * If no namespace is provided the default namespace will be used.
     * @param attributeName The attribute name.
     * @param namespace The namespace for the attribute.
     */
    hasAttribute(attributeName, namespace = this.defaultNamespace) {
        if (this.attributeMap.has(namespace)) {
            const attributes = this.getAttributes(namespace);
            return attributes.has(attributeName);
        }
        return false;
    }
    /**
     * Determines if a namespace exists.
     * @param namespace An attribute namespace.
     */
    hasNamespace(namespace) {
        return this.attributeMap.has(namespace);
    }
    /**
     * Removes an attribute and returns the existing value if it is set.
     *
     * If the attribute does not exist it will return undefined.
     * @param attributeName The attribute name.
     * @param namespace The namespace for the attribute.
     */
    removeAttribute(attributeName, namespace = this.defaultNamespace) {
        if (this.hasAttribute(attributeName, namespace)) {
            const attributeValue = this.getAttribute(attributeName, namespace);
            this.attributeMap.get(namespace).delete(attributeName);
            return attributeValue;
        }
        return undefined;
    }
    /**
     * Removes an attribute namespace and all associated attributes.
     *
     * The removed attribute map will be returned or undefined if the namespace
     * doesn't exist.
     * @param namespace An attribute namespace.
     */
    removeAttributeNamespace(namespace) {
        if (this.hasNamespace(namespace)) {
            const attributes = this.getAttributes(namespace);
            this.attributeMap.delete(namespace);
            if (namespace === this.defaultNamespace) {
                this.attributeMap.set(this.defaultNamespace, new Map());
            }
            return attributes;
        }
        return new Map();
    }
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
    setAttribute(attributeName, value, namespace = this.defaultNamespace) {
        if (!this.attributeMap.has(namespace)) {
            this.attributeMap.set(namespace, new Map());
        }
        const attributes = this.attributeMap.get(namespace);
        attributes.set(attributeName, value);
    }
    /**
     * Merges in a map or keyed object of attributes.
     * @param attributes The attributes to be set/merged.
     * @param namespace An attribute namespace.
     */
    setAttributes(attributes, namespace = this.defaultNamespace) {
        if (!this.hasNamespace(namespace)) {
            this.attributeMap.set(namespace, new Map());
        }
        const existingAttributes = this.getAttributes(namespace);
        const newAttributes = new Map([
            ...existingAttributes.entries(),
            ...attributes.entries(),
        ]);
        this.attributeMap.set(namespace, newAttributes);
    }
}
exports.ExzyleAttributeHolder = ExzyleAttributeHolder;
