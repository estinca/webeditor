import './sass/styles.scss';
import Editor from './editor-core/editor/editor';

console.log("it works!");

const editor = new Editor({
    width: '100',
    height: '100',
    style: {
        backgorundColor: '#ccc',
    }
});
