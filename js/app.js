$(document).ready(function() {

	var tipem = (function() {
		var $mealCost 	= $('#meal-cost');
		var $tipAmount 	= $('.tip-amount');
		var $grandTotal = $('.grand-total');
		var $options 	= $('.tip-options li');

		var app = {
			init: function() {
				var self = this;

				// Validate input 
				$mealCost.on('keydown', function(e) {
					self._validateNumOnly(e);
				});

				$mealCost.on('keyup', function(e) {
					if (!isNaN(self._getMealCost())) {
						self.render();
					}
				});

				// Tip Options
				$options.on('click', function(e) {
					var $currentTarget = $(e.currentTarget);

					// clear active
					$options.removeClass('active');

					$currentTarget.addClass('active');

					self.render();
				});
			},

			_validateNumOnly: function(e) {
				// Allow: backspace, delete, tab, escape, enter and .
		        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1) {
		            return;
		        }

		        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		            e.preventDefault();
		        }
			},

			_getMealCost: function() {
				return Number($mealCost.val());
			},

			_getTipPercentage: function() {
				return Number($('.tip-options .active').data('tip-percent'));
			},

			_getTipAmount: function() {
				var mealCost = this._getMealCost();
				var tipPercentage = this._getTipPercentage();

				var tipAmount = mealCost * tipPercentage;

				return tipAmount;
			},

			_getGrandTotal: function(tipAmount) {
				var mealCost = this._getMealCost();
				var grandTotal = mealCost + tipAmount;

				return grandTotal;
			},

			render: function() {
				var tipAmount = this._getTipAmount();
				var grandTotal = this._getGrandTotal(tipAmount);

				$tipAmount.html(tipAmount ? ('$' + tipAmount) : '&mdash;');

				$grandTotal.html(grandTotal ? ('$' + grandTotal) : '&mdash;');
			}
		};

		return app;
	})();

	tipem.init();
});