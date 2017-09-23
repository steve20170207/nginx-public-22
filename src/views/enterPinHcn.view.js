/* @ngInject */
function enterPinHcn$ctrl (
 ImmunizationRecordService,
 $uibModal,
 $state,
 $stateParams,
 Endpoint,
 FhirRecordConverter,
 Notify,
 DhirErrorHandler,
 ICON_NOTIFICATION,
 Utility
) {
  this.$onInit = () => {
    this.patientInfo = ImmunizationRecordService.getPatient()
    this.submitterInfo = ImmunizationRecordService.getSubmitter()
    this.pin = ''

    /* Func dec */
    this.openHelpModal = () => Notify.publish(ICON_NOTIFICATION.INFO_LEARN_MORE_ABOUT_OIID)
    this.verify = verify
    this.goToForgotPin = goToForgotPin
  }

  /**
   * Go to forgot PIN page, if user clicks on "Forgot the PIN"
   * @param form
   */
  function goToForgotPin () {
    $state.go('^.forgot-pin')
  }

  /**
   * Go to post-validation dispatcher, if user completes form correctly
   * @param form
   */
  function verify (form) {
    if (form.$valid) {
      Notify.publish(ICON_NOTIFICATION.PUSH_RETRIEVAL_PROGRESS)
      Endpoint.retrieveImmunizationRecord(this.patientInfo.oiid, this.pin)
        .then(FhirRecordConverter.convert)
        .then(FhirRecordConverter.populateConvertedData)
        .then((retrievedRecord) => {
          ImmunizationRecordService.setPatient(retrievedRecord.patient)
          ImmunizationRecordService.setRetrievedImmunizations(retrievedRecord.retrievedImmunizations)
          ImmunizationRecordService.setRecommendations(retrievedRecord.recommendations)
        })
        .then(() => $state.go('verification.dispatch-after-verification', {relationship: this.submitterInfo.relationshipToPatient}))
        .then(() => Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS))
        .catch(DhirErrorHandler.notifyRetrievalError)
    } else {
      Utility.focusFirstInvalidField(form)
    }
  }
}

export default {
  name: 'enterPinHcn',
  view: {
    controller: enterPinHcn$ctrl,
    template: `
     
    `
  }
}
