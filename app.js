// Budget Controller
var budgetController = (function() {
    var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},

		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function(type, desc, val) {
			var newItem, ID;

			// Create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length -1].id + 1;
			} else {
				ID = 0;
			}

			// Create new item based on type
			if (type === 'exp') {
				newItem = new Expense(ID, desc, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, desc, val);
			}
			// Pushing newItem into the correct array
			data.allItems[type].push(newItem);
			return newItem;
		},

		testing: function() {
			console.log(data);
		}
	};

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
    
    var setupEventListeners = function() {
		var DOM = UICtrlr.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    
    var DOM = UICtrlr.getDOMstrings();

    var ctrlAddItem = function() {
		var input, newItem;
        // 1. Get the filed input data
        input = UICtrlr.getInput();

        // 2. Add the item to the budget controller
		newItem = budgetCtrlr.addItem(input.type, input.description, input.value);
		
		// 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI
	};
	
	return {
		init: function() {
			setupEventListeners();
			console.log('App has started');
		}
	};

})(budgetController, UIController);

controller.init();