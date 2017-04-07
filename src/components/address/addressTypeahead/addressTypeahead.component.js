/**
 * Created on 2016-08-04.
 * Directive for address typeahead section
 */
(function () {
'use strict';

  module.exports = {
    bindings: {
      localAddress: '=',
      postalCodeComplete: '&',
    },
    templateUrl:'./components/address/addressTypeahead/addressTypeahead.template.html',
    controller: addressTypeaheadController,
  };

  addressTypeaheadController.$inject = ['ICON_RGX', 'Endpoint'];
  function addressTypeaheadController (ICON_RGX, Endpoint) {

    this.$onInit = () => {
      this.addressLookup = '';

      this.getAddress = getAddress;
      this.onPostalCodeLookUpSelect = onPostalCodeLookUpSelect;

      this.rgx = ICON_RGX.rgx;
    };

    /**
     * Search function to query database for postal code lookup
     * @memberof addressController
     * @param {String} value: Value of user input to search
     * @returns {Promise} promise with queried data
     */
    function getAddress (value) {
      value = stripWhitespace(value);
      // Remove null Street Type values from typeahead drop down
      return Endpoint.getAddress(value)
                     .then((addressArray) => {
                       Object.keys(addressArray)
                             .map((a) => {
                               addressArray[a].streetType == null 
                                 ? addressArray[a].streetType = '' 
                                 : addressArray[a].streetType = ' ' + addressArray[a].streetType;
                             });
                       return addressArray
                     });
    }

    /**
     * When typeahead option is selected
     * This will take the appropriate fields from the selected address object and pre-populate the address inputs for the user
     * @memberof addressController
     * @param {Object} selected: selected option for typeahead
     */
    function onPostalCodeLookUpSelect (selectedAddress) {
      this.localAddress.city = selectedAddress.city || '';
      this.localAddress.province = selectedAddress.province || '';
      this.localAddress.postalCode = selectedAddress.postalCode || '';
      this.localAddress.streetNumber = selectedAddress.streetNumber || '';
      this.localAddress.streetName = selectedAddress.streetName || '';
      this.localAddress.streetType = selectedAddress.streetType || '';
      this.localAddress.streetDirection = selectedAddress.streetDir || ''; // Fix this in API JSON
      this.localAddress.unitNumber = selectedAddress.unitNumber || '';
      this.localAddress.line2 = selectedAddress.line2 || '';

      this.addressLookup = selectedAddress.postalCode;
    }

    /**
     * Stripping the whitespace from the postalcode, for the postalcode lookup
     * @param {String} text - value of what is being typed
     * @returns {String} - value that has been stripped of whitespace
     */
    function stripWhitespace (text) {
      return (text) ? text.toString().replace(/[\s]/g, '') : '';
    }
  }

}());
