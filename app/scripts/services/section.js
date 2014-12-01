'use strict';

angular.module('schedulesSchool').factory('Section', ['DS',
    function (DS) {
      var Section = DS.defineResource({
        name: 'section',
        baseUrl: 'http://107.170.253.85:1337/',

        methods: {
          // Nice create method
        }
      });


      return Section;
    }
]);