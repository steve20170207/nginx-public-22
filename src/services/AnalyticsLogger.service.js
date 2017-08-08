/* @ngInject */
function AnalyticsLogger (moment, Endpoint, TokenHandler) {
/* Private ********************************************************************/

  const eventAction = {
    CHI_SURVEY: { chiSurvey: true },
    CONTACT_PHU: { contactPhu: true },
    REVOKED_AGE: { revokedAge: true },
    REVOKED_CONSENT: { revokedConsent: true },
    REVOKED_PHU: { revokedPhu: true },
    SET_LANGUAGE_EN: { setLanguage: 'en' },
    SET_LANGUAGE_FR: { setLanguage: 'fr' }
  }

  let previousPageTrack = { detail: '', timestamp: 0 }

  /** Factory for enums whose keys and values both match the keys of the parent.
  * @param {object} parent - the object to strip keys from
  * @returns {object} - an enum with matching key value pairs */
  const KeysAsEnum = (parent) => Object.keys(parent)
  .reduce((enumParent, key) => {
    if (key) enumParent[key] = key
    return enumParent
  }, {})

  /** Calculates the duration spent on a page (route). @returns {boolean} */
  function calculatePageDuration (currentPageTrack, previousPageTrack) {
    return (previousPageTrack.timestamp)
              ? (currentPageTrack.timestamp - previousPageTrack.timestamp)
              : 0
  }

  /** Calculates the duration of a submission transaction. @returns {number} */
  function calculateTransactionDuration (token) {
    if (token && token.decoded && token.decoded.originalIat) {
      return (Date.now() - token.decoded.originalIat * 1000)
    }

    if (token && token.decoded && token.decoded.iat) {
      return (Date.now() - token.decoded.iat * 1000)
    }

    return Date.now()
  }

/* Public *********************************************************************/
  /**
   * Handles user click event tracking by sending POST to analytics endpoint.
   * @param {CustomEvent} - the analytics event dispatched by $analytics module
   */
  function handleEventTrack ({ detail }) {
    if (eventAction[detail]) Endpoint.postAnalyticsLog(eventAction[detail]).catch(angular.noop)
    else console.error(`Event Action "${detail}" is not a valid option for logging!`)
  }

  /**
   * Handles page/route transition event tracking by realying for POST to analytics endpoint.
   * @param {CustomEvent} - the analytics event dispatched by $analytics module
   */
  function handlePageTrack ({ detail }) {
    let currentPageTrack = { detail: detail, timestamp: Date.now() }
    let duration = calculatePageDuration(currentPageTrack, previousPageTrack)

    // The time of the page track, in minutes
    const timeOfDay = (moment().hour() * 60) + moment().minute()

    // When the route logged is confiramtion, log transaction duration & time of day.
    const isEndSubmissionPage = (detail.indexOf('confirmation') > -1)
    if (isEndSubmissionPage) {
      let transactionToken = TokenHandler.inspectTransactionToken()

      Endpoint.postAnalyticsLog({
        transitionPage: detail,
        submissionDuration: calculateTransactionDuration(transactionToken),
        timeOfDay: timeOfDay
      })
      .catch(angular.noop)
    }

    const retrievalRoutes = [
      'auth/other/patient',
      'auth/self/patient'
    ]
    // When the route logged is a retrieval route, log time of day.
    const isRetrievalPage = retrievalRoutes.some(r => (detail.indexOf(r) > -1))
    if (isRetrievalPage) {
      Endpoint.postAnalyticsLog({
        transitionPage: detail,
        timeOfDay: timeOfDay
      })
      .catch(angular.noop)
    }

    // Log the current route transition with zero duration.
    Endpoint.postAnalyticsLog({
      transitionPage: detail,
      duration: 0
    })
    // Log the previous route transition with calculated duration.
    .then(() => {
      if (previousPageTrack.detail && duration) {
        Endpoint.postAnalyticsLog({
          transitionPage: previousPageTrack.detail,
          duration: duration
        })
      }
    })
    // Swap in the current as previous for the next time this function is called.
    .then(() => { previousPageTrack = currentPageTrack })
    .catch(angular.noop)
  }

/* Interface ******************************************************************/

  return {
    handleEventTrack: handleEventTrack,
    handlePageTrack: handlePageTrack,
    eventAction: KeysAsEnum(eventAction)
  }
}

export default {
  name: 'AnalyticsLogger',
  service: AnalyticsLogger
}
