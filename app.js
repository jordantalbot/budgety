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

	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(function(cur) {
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},

		totals: {
			exp: 0,
			inc: 0
		},

		budget: 0,
		percentage: -1
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

		calculateBudget: function() {
			// Calculate total income and expeneses
			calculateTotal('exp');
			calculateTotal('inc');

			// calculate the budget
			data.budget = data.totals.inc - data.totals.exp;

			// calculate the percentage of income
			if (data.totals.inc > 0) {
				data.percentage = Math.floor((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
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
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage'
    }
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value, 
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

		addListItem:function(obj, type) {
			var html, newHTML, element;
			// Create HTML string with placeholder text

			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			};
			
			//Replace placeholder text with actual data
			newHTML = html.replace('%id%', obj.id);
			newHTML = newHTML.replace('%description%', obj.description);
			newHTML = newHTML.replace('%value%', obj.value);

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

		},

		clearFields: function() {
			var fields, fieldsArr;
			
			fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			}); 
			
			fieldsArr[0].focus();
		},

		displayBudget: function(obj) {
			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
			
			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '--%';
			}
		},

        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();


// Global App Controller
var controller = (function(budgetCtrlr, UICtrlr) {
	var DOM = UICtrlr.getDOMstrings();
    
    var setupEventListeners = function() {
		var DOM = UICtrlr.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(e) { 
            if (e.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    
	var updateBudget = function() {
		// 1. Calculate the budget
		budgetCtrlr.calculateBudget();

		// 2. Return the budget
		var budget = budgetCtrlr.getBudget();

		// 3. Display the budget on the UI
		UICtrlr.displayBudget(budget);

	};

    var ctrlAddItem = function() {
		var input, newItem;
        // 1. Get the filed input data
        input = UICtrlr.getInput();

		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
			// 2. Add the item to the budget controller
			newItem = budgetCtrlr.addItem(input.type, input.description, input.value);
			
			// 3. Add the item to the UI
			UICtrlr.addListItem(newItem, input.type);

			// 4. Clear the fields
			UICtrlr.clearFields();

			// 5. Calculate and update budget
			updateBudget();
		}
	};
	
	return {
		init: function() {
			setupEventListeners();
			console.log('App has started');
			UICtrlr.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
		}
	};
})(budgetController, UIController);

controller.init();