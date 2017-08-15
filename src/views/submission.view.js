/* @ngInject */
function submission$ctrl (ImmunizationRecordService) {
  this.$onInit = () => {
    this.localPatient = ImmunizationRecordService.getPatient()
    this.localPatient.oiid = ''
    ImmunizationRecordService.setPatient(this.localPatient)
  }
}

export default {
  name: 'submission',
  view: {
    controller: submission$ctrl,
    template: `
      <div class="container">
        <div class="row">
          <div class="col-xs-12">

            <welcome-submit-container></welcome-submit-container>

          </div>
        </div>
      </div>
    `
  }
}
