$(function () {
    function MathFactsViewModel() {
        var self = this;

        self.inputValue = ko.observable('');
        self.facts = ko.observableArray([]);
        self.errorMessage = ko.observable('');
        self.loading = ko.observable(false);

        self.formatFact = function (fact) {
            return fact.value + ' is ' + fact.label + ': ' + (fact.result ? 'YES' : 'NO');
        };

        self.checkNumber = function () {
            var raw = self.inputValue().trim();

            if (raw === '') {
                self.errorMessage('Please enter an integer.');
                self.facts([]);
                return;
            }

            var n = parseInt(raw, 10);
            if (isNaN(n) || String(n) !== raw) {
                self.errorMessage('Please enter a valid integer.');
                self.facts([]);
                return;
            }

            self.errorMessage('');
            self.loading(true);

            $.ajax({
                url: '/check',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ value: n }),
                success: function (data) {
                    self.facts([
                        { value: data.value, label: 'prime', result: data.isPrime },
                        { value: data.value, label: 'palindromic', result: data.isPalindrome }
                    ]);
                },
                error: function (xhr) {
                    var msg = 'An error occurred.';
                    try {
                        msg = JSON.parse(xhr.responseText).error || msg;
                    } catch (e) {}
                    self.errorMessage(msg);
                    self.facts([]);
                },
                complete: function () {
                    self.loading(false);
                }
            });
        };
    }

    ko.applyBindings(new MathFactsViewModel(), document.getElementById('app'));
});
