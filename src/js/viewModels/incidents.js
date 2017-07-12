/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart'],
 function(oj, ko, $) {
  
    function IncidentsViewModel() {
        var self = this;
        // Below are a subset of the ViewModel methods invoked by the ojModule binding
        // Please reference the ojModule jsDoc for additionaly available methods.

        self.startDate = ko.observable();
        self.endDate = ko.observable();

        self.series = ko.observableArray(null);
        
        self.numDone = 0;
        
        self.getData = function(date) {
            $.getJSON('http://anyorigin.com/go?url=http%3A//api.fixer.io/' + date + '&callback=?', function(data){
                var rates = data.contents.rates;
                for (var i in rates) {
                    if (rates[i] < 3) {
                        var result = self.series().find((ele) => (ele.name === i));
                
                        if (result === undefined) {
                            self.series.push({name: i, items: [rates[i]]});
                        } else {
                            result.items.push(rates[i]);
                        }
                    }
                }
            self.numDone++;
            console.log(self.numDone);
            });
        };
        
        
        self.getSeries = function() {
            self.getData("2000-01-01");
            self.getData("2005-01-01");
            self.getData("2010-01-01");
        };

    
        /* toggle button variables */
        self.orientationValue = ko.observable('vertical');
        
        /* chart data */
        var lineSeries = [{name : "Series 1", items : [74, 62, 70, 76, 66]},
                          {name : "Series 2", items : [50, 38, 46, 54, 42]},
                          {name : "Series 82", items : [33]}];
    
//         var lineGroups = ["Group A", "Group B", "Group C", "Group D", "Group E"];
        var lineGroups = ["2000", "2005", "2010"];

   
        
//         this.lineSeriesValue = ko.observableArray(lineSeries);
        this.lineSeriesValue = self.series;
        this.lineGroupsValue = ko.observableArray(lineGroups);
        
        /* toggle buttons*/
        self.orientationOptions = [
            {id: 'vertical', label: 'vertical', value: 'vertical', icon: 'oj-icon demo-line-vert'},
            {id: 'horizontal', label: 'horizontal', value: 'horizontal', icon: 'oj-icon demo-line-horiz'}
        ];
      
      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
