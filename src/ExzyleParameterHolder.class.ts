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

/**
 * ExzyleParameterHolder provides a base class for managing parameters.
 */
export class ExzyleParameterHolder<V> {
  /**
   * Internal storage of parameters.
   */
  private parameterMap: Map<string, V>;

  /**
   * Constructor accepts an initial map of parameters.
   * @param initialParameters
   */
  constructor(initialParameters: Map<string, V> = new Map()) {
    this.parameterMap = new Map(initialParameters);
    // this.parameterMap.set('extra', 'thing');
  }

  /**
   * Clears all parameters.
   */
  clearParameters() {
    this.parameterMap.clear();
  }

  /**
   * Retrieves the named parameter.
   * @param parameterName The name of the parameter.
   * @param defaultValue A default value returned if the parameter has not been set.
   * @returns The value associated with the parameter or the defaultValue if the parameter is not set.
   */
  getParameter(
    parameterName: string,
    defaultValue: V | undefined = undefined
  ): V | undefined {
    const result = this.parameterMap.has(parameterName)
      ? this.parameterMap.get(parameterName)
      : defaultValue;
    return result;
  }

  /**
   * Retrieves a set of parameter names.
   */
  get parameterNames(): Set<string> {
    return new Set<string>([...this.parameterMap.keys()]);
  }

  /**
   * Retrieves a Map of the parameters. The returned map is a shallow clone of the internal
   * parameter map store.
   */
  get parameters(): Map<string, V> {
    return new Map(this.parameterMap);
  }

  /**
   * Indicates if the named parameter exists.
   * @param parameterName The name of the parameter.
   */
  hasParameter(parameterName: string): boolean {
    return this.parameterMap.has(parameterName);
  }

  /**
   * Removes the named parameter. Returns the value of the parameter if it exists,
   * otherwise it returns undefined.
   * @param parameterName The name of the parameter.
   * @returns Previous value of the parameter or undefined if it is not set.
   */
  removeParameter(parameterName: string): V | undefined {
    if (this.parameterMap.has(parameterName)) {
      const removedValue = this.parameterMap.get(parameterName);
      this.parameterMap.delete(parameterName);
      return removedValue;
    } else {
      return undefined;
    }
  }

  /**
   * Sets the named parameter's value.
   * @param parameterName The name of the parameter.
   * @param value The value to associate with the parameter
   */
  setParameter(parameterName: string, value: V) {
    this.parameterMap.set(parameterName, value);
  }

  /**
   * Merges in a map or keyed object of parameters.
   */
  setParameters(parameters: Map<string, V>) {
    this.parameterMap = new Map([...this.parameterMap, ...parameters]);
  }
}
