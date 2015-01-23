requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app'
    }
});

requirejs([
            'app/viewModel',
            'knockout',
            'jquery',
            'bootstrap',
            'knockout-bootstrap'
        ],
function (viewModel, ko) {
    ko.applyBindings(new viewModel("3fc6d015f3fa928888e3501230ee0657"));
    ko.bindingHandlers.tooltip = {
        init: function(element, valueAccessor) {
            var local = ko.utils.unwrapObservable(valueAccessor()),
                options = {};

            ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
            ko.utils.extend(options, local);

            $(element).tooltip(options);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).tooltip("destroy");
            });
        },
        options: {
            placement: "right",
            trigger: "click"
        }
    };
});
