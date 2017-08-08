/* @ngInject */
function ontarioImmunizationSchedule$ctrl () {
  /**
   * For the scroll buttons, to scroll left and right
   * 219 is the current width of the ontario schedule cells
   * See https://github.com/oblador/angular-scroll for API
   */
  let container = angular.element(document.getElementById('ontario-schedule-container'))
  let currentPos = 0
  this.scrollLeft = () => {
    currentPos = container.scrollLeft()
    return container.duScrollTo(currentPos - 219, 0, [500])
      .catch(angular.noop)
  }

  this.scrollRight = () => {
    currentPos = container.scrollLeft()
    return container.duScrollTo(currentPos + 219, 0, [500])
      .catch(angular.noop)
  }
}

export default {
  name: 'ontarioImmunizationSchedule',
  component: {
    templateUrl: './components/welcome/ontarioImmunizationSchedule/ontarioImmunizationSchedule.template.html',
    bndings: {},
    controller: ontarioImmunizationSchedule$ctrl
  }
}
