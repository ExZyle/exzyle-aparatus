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

import { ExzyleParameterHolder } from './ExzyleParameterHolder.class';

/**
 * ExzyleAttributeHolder provides a base class for managing parameters and namespaced attributes.
 * @typeparam P Generic type for parameters.
 * @typeparam A Generic type for attributes.
 */
export class ExzyleAttributeHolder<P, A> extends ExzyleParameterHolder<P> {
  /**
   * A map of attribute namespaces.
   */
  protected attributeMap: Map<string, Map<string, A>>;

  /**
   * The default attribute namespace.
   */
  protected _defaultNamespace = 'com.exzyle';

  constructor(initialParameters?: Map<string, P>) {
    super(initialParameters);
    this.attributeMap = new Map<string, Map<string, A>>([
      [this._defaultNamespace, new Map<string, A>()],
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
    this.attributeMap = new Map<string, Map<string, A>>([
      [this.defaultNamespace, new Map<string, A>()],
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
  getAttribute(
    attributeName: string,
    namespace: string | undefined = undefined,
    defaultValue: A | undefined = undefined
  ) {
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
  getAttributeNames(nameSpace: string | undefined = undefined): string[] {
    if (!nameSpace) {
      nameSpace = this.defaultNamespace;
    }
    if (this.attributeMap.has(nameSpace)) {
      const attributes = this.attributeMap.get(nameSpace);
      return [...attributes!.keys()];
    }
    return [];
  }

  /**
   * Retrieves all attributes in a namespace.
   *
   * If no namespace is provided the default namespace will be used.
   * @param namespace The namespace for the attributes.
   */
  getAttributes(namespace: string | undefined = undefined): Map<string, A> {
    if (!namespace) {
      namespace = this.defaultNamespace;
    }
    if (this.attributeMap.has(namespace)) {
      const attributes = this.attributeMap.get(namespace);
      return new Map<string, A>(attributes!.entries());
    }
    return new Map<string, A>();
  }

  /**
   * Retrieves all the attribute namespaces.
   */
  get namespaces() {
    return [...this.attributeMap.keys()];
  }

  /**
   * Determines if an attribute name has been set.
   *
   * If no namespace is provided the default namespace will be used.
   * @param attributeName The attribute name.
   * @param namespace The namespace for the attribute.
   */
  hasAttribute(
    attributeName: string,
    namespace: string | undefined = this.defaultNamespace
  ): boolean {
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
  hasNamespace(namespace: string) {
    return this.attributeMap.has(namespace);
  }

  /**
   * Removes an attribute and returns the existing value if it is set.
   *
   * If the attribute does not exist it will return undefined.
   * @param attributeName The attribute name.
   * @param namespace The namespace for the attribute.
   */
  removeAttribute(
    attributeName: string,
    namespace: string = this.defaultNamespace
  ): A | undefined {
    if (this.hasAttribute(attributeName, namespace)) {
      const attributeValue = this.getAttribute(attributeName, namespace);
      this.attributeMap.get(namespace)!.delete(attributeName);
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
  removeAttributeNamespace(namespace: string): Map<string, A> {
    if (this.hasNamespace(namespace)) {
      const attributes = this.getAttributes(namespace);
      this.attributeMap.delete(namespace);
      if (namespace === this.defaultNamespace) {
        this.attributeMap.set(this.defaultNamespace, new Map());
      }
      return attributes;
    }
    return new Map<string, A>();
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
  setAttribute(
    attributeName: string,
    value: A,
    namespace: string = this.defaultNamespace
  ) {
    if (!this.attributeMap.has(namespace)) {
      this.attributeMap.set(namespace, new Map<string, A>());
    }
    const attributes = this.attributeMap.get(namespace);
    attributes!.set(attributeName, value);
  }

  /**
   * Merges in a map or keyed object of attributes.
   * @param attributes The attributes to be set/merged.
   * @param namespace An attribute namespace.
   */
  setAttributes(
    attributes: Map<string, A>,
    namespace: string = this.defaultNamespace
  ) {
    if (!this.hasNamespace(namespace)) {
      this.attributeMap.set(namespace, new Map<string, A>());
    }
    const existingAttributes = this.getAttributes(namespace);
    const newAttributes = new Map([
      ...existingAttributes.entries(),
      ...attributes.entries(),
    ]);
    this.attributeMap.set(namespace, newAttributes);
  }
}
