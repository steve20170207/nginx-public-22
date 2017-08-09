/* @ngInject */
function submitImmunizations$ctrl (
  $analytics,
  $q,
  $state,
  $translate,
  AnalyticsLogger,
  EditReviewService,
  Endpoint,
  FileUploadHandler,
  ImmunizationRecordConverter,
  ImmunizationRecordService,
  Notify,
  Immunization,
  ICON_NOTIFICATION
) {
  this.$onInit = () => {
    this.isSubmitButtonDisabled = false

    /* If the user edits the DOB to be later than an Imms date, display an error */
    let patientInfo = ImmunizationRecordService.getPatient()
    let immunizations = ImmunizationRecordService.getNewImmunizations()
    this.invalidDate = ImmunizationRecordService.checkDOBAgainstImmunizationDate(patientInfo.dateOfBirth, immunizations)

    const submitImmunizations = () => {
      const numberOfCanadaImmunizations = immunizations
            .filter(i => (i.location === Immunization.location.CANADA))
            .length
      const numberOfInternationalImmunizations = immunizations
            .filter(i => (i.location === Immunization.location.INTERNATIONAL))
            .length
      const numberOfOntarioImmunizations = immunizations
            .filter(i => (i.location === Immunization.location.ONTARIO))
            .length
      const submissionLanguage = ($translate.use().toLowerCase() === 'fr')
            ? 'fr'
            : 'en'

      $analytics.eventTrack({
        numberOfCanadaImmunizations,
        numberOfInternationalImmunizations,
        numberOfOntarioImmunizations,
        submissionLanguage
      })

      return ImmunizationRecordConverter.convert(ImmunizationRecordService)
      .then(Endpoint.submitImmunizationRecord)
    }

    const submitDocumentUploads = () => {
      const uploadStatus = {
        PAYLOAD_TOO_LARGE: 413,
        UNSUPPORTED_MEDIA_TYPE: 415,
        UNPROCESSABLE_ENTITY: 422
      }

      return FileUploadHandler.getUploader()
      .then(FileUploadHandler.uploadAll)
      .catch(({ status = 0 }) => {
        switch (status) {
          case uploadStatus.PAYLOAD_TOO_LARGE:
            Notify.publish(ICON_NOTIFICATION.WARN_DOCUMENT_FILE_TOO_LARGE)
            EditReviewService.setFromReviewPage(true)
            $state.go('^.documents')
            break

          case uploadStatus.UNSUPPORTED_MEDIA_TYPE:
            Notify.publish(ICON_NOTIFICATION.WARN_DOCUMENT_FILE_BAD_TYPE)
            EditReviewService.setFromReviewPage(true)
            $state.go('^.documents')
            break

          case uploadStatus.UNPROCESSABLE_ENTITY:
          default:
            Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_NETWORK_ERROR)
            EditReviewService.setFromReviewPage(true)
            $state.go('^.documents')
            break
        }

        return $q.reject()
      })
    }

    this.submit = () => {
      if (this.invalidDate) {
        Notify.publish(ICON_NOTIFICATION.INVALID_DATE_ERROR)
      } else {
        this.isSubmitButtonDisabled = true
        Notify.publish(ICON_NOTIFICATION.PUSH_SUBMISSION_PROGRESS)

        submitDocumentUploads()
        .then(submitImmunizations)
        .then(() => $state.go('^.confirmation'))
        .catch(angular.noop)
        .finally(() => {
          this.isSubmitButtonDisabled = false
          Notify.publish(ICON_NOTIFICATION.POP_SUBMISSION_PROGRESS)
        })
      }
    }
  }
}

export default {
  name: 'submitImmunizations',
  component: {
    templateUrl: './components/review/submitImmunizations/submitImmunizations.template.html',
    controller: submitImmunizations$ctrl
  }
}
