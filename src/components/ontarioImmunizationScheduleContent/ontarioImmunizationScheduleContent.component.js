/* @ngInject */
function ontarioImmunizationScheduleContent$ctrl() {
  this.scheduledImmunizationList = [
    ScheduleItem(
      'schedule.AT_2_MONTHS'
    ),
    ScheduleItem(
      'schedule.AT_4_MONTHS'
    ),
    ScheduleItem(
      'schedule.AT_6_MONTHS'
    ),
    ScheduleItem(
      'schedule.AT_6_MONTHS_+'
    ),
    ScheduleItem(
      'schedule.AT_12_MONTHS'
    ),
    ScheduleItem(
      'schedule.AT_15_MONTHS'
    ),
    ScheduleItem(
      'schedule.AT_18_MONTHS'
    ),
    ScheduleItem(
      'schedule.AT_4_6_YEARS'
    ),
    ScheduleItem(
      'schedule.AT_GRADE_7'
    ),
    ScheduleItem(
      'schedule.AT_14_16_YEARS'
    ),
    ScheduleItem(
      'schedule.AT_24_26_YEARS'
    ),
    ScheduleItem(
      'schedule.35_Years_+'
    ),
    ScheduleItem(
      'schedule.65_Years_+'
    )
  ]
  this.scheduledImmsDiseaseList = [
    [
      DiseaseList('schedule.DTAP-IPV-HIB', 'schedule.DTAP-IPV-HIB_VALUE'),
      DiseaseList('schedule.PNEU-C', 'schedule.PNEU-C_VALUE'),
      DiseaseList('schedule.ROTA-1', 'schedule.ROTA-1_VALUE')
    ],
    [
      DiseaseList('schedule.DTAP-IPV-HIB', 'schedule.DTAP-IPV-HIB_VALUE'),
      DiseaseList('schedule.PNEU-C', 'schedule.PNEU-C_VALUE'),
      DiseaseList('schedule.ROTA-1', 'schedule.ROTA-1_VALUE')
    ],
    [
      DiseaseList('schedule.DTAP-IPV-HIB', 'schedule.DTAP-IPV-HIB_VALUE')
    ],
    [
      DiseaseList('schedule.INF', 'schedule.INF_VALUE'),
      DiseaseList('schedule.EVERY_FALL')
    ],
    [
      DiseaseList('schedule.PNEU-C', 'schedule.PNEU-C_VALUE'),
      DiseaseList('schedule.MMR', 'schedule.MMR_VALUE'),
      DiseaseList('schedule.MEN-C-C', 'schedule.MEN-C-C_VALUE')
    ],
    [
      DiseaseList('schedule.VAR', 'schedule.VAR_VALUE')
    ],
    [
      DiseaseList('schedule.DTAP-IPV-HIB', 'schedule.DTAP-IPV-HIB_VALUE')
    ],
    [
      DiseaseList('schedule.TDAP-IPV', 'schedule.TDAP-IPV_VALUE'),
      DiseaseList('schedule.MMRV', 'schedule.MMRV_VALUE')
    ],
    [
      DiseaseList('schedule.MEN-C-ACYW-135', 'schedule.MEN-C-ACYW-135_VALUE'),
      DiseaseList('schedule.HB', 'schedule.HB_VALUE'),
      DiseaseList('schedule.HPV', 'schedule.HPV_VALUE')
    ],
    [
      DiseaseList('schedule.TDAP', 'schedule.TDAP_VALUE_ITALICS')
    ],
    [
      DiseaseList('schedule.TDAP', 'schedule.TDAP_VALUE')
    ],
    [
      DiseaseList('schedule.TD', 'schedule.TD_VALUE'),
      DiseaseList('schedule.EVERY_10_YEARS')
    ],
    [
      DiseaseList('schedule.PNEU-P-23', 'schedule.PNEU-P-23_VALUE'),
      DiseaseList('schedule.SHINGLES', 'schedule.SHINGLES_VALUE')
    ]
  ]

  function ScheduleItem (labelKey) {
    return {
      labelKey: labelKey
    }
  }
  function DiseaseList (agentName, diseaseList) {
    return {
      agentName: agentName,
      diseaseList: angular.copy(diseaseList)
    }
  }

  this.$onInit = () => {
    let mergedArray = []
    for (let i = 0; i < this.scheduledImmunizationList.length; i++) {
      mergedArray.push({
        scheduleDate: this.scheduledImmunizationList[i],
        diseases: this.scheduledImmsDiseaseList[i]
      })
    }
    this.scheduledImmunizations = mergedArray
  }

  this.getAlignmentClasses = () => {
    if (this.isVerticalAlignment) {
      return 'ontario-schedule-frame vertical'
    } else {
      return 'ontario-schedule-frame'
    }
  }

  this.getHeaderClasses = (scheduleKey) => {
    if (scheduleKey === 'schedule.AT_6_MONTHS_+' || scheduleKey === 'schedule.35_Years_+') {
      return 'age-group recurring'
    } else {
      return 'age-group'
    }
  }
}

export default {
  name: 'ontarioImmunizationScheduleContent',
  component: {
    templateUrl: './components/ontarioImmunizationScheduleContent/ontarioImmunizationScheduleContent.template.html',
    bindings: {
      isVerticalAlignment: '<?'
    },
    controller: ontarioImmunizationScheduleContent$ctrl
  }
}
