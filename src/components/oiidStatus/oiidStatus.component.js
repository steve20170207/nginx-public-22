/* @ngInject */
function oiidStatus$ctrl (
  $analytics,
  $state,
  $stateParams,
  AnalyticsLogger,
  DhirErrorHandler,
  Address,
  Endpoint,
  ImmunizationRecordService,
  Notify,
  DHIR,
  DHIR_ERROR,
  ICON_NOTIFICATION,
  Utility
) {
  this.$onInit = () => {
    this.patient = ImmunizationRecordService.getPatient()
    this.showOiidError = false

    this.resetShowOiidError = () => {
      if (this.patient.oiid) { this.patient.oiid = this.patient.oiid.toUpperCase() }

      this.showOiidError = false
    }

    this.openHelpModal = () => Notify.publish(ICON_NOTIFICATION.INFO_LEARN_MORE_ABOUT_OIID)

    this.getStatus = (oiid) => {
      Endpoint.ClientStatus(oiid)
      .then(() => {
        ImmunizationRecordService.setAddress(new Address())
        ImmunizationRecordService.setPatient(this.patient)
        $state.go('verification.enter-pin-oiid', { action: $stateParams.action })
      })
      .catch((dhirErrorId) => {
        switch (dhirErrorId) {
          case DHIR.error.ClientStatus.OIID_PIN_SET_NO_EMAIL_AVAILABLE:
          case DHIR.error.ClientStatus.OIID_PIN_SET_NO_HCN_AVAILABLE:
            ImmunizationRecordService.setPatient(this.patient)
            $state.go('verification.enter-pin-oiid', { action: $stateParams.action })
            break

          case DHIR.error.ClientStatus.OIID_PIN_OUTDATED:
            Notify.publish(ICON_NOTIFICATION.INFO_OIID_PIN_OUTDATED)
            ImmunizationRecordService.setPatient(this.patient)
            $state.go('verification.new-pin', { action: $stateParams.action })
            break

          case DHIR.error.ClientStatus.OIID_PIN_NOT_SET:
            ImmunizationRecordService.setPatient(this.patient)
            $state.go('verification.new-pin', { action: $stateParams.action })
            break

          case DHIR.error.ClientStatus.RESOURCE_NOT_FOUND:
            Notify.publish(ICON_NOTIFICATION.INFO_OIID_RESOURCE_NOT_FOUND)
            this.showOiidError = true
            break

          case DHIR.error.ClientStatus.RATE_LIMIT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_TOO_MANY_FAILED_ATTEMPTS)
            break

          case DHIR.error.ClientStatus.LOCKED_OUT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_SECURITY_LOCK_OUT)
            break

          case DHIR.error.ClientStatus.OIID_PIN_REVOKED_AGE:
            $analytics.eventTrack(AnalyticsLogger.eventAction.REVOKED_AGE)
            Notify.publish(ICON_NOTIFICATION.INFO_CALL_PHU_GENERIC)
            break

          case DHIR.error.ClientStatus.OIID_PIN_REVOKED_PHU:
            $analytics.eventTrack(AnalyticsLogger.eventAction.REVOKED_PHU)
            Notify.publish(ICON_NOTIFICATION.INFO_CALL_PHU_GENERIC)
            break

          case DHIR.error.ClientStatus.OIID_PIN_NOT_SET_NO_HCN:
          case DHIR.error.ClientStatus.OIID_PIN_OUTDATED_NO_HCN:
            Notify.publish(ICON_NOTIFICATION.INFO_CALL_PHU_GENERIC)
            break

          case DHIR.error.ClientStatus.MALFORMED_REQUEST:
          case DHIR.error.ClientStatus.MALFORMED_MISSING_REQUIRED_DATA:
          case DHIR.error.ClientStatus.MALFORMED_INVALID_VALUE:
          case DHIR.error.ClientStatus.SERVER_INTERNAL_ERROR:
          default:
            Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR)
            break
        }
      })
    }

    this.verifyOiid = (form) => {
      if (form.$valid) this.getStatus(this.patient.oiid)
      else Utility.focusFirstInvalidField(form)
    }
  }
}

export default {
  name: 'oiidStatus',
  component: {
    controller: oiidStatus$ctrl,
    templateUrl: './components/oiidStatus/oiidStatus.template.html'
  }
}
