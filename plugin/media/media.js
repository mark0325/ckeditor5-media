/**
 * @module media/mediabrowser
 */
import MediaBrowserUI from './mediabrowserui';
import MediaCaptionEditing from './mediacaption/mediacaptionediting';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import MediaEditing from "./mediaediting";

/**
 * Media Browser Plugin
 *
 * @extends module:core/plugin~Plugin
 */
export default class Media extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [MediaEditing, MediaBrowserUI, MediaCaptionEditing];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'Media';
    }
}
