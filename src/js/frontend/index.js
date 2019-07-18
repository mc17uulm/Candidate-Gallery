import App from "./App";

const { __, setLocaleData } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('candidate-gallery/gallery-block', {
    title: 'Candidate Gallery',
    icon: 'universal-access-alt',
    category: 'common',
    attributes: {
        gallery: {}
    },
    edit(props) {
        return <App type="edit" setAttributes={props.setAttributes} attributes={props.attributes}/>
    },
    save(props) {
        return <App type="save" attributes={props.attributes}/>
    }
});