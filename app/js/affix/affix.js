/*global $*/

(function($, undefined) {

    "use strict";

    $(function() {
        $("[data-spy='nav-affix']").each(function(i, affix) {
            var affixElem = $(affix);
            affixElem
                .affix({
                    offset: {
                        top: function() {
                            var $body = $("body");
                            var htmlClasses = $("html").attr("class").split(/\s+/);

                            var top;

                            $(htmlClasses).each(function(i, x) {
                                var layoutClassMatches = x.match(/^layout--(\w+)$/);

                                if(layoutClassMatches == null)
                                    return;

                                var layout = layoutClassMatches[layoutClassMatches.length - 1];

                                switch(layout) {
                                    case "home":
                                        return top = $body.find("section").eq(0).height();
                                    case "article":
                                        return top = -parseInt($body.css("padding-top"));
                                }
                            });

                            return top;
                        },
                        bottom: function() {
                            var $footer = $("footer");
                            var htmlClasses = $("html").attr("class").split(/\s+/);

                            var bottom;

                            $(htmlClasses).each(function(i, x) {
                                var layoutClassMatches = x.match(/^layout--(\w+)$/);

                                if(layoutClassMatches == null)
                                    return;

                                var layout = layoutClassMatches[layoutClassMatches.length - 1];

                                switch(layout) {
                                    case "home":
                                        if($(window).width() <= 992)
                                            return bottom = $footer.height();
                                        return bottom = 0 - ($(document).height() - $(window).height() - $("body").children().filter("footer").height());
                                    case "article":
                                        if($(window).width() > 992)
                                            return bottom = $footer.height() + parseInt(affixElem.css("padding-bottom"));
                                        return bottom = null;
                                }
                            });

                            return bottom;
                        }
                    }
                });

        });
    });

})($);
