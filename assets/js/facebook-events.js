(function (window) {
    "use strict";
    var APP_TOKEN = window.env.ACCESS_TOKEN;
    var APP_ID = window.env.APP_ID;
    var EVENT_FIELDS = "attending_count,interested_count";

    window.fbAsyncInit = function () {
        FB.init({
            appId: APP_ID,
            xfbml: true,
            version: 'v2.5'
        });

        $(function () {
            var $events = $('[data-event]');
            $events.each(buildEventStats);
        });
    };

    function buildEventStats() {
        var $el = $(this);
        var eventId = $el.data('event');

        eventStats(eventId, function (response) {
            if (response && !response.error) {
                var stats = buildStatsHTML(eventId, response);
                $el.find('.content').append(stats);
            }
        });
    }

    function eventStats(eventId, cb) {
        FB.api(
            "/" + eventId + "?" +
            "access_token=" + APP_TOKEN + "" +
            "&fields=" + EVENT_FIELDS,
            cb
        );
    }

    function buildStatsHTML(eventId, stats) {
        var interested = stats.interested_count + stats.attending_count;

        return '' +
            '<a class="fb-stats"' +
            '   href="http://www.facebook.com/events/' + eventId + '">' +
            '   <span>' + interested + '</span> zainteresowanych' +
            '</a>';
    }
})(window);