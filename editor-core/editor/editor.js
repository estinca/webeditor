import Config from '../../editor-utils/config';

export default class Editor {


    constructor(config) {
        this.config = new Config( config, this.constructor.defaultConfig );
        console.log(this.config._config.width);
    }
}