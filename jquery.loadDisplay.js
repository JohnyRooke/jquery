/* 
 * @author Johny Rooke <johny.rooke@gmail.com>
 * @version 0.1  
 * @plugin jquery.loadDisplay loads the screens according to the url defined in php on a specified id/class
 * @template boilerplate
 *
 * Example: jQuery -> $( '#displayContent' ).loadDisplay({ display: example}); SERVER -> ./ajax/functions/loadDisplay.php
 */
; (function ($, window, document, undefined) {
    "use strict";

    // Default values
    var configurationDefault =
    {
        display: "default"
    };

    // Constructor
    function Plugin(element, configuration) {
        this._elementJQ = $(element);
        this._configuration = $.extend({}, configurationDefault, configuration);
        this._configurationDefault = configurationDefault;
        this._plugin = "loadDisplay";
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype,
        {
            init: function () {
                this.carga();
            },
            carga: function () {
                var that = this;
                $.ajax(
                    {
                        url: './ajax/ajax.php',
                        type: 'post',
                        async: true,
                        cache: false,
                        data: {
                            0: {
                                funcion: 'loadDisplay',
                                data: { display: this._configuration.display, parametro: this._configuration.parametro }
                            }
                        },
                        success: function (html) {
                            that._elementJQ.find('*').remove();
                            that._elementJQ.html(JSON.parse(html));
                        }
                    });
            }
        });

    $.fn.loadDisplay = function (configuration) {
        return this.each(function () {
            if (!$.data(this, "plugin_loadDisplay") || true) {
                $.data(this, "plugin_loadDisplay", new Plugin(this, configuration));
            }
        });
    };
})(jQuery, window, document);
