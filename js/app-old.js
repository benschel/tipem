$(document).ready(function() {
    var _mealCost, _tipAmount, _grandTotal;

    var $mealCost           = $('#meal-cost');
    var $tipOptions         = $('.tip-options li');
    var $otherTip           = $('#ofther-tip');
    var $tipHeader          = $('.tip-amount');
    var $grandTotalHeader   = $('.grand-total');
    var _tipPercent         = 0.15; // Default Tip Percent

    // Allow only numbers
    $mealCost.on('keydown', function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1) {
            return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $tipOptions.on('click', function(e) {
        var $currentTarget = $(e.currentTarget);
        $tipOptions.removeClass();

        if (!$currentTarget.hasClass('other-tip-option')) {
            _tipPercent = $currentTarget.data('tipPercent');
            $(document).trigger('event:update');
        } else {
            $('.other-tip-container').show();

            $otherTip.on('keyup', function() {
                _tipPercent = $otherTip.val();
                $(document).trigger('event:update');
            });
        }

        $currentTarget.addClass('active');
    });

    $mealCost.on('keyup', function() {
        _mealCost = $mealCost.val();

        $(document).trigger('event:update');
    });

    $(document).on('event:update', function() {
         _tipAmount  = getTipAmount(_tipPercent, _mealCost);
        _grandTotal = getGrandTotal(_tipAmount, _mealCost);

        showAmounts(_tipAmount, _grandTotal);
    });

    function getTipAmount(tipPercent, mealCost) {
        return mealCost * tipPercent;
    }

    function getGrandTotal(tipAmount, mealCost) {
        return (mealCost * 1) + tipAmount;
    }

    function showAmounts(tipAmount, grandTotal) {
        $tipHeader.text(tipAmount);
        $grandTotalHeader.text(grandTotal);
    }

});