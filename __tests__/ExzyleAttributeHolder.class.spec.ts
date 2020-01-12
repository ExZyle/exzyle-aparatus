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

import { ExzyleAttributeHolder } from '../src'

describe('ExzyleAttributeHolder Class', function() {
    test('should be able to create a new instance with no initialisation parameters', function() {
        const instance = new ExzyleAttributeHolder();
        expect(instance instanceof ExzyleAttributeHolder).toBe(true);
    });
    test('should be able to create a new instance with initialisation parameters', function() {
        const initialParameters = new Map([
            [ 'firstKey', 'AUDUSD' ]
        ]);
        const instance = new ExzyleAttributeHolder(initialParameters);
        expect(instance instanceof ExzyleAttributeHolder).toBe(true);
    });
    describe('Instance', function() {
        let parameterFixture = new Map<string, any>([
            [ 'boolean true', true ],
            [ 'boolean false', false ],
            [ 'AUDJPY', 'Aussie Yen' ],
            [ 'zero number', 0 ],
            [ 'undefined value', undefined ],
            [ 'ETHUSD', 'Bye' ],
            [ 'EURUSD', 'HOLD' ]
        ]);
        let instanceFixture = new ExzyleAttributeHolder(parameterFixture);
        
        test('#defaultNamespace should return the default namespace', function() {
            expect(instanceFixture.defaultNamespace).toBe('com.exzyle');
        });
        test('#hasNamespace on an existing namespace should return true', function() {
            expect(instanceFixture.hasNamespace('com.exzyle')).toBe(true);
        })
        test('#hasNamespace on an a non existing namespace should return false', function() {
            expect(instanceFixture.hasNamespace('com.zombo')).toBe(false);
        });
        test('#setAttribute() with no namespace should set the attribute in the default namespace', function() {
            instanceFixture.setAttribute('strategy', 'NONE');
            expect(instanceFixture.hasAttribute('strategy')).toBe(true);
        });
        test('#getAttribute() with no namespace should retrieve the attribute in the default namespace', function() {
            expect(instanceFixture.getAttribute('strategy')).toBe('NONE');
        });
        test('#getAttribute() with a non-existing attribute and no namespace should retrieve the default value', function() {
            expect(instanceFixture.getAttribute('plan', undefined, 'not set')).toBe('not set');
        });
        test('#getAttribute() with a non-existing attribute and non-exsiting namespace should retrieve the default value', function() {
            expect(instanceFixture.getAttribute('strategy', 'MSFT', 'not set')).toBe('not set');
        });
        test('#getAttribute() with a non-existing attribute and non-default namespace should retrieve the default value', function() {
            expect(instanceFixture.getAttribute('strategy', 'com.zombo', 'still not set')).toBe('still not set');
        });
        test('#setAttribute() on a non-existing namespace should create the namespace and the attribute', function() {
            instanceFixture.setAttribute('strategy', 'ALWAYS SHORT', 'TEAM');
            expect(instanceFixture.hasNamespace('TEAM')).toBe(true);
            expect(instanceFixture.getAttribute('strategy', 'TEAM')).toBe('ALWAYS SHORT');
        });
        test('#clearAttributes() should leave only an empty default namespace', function() {
            instanceFixture.clearAttributes();
            expect(instanceFixture.namespaces.length).toBe(1);
            expect(instanceFixture.namespaces[0]).toBe(instanceFixture.defaultNamespace);
        });
        test('#hasAttribute() should return appropriately across namespaces', function() {
            instanceFixture.setAttribute('truthy attribute', true);
            instanceFixture.setAttribute('truthy attribute', false, 'ctrader');
            expect(instanceFixture.hasAttribute('truthy attribute')).toBe(true);
            expect(instanceFixture.hasAttribute('truthy attribute', 'ctrader')).toBe(true);
            expect(instanceFixture.hasAttribute('truthy attribute', 'com.zombo')).toBe(false);
        });
        test('#removeAttribute should remove an attribute from the given namespace and return the removed value', function() {
            const removedValue = instanceFixture.removeAttribute('truthy attribute', 'ctrader');
            expect(removedValue).toBe(false);
            expect(instanceFixture.hasAttribute('truthy attribute', 'ctrader')).toBe(false);
            expect(instanceFixture.hasAttribute('truthy attribute')).toBe(true);
        });
        test('#removeAttribute should return undefined when the attribute does not exist', function() {
            const oldValue = instanceFixture.removeAttribute('krugthepmahanakhon');
            expect(oldValue).toBeUndefined();
        });
        test('#getAttributes() with no namespace should return a map of the default namespace attributes', function() {
            const map = instanceFixture.getAttributes();
            expect(map).toBeInstanceOf(Map);
            expect(map.get('truthy attribute')).toBe(true);
        })
        test('#getAttributes() with a given namespace should return a map of the namespace attributes', function() {
            instanceFixture.setAttribute('preferred over', 'metatrader', 'ctrader');
            const map = instanceFixture.getAttributes('ctrader');
            expect(map).toBeInstanceOf(Map);
            expect(map.get('preferred over')).toBe('metatrader');
        })
        test('#getAttributes() with a non-existent namespace should return an empty map', function() {
            const map = instanceFixture.getAttributes('Sai Mai');
            expect(map).toBeInstanceOf(Map);
            expect(map.size).toBe(0);
        })
        test('#setAttributes() with a map and no namespace should set attributes in the default namespace', function() {
            instanceFixture.clearAttributes();
            const map = new Map([
                [ 'Name', 'Exzyle']
            ]);
            instanceFixture.setAttributes(map);
            expect(instanceFixture.getAttributes()).toEqual(map);
        });
        test('#setAttributes() with a map should set attributes in the given namespace', function() {
            instanceFixture.clearAttributes();
            const map = new Map([
                [ 'API KEY', '133t']
            ]);
            instanceFixture.setAttributes(map, 'FIX API');
            expect(instanceFixture.getAttributes('FIX API')).toEqual(map);
        });
        test('#removeAttributeNamespace() should remove a namespace and return the attributes', function() {
            const map = new Map([
                [ 'API KEY', '133t']
            ]);
            const previousAttributes = instanceFixture.removeAttributeNamespace('FIX API');
            expect(previousAttributes).toEqual(map);
            expect(instanceFixture.hasNamespace('FIX API')).toBe(false);
        });
        test('#removeAttributeNamespace() from the default namespace should clear the attributes but not remove the namespace', function() {
            const previousAttributes = instanceFixture.removeAttributeNamespace(instanceFixture.defaultNamespace);
            expect(instanceFixture.hasNamespace(instanceFixture.defaultNamespace)).toBe(true);
            expect(instanceFixture.getAttributes.length).toBe(0);
        });
        test('#removeAttributeNamespace() from a non-existent namespace should return an empty map', function() {
            const previousAttributes = instanceFixture.removeAttributeNamespace('TEAM');
            expect(instanceFixture.hasNamespace('TEAM')).toBe(false);
            expect(previousAttributes).toBeInstanceOf(Map);
            expect(previousAttributes.size).toBe(0);
        });
        test('#attributeNames() with no namespace should return an array of attribute names from the default namespace', function() {
            instanceFixture.setAttribute('CFD', 'enabled');
            const names = instanceFixture.getAttributeNames();
            expect(names).toBeInstanceOf(Array);
            expect(names).toEqual(['CFD']);
        });
        test('#attributeNames() should return an array of attribute names from the given namespace', function() {
            instanceFixture.setAttribute('ACCOUNT ID', '12345', 'FIX API');
            const names = instanceFixture.getAttributeNames('FIX API');
            expect(names).toBeInstanceOf(Array);
            expect(names).toEqual(['ACCOUNT ID']);
        });
        test('#attributeNames() should return an empty array from a non-existent namespace', function() {
            const names = instanceFixture.getAttributeNames('SWISS BANK ACCOUNTS');
            expect(names).toBeInstanceOf(Array);
            expect(names).toEqual([]);
        });
    });
});
