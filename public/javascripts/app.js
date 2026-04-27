$(function () {
    function PrimeViewModel() {
        var self = this;

        self.inputValue = ko.observable('');
        self.result = ko.observable(null);
        self.errorMessage = ko.observable('');
        self.loading = ko.observable(false);

        self.resultMessage = ko.computed(function () {
            var r = self.result();
            if (r === null) return '';
            return r.value + ' is ' + (r.isPrime ? 'PRIME' : 'not prime') + '.';
        });

        self.checkPrime = function () {
            var raw = self.inputValue().trim();

            if (raw === '') {
                self.errorMessage('Please enter an integer.');
                self.result(null);
                return;
            }

            var n = parseInt(raw, 10);
            if (isNaN(n) || String(n) !== raw) {
                self.errorMessage('Please enter a valid integer.');
                self.result(null);
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
                    self.result(data);
                },
                error: function (xhr) {
                    var msg = 'An error occurred.';
                    try {
                        msg = JSON.parse(xhr.responseText).error || msg;
                    } catch (e) {}
                    self.errorMessage(msg);
                    self.result(null);
                },
                complete: function () {
                    self.loading(false);
                }
            });
        };
    }

    ko.applyBindings(new PrimeViewModel(), document.getElementById('app'));
});
