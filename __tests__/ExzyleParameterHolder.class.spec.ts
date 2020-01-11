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

import { ExzyleParameterHolder } from '../src'

describe('ExzyleParameterHolder Class', function() {
    test('should be able to create a new instance with no initialisation parameters', function() {
        const instance = new ExzyleParameterHolder();
        expect(instance instanceof ExzyleParameterHolder).toBe(true);
    });
    test('should be able to create a new instance with initialisation parameters', function() {
        const initialParameters = new Map([
            [ 'firstKey', 'AUDUSD' ]
        ]);
        const instance = new ExzyleParameterHolder(initialParameters);
        expect(instance instanceof ExzyleParameterHolder).toBe(true);
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
        let instanceFixture = new ExzyleParameterHolder(parameterFixture);

        test('#getParameter() with no valid key should return default undefined value', function() {
            expect(instanceFixture.getParameter('not set')).toBeUndefined();
        });
        test('#getParameter() with no valid key should return passed default value', function() {
            const expectedDefaultValue = 'XAUUSD';
            expect(instanceFixture.getParameter('not set', expectedDefaultValue)).toBe(expectedDefaultValue);
        });
        test('#getParameter() with a false value to return exactly false and not the passed default value', function() {
            const expectedDefaultValue = 'XAGUSD';
            expect(instanceFixture.getParameter('boolean false', expectedDefaultValue)).toBe(false);
            // If it is false then that's probably fine...these next to assertiosn are probably overkill 
            expect(instanceFixture.getParameter('boolean false', expectedDefaultValue)).not.toBe(expectedDefaultValue);
            expect(instanceFixture.getParameter('boolean false', expectedDefaultValue)).not.toBeUndefined();
        });
        test('#getParameter() with an undefined value to return undefined and not the passed default value', function() {
            const expectedDefaultValue = 'XPDUSD';
            expect(instanceFixture.getParameter('undefined value', expectedDefaultValue)).toBeUndefined();
        });
        test('#parameterNames returns an array of the parameter keys', function() {
            const expectedNames = [ ...parameterFixture.keys() ];
            expect(instanceFixture.parameterNames).toEqual(expectedNames);
        });
        test('#parameters returns a Map<string,any> matching the initial values', function() {
            const actualParameters = instanceFixture.parameters;
            // expect(actualParameters.size).toBe(parameterFixture.size);
            expect(actualParameters).toEqual(parameterFixture);
        });
        test('#hasParameter() returns true when the parameter has been set', function() {
            expect(instanceFixture.hasParameter('AUDJPY')).toBe(true);
        });
        test('#hasParameter() returns false when the parameter has not been set', function() {
            expect(instanceFixture.hasParameter('BTCUSD')).toBe(false);
        });
        test('#removeParameter() returns undefined when trying to remove an unset parameter', function() {            
            expect(instanceFixture.removeParameter('BTCUSD')).toBe(undefined);
            expect(instanceFixture.parameters.size).toEqual(parameterFixture.size);
        });
        test('#removeParameter() returns parameter value when trying to remove a set parameter', function() {            
            expect(instanceFixture.removeParameter('ETHUSD')).toBe('Bye');
            expect(instanceFixture.parameters.size).toEqual(parameterFixture.size-1);
        });
        test('#setParameter() sets the parameter value', function() {   
            instanceFixture.setParameter('ETHUSD', 'Hello')         
            expect(instanceFixture.getParameter('ETHUSD')).toBe('Hello');
        });
        test('#setParameters() merges passed map with existing parameters', function() {
            const instance = new ExzyleParameterHolder(parameterFixture);
            const extraParameters = new Map([
                [ 'AUS200', 'Aussie S&P/ASX 200 Index' ],
                [ 'HK50', 'Chinese Hang Seng 50 Index']
            ]);
            const expectedSize = parameterFixture.size + extraParameters.size;
            instance.setParameters(extraParameters);
            expect(instance.parameters.size).toBe(expectedSize);
        });
        test('#setParameters() merges passed object map with existing parameters', function() {
            const instance = new ExzyleParameterHolder(parameterFixture);
            const extraParameters = {
                'AUS200': 'Aussie S&P/ASX 200 Index',
                'HK50': 'Chinese Hang Seng 50 Index'
            };
            const expectedSize = parameterFixture.size + Object.keys(extraParameters).length;
            instance.setParameters(extraParameters);
            expect(instance.parameters.size).toBe(expectedSize);
        });

        //Keep this test to last
        test('#clearParameters() results in no parameters being held', function() {
            instanceFixture.clearParameters();
            expect(instanceFixture.parameters.size).toBe(0);
        })
    });
});
