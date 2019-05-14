// Budget Controller
var budgetController = (function() {
    


})();

// UI Controller
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                 description: document.querySelector(DOMstrings.inputDescription).value, 
                 value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

// Global App Controller
var controller = (function(budgetCtrlr, UICtrlr) {
    
    var DOM = UICtrlr.getDOMstrings();

    var ctrlAddItem = function() {
        // 1. Get the filed input data
        var input = UICtrlr.getInput();
        console.log(input);


        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
})(budgetController, UIController);
