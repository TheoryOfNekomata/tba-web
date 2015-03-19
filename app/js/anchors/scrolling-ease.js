/*global $*/

(function($, undefined) {

    "use strict";

    $("a[href]")
        .on("click", function() {
            try {
                var href = $(this).attr("href");
                $("html, body").animate({
                    scrollTop: $([
                        href,
                        "a[name='" + href.substr(1) + "']"
                    ].join(",")).offset().top
                }, 500);
            } catch(e) {}
        });

})($);
