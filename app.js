var budgetController = (function() {
    var x = 23;

    var add = function(a) {
        return x + a;
    }
    return {
        publicTest: function(b) {
            return add(b);
        } 
    }
})();

var UIController = (function() {
    // Some code
})();

var controller = (function(budgetCtrlr, UIctrlr) {
    
    var z = budgetCtrlr.publicTest(5);

    return {
        anotherPublic: function() {
            console.log(z);
        }
    }
})(budgetController, UIController);
