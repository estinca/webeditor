
export default class Command {
    
    constructor(editor) {
        this.editor = editor;

        this.set( 'value', undefined );

        this.set( 'isEnabled', false );
    }

    refresh() {
		  this.isEnabled = true;
    }
    
    execute() {}
}