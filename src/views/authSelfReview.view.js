/* @ngInject */
function authSelfReview$ctrl ($state, ImmunizationRecordService) {
  this.progressBar = $state.$current.data.progressBar

  this.$onInit = () => {
    this.clientInfo = ImmunizationRecordService.getPatient()
    this.submitterInfo = ImmunizationRecordService.getSubmitter()
    this.addressInfo = ImmunizationRecordService.getAddress()
    this.immunizations = ImmunizationRecordService.getNewImmunizations()
  }
}

export default {
  name: 'authSelfReview',
  view: {
    bindings: { data: '<' },
    controller: authSelfReview$ctrl,
    template: `
      <h1>{{ 'authSelfReview.REVIEW' | translate}}</h1>
      <h3>{{ 'authSelfReview.REVIEW_INSTRUCTION_HEADER' | translate }}</h3>
      <p translate = 'authSelfReview.REVIEW_INSTRUCTION_BODY' translate-compile translate-values="{ submitImmunizationsButton : '{{ 'submitImmunizations.SUBMIT_IMMUNIZATIONS' | translate }}' }"></p>
      <form id="reviewForm" name="reviewForm" novalidate>
        <hr />
        <h4>{{ 'authSelfReview.IMMUNIZATIONS_TITLE' | translate }}</h4>

        <div class="row">
          <div class="col-xs-12">
            <immunization-review-container
              patient="$ctrl.clientInfo"
              immunizations="$ctrl.immunizations">
            </immunization-review-container>
            <p>{{ 'anonOtherReview.REVIEW_INSTRUCTION_CAVEAT' | translate }}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <edit-button
              button-id="review-edit-immunizations-button"
              button-text="{{'authSelfReview.REVIEW_EDIT_IMMS' | translate}}"
              go-to-route="^.immunizations">
            </edit-button>
          </div>
        </div>
        <hr/>

        <h4>{{ 'authSelfReview.DOCUMENTS_TITLE' | translate }}</h4>
        <div class="row">
          <document-upload-display is-editable="false" doc-review="review"></document-upload-display>
        </div>
        <div class="row">
          <div class="col-xs-12">
             <edit-button
              button-id="review-edit-documents-button"
              button-text="{{'authSelfReview.REVIEW_EDIT_DOX' | translate}}"
              go-to-route="^.documents">
            </edit-button>
          </div>
        </div>
        <hr/>

        <patient-self-display
          client-info="$ctrl.clientInfo"
          submitter-info="$ctrl.submitterInfo">
        </patient-self-display>
        <hr/>

        <submit-immunizations></submit-immunizations>
      </form>
    `
  }
}
