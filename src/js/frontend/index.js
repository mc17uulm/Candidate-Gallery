import App from "./App";

const { __, setLocaleData } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('candidate-gallery/gallery-block', {
    title: 'Candidate Gallery',
    icon: 'universal-access-alt',
    category: 'common',
    edit() {
        return <App type="edit" />
    },
    save() {
        return <App type="save" />
    }
});