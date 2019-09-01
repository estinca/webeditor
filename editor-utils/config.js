
import { isPlainObject } from 'lodash-es';

export default class Config {

    constructor(configurations, defaultConfigurations) {
        this._config = configurations;

        // if (defaultConfigurations) {
        //     this.define(defaultConfigurations);
        // }

        // if (configurations) {
        //     this._setObjectToTarget(this._config, configurations);
        // }
    }

    define(name, value) {
        const isDefine = true;

        this._setToTarget(this._config, name, value, isDefine);
    }

    _setToTarget(target, name, value, isDefine = false) {
        // In case name is an object
        if (isPlainObject(name)) {
            this._setObjectToTarget(target, name, isDefine);

            return;
        }
        const parts = name.split('.');

       //Get param o an object. E.g. object.value -> value
        name = parts.pop();

        // Check if stored configuration has proper structure.
        for (const part of parts) {
            // If there is no object for specified part then create one.
            if (!isPlainObject(target[part])) {
                target[part] = {};
            }

            // Nested object becomes a target.
            target = target[part];
        }

        // In case of value is an object.
        if (isPlainObject(value)) {
            // We take care of proper config structure.
            if (!isPlainObject(target[name])) {
                target[name] = {};
            }

            target = target[name];

            // And iterate through this object calling `_setToTarget` again for each property.
            this._setObjectToTarget(target, value, isDefine);

            return;
        }
        if (isDefine && typeof target[name] != 'undefined') {
            return;
        }

        target[name] = value;
    }

    _setObjectToTarget( target, configuration, isDefine ) {
		Object.keys( configuration ).forEach( key => {
			this._setToTarget( target, key, configuration[ key ], isDefine );
		} );
	}

}