/* @ngInject */
function frenchArticle$ctrl (Multitenancy, $translate) {
  this.$onInit = () => {
    this.frenchArticleKey = 'frenchArticle.' + this.type
    Multitenancy
      .getPhuKeys()
      .then((phuAssets) => { this.multitenancy = phuAssets })
  }
}

export default {
  name: 'frenchArticle',
  component: {
    bindings: {
      type: '@'
    },
    templateUrl: '../../components/phu/frenchArticle/frenchArticle.template.html',
    controller: frenchArticle$ctrl
  }
}
