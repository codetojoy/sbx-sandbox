$(function () {
    function MathTidbitsViewModel() {
        var self = this;

        self.inputValue = ko.observable('');
        self.facts = ko.observableArray([]);
        self.errorMessage = ko.observable('');
        self.loading = ko.observable(false);

        self.formatFact = function (fact) {
            return fact.value + ' is ' + fact.label + ': ' + (fact.result ? 'YES' : 'NO');
        };

        // !!! TEMPORARY CLIENT-SIDE MOCK !!!
        // The palindrome fact is computed here in the browser because the
        // back-end /check endpoint does not yet return isPalindrome.
        // REMOVE this function and consume the back-end value once
        // TODO-002 (palindrome back-end) is implemented.
        function isPalindromeMock(n) {
            var s = String(Math.abs(n));
            return s === s.split('').reverse().join('');
        }

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
                        // !!! MOCK — replace with back-end value after TODO-002 !!!
                        { value: data.value, label: 'palindromic', result: isPalindromeMock(data.value) }
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

    ko.applyBindings(new MathTidbitsViewModel(), document.getElementById('app'));
});
