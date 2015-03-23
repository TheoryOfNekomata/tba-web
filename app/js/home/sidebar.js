(function($, undefined) {
    $(function() {
        $("a.list__name")
            .on("click.tba.sidebar.list.collapse", function(e) {
                e.preventDefault();
                var $link = $(this);
                $link
                    .next()
                    .collapse('toggle');
            })
            .next()
            .on("show.bs.collapse", function() {
                $(this).removeClass("hidden");
                var $link = $(this).prev();
                $link.find("i")
                    .removeClass("icon-arrow-down-thin")
                    .addClass("icon-arrow-up-thin");
            })
            .on("hidden.bs.collapse", function() {
                $(this).addClass("hidden");
            })
            .on("hide.bs.collapse", function() {
                var $link = $(this).prev();
                $link.find("i")
                    .addClass("icon-arrow-down-thin")
                    .removeClass("icon-arrow-up-thin");
            });
    });
})($);
