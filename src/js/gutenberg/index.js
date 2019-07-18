import Block from "./Block";

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
        return <Block type="edit" setAttributes={props.setAttributes} attributes={props.attributes}/>
    },
    save(props) {
        return <Block type="save" attributes={props.attributes} />
    }
});