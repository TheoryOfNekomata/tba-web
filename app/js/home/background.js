(function($, Math, undefined) {
    $(function() {
        function getImageSrcs(imgPathTemplate, imgCount) {
            var srcs = [];

            for(var i = 1; i <= imgCount; i++)
                srcs.push(imgPathTemplate.replace(/\{\{i\}\}/, i));

            return srcs;
        }

        function makeBg(sel, imgSrcs) {
            function makeQuadNode(depth) {
                var max = 2 + Math.floor(Math.random() * 3);
                var imgboxIndex = Math.floor(Math.random() * imgSrcs.length);

                var $newQuadNode;
                if(depth >= max) {
                    $newQuadNode = $("<div>")
                        .addClass("imgbox")
                        .css({
                            //"border-width": "0 0 1px 1px",
                            //"box-shadow": "1px 1px 0 rgba(255, 255, 255, 0.5) inset, -1px -1px 0 rgba(255, 255, 255, 0.5) inset",
                            //"border-style": "solid",
                            //"border-color": "black",
                            "background-image": "url('" + imgSrcs[imgboxIndex] + "')",
                            "background-size": "100%",
                            "background-position": "center",
                            "width": "100%",
                            "height": "100%"
                        });
                    return $("<div>").append($newQuadNode).html();
                }
                if(Number(new Date()) % 4 == 0 && depth > 1) {
                    $newQuadNode = $("<div>")
                        .addClass("imgbox")
                        .css({
                            //"border-width": "0 0 1px 1px",
                            //"box-shadow": "1px 1px 0 rgba(255, 255, 255, 0.5) inset, -1px -1px 0 rgba(255, 255, 255, 0.5) inset",
                            //"border-style": "solid",
                            //"border-color": "black",
                            "background-image": "url('" + imgSrcs[imgboxIndex] + "')",
                            "background-size": "100%",
                            "background-position": "center",
                            "width": "100%",
                            "height": "100%"
                        });
                    return $("<div>").append($newQuadNode).html();
                }

                $newQuadNode = $("<ul>")
                    .addClass("quad-wrapper")
                    .append($("<li>").html(makeQuadNode(depth + 1)))
                    .append($("<li>").html(makeQuadNode(depth + 1)))
                    .append($("<li>").html(makeQuadNode(depth + 1)))
                    .append($("<li>").html(makeQuadNode(depth + 1)));

                return $("<div>").append($newQuadNode).html();
            }

            var $elem = $(sel);

            var parallaxMax = $elem.height() / 4;

            function centerBg() {
                var $elemChildren = $elem.children(".quad-wrapper");

                if($(window).scrollTop() + $(window).height() < $elem.offset().top
                    || $(window).scrollTop() > $elem.offset().top + $elem.height()
                ) {
                    return;
                }

                $elemChildren
                    .css({
                        position: 'absolute',
                        left: (($elem.width() - $elemChildren.width()) / 2),
                        top: ((($elem.height() - $elemChildren.height()) / 2) + ($elem.height() / 2 * ($(window).scrollTop() / $(document).height() * 2)))
                    });
            }

            // clear element, force overflow
            $elem
                .text("")
                .css("overflow", "hidden");

            var $mainQuad = $("<ul>")
                .addClass("quad-wrapper")
                .css({
                    position: 'absolute',
                    width: $(window).width() * 1.5,
                    //height: $(window).height() * 1.5
                    height: $(window).width() * 1.5,
                    left: ($elem.width() - $(window).width() * 1.5) / 2,
                    top: ($elem.height() - $(window).width() * 1.5) / 2
                })
                .appendTo($elem);

            for(var i = 1; i <= 4; i++) {
                $('<li>')
                    .html(makeQuadNode(0))
                    .appendTo($mainQuad);
            }

            $(window)
                .on("resize.tba.backgroundparallax", centerBg)
                .on("scroll.tba.backgroundparallax", centerBg);

            console.log($elem.offset().top);
        }

        var imgSrcs = getImageSrcs(
            "app/img/bg/home/bg-img ({{i}}).png", // template of the path
            123 // how many images
        );

        makeBg(".section--hero__bg", imgSrcs);
    });
})($, Math);
