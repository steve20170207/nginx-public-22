/**
 * Created on 2017-01-16.
 * Component for document capture
 */
/* @ngInject */
function documentUploadDisplay$ctrl (FileUploadHandler, ICON_FILE_UPLOAD) {
  this.$onInit = () => {
    FileUploadHandler.getUploader()
                     .then((uploader) => { this.uploader = uploader })

    this.getFileExtensionGlyphClass = (file) => {
      let extension = file.name.substr((file.name.lastIndexOf('.') + 1)).toLowerCase()

      switch (extension) {
        case 'doc':
        case 'docx':
          return 'fa fa-file-word-o'

        case 'jpeg':
        case 'jpg':
        case 'png':
          return 'fa fa-file-image-o'

        case 'pdf':
          return 'fa fa-file-pdf-o'

        default:
          return 'fa fa-file-o'
      }
    }
  }
}

export default {
  name: 'documentUploadDisplay',
  component: {
    bindings: {
      isEditable: '<',
      docReview: '@'
    },
    templateUrl: './components/documents/documentUploadDisplay/documentUploadDisplay.template.html',
    controller: documentUploadDisplay$ctrl
  }
}
