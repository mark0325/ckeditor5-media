/**
 * @module media/mediabrowser/mediabrowserui
 */
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import icon from './icons/media.svg';

/**
 * Media Browser UI Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class MediaBrowserUI extends Plugin {
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add('media', locale => {
            const view = new ButtonView(locale);
            const execute = editor.config.get('media');
            view.set({
                label: t('Insert media'),
                icon: icon,
                tooltip: true
            });
            view.on('execute', () => {
                execute.click(options => {
                    this.change(editor, options);
                })
            });
            return view;
        });
    }

    change(editor, options) {
        editor.model.change(writer => {
            editor.model.insertContent(writer.createElement('media', options), editor.model.document.selection);
        });
    }
}
