(function($, Math, undefined) {
    $(function() {
        var packery = $(".js-packery");

        var packeryTimeout = null;

        var poolTileHeight = 125; // _variables.sass:5

        for(var i = 1; i <= 50; i++) {
            var randomWidth = Math.floor(Math.random() * 100) + 150;

            packery
                .append($("<li>")
                    .css({
                        "width": randomWidth
                    })
                    .append($("<a>")
                        .attr("href", "#")
                        .css({
                            "background-image": "url('app/img/bg/home/bg-img%20(" + (Math.floor(Math.random() * 122) + 1) + ").png')",
                            "background-size": (randomWidth > poolTileHeight ? "100%" : "auto 100%")
                        })
                        .append($("<span>")
                            .addClass("pool-item__label")
                            .html("Image Name")
                    )
                )
            );
        }

        function layoutPoolItems() {
            packery.packery();
        }

        $(window).on("resize.tba.pool", function() {
            if(packeryTimeout !== null) {
                clearTimeout(packeryTimeout);
            }

            packeryTimeout = setTimeout(layoutPoolItems, 250);
        });

        packeryTimeout = setTimeout(layoutPoolItems, 250);
    });
})($, Math);
