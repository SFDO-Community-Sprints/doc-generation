import { LightningElement,api,wire } from 'lwc';
import fetchTemplates from '@salesforce/apex/DocumentGenerationController.getClassicEmailTemplates';
import generatePDF from '@salesforce/apex/DocumentGenerationController.generatePDF';
import downloadjs from '@salesforce/resourceUrl/download_jslib';
import { loadScript } from 'lightning/platformResourceLoader';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class GenerateDocumentsQuickAction extends LightningElement {
 
    @api objectApiName;
    options;
    showOptions=false;
    _recordId;
    emailTemplateValue;
    insertAttachment=false;

    @api set recordId(value) {
        console.log('setter inside');
      
    this._recordId = value;
    this.getTemplates();
    // do your thing right here with this.recordId / value
}
get recordId() {
    return this._recordId;
}
renderedCallback() {
    loadScript(this, downloadjs)
    .then(() => console.log('Loaded download.js'))
    .catch(error => console.log(error));
}

    getTemplates()
    {

        console.log('getTemplates entry:::'+ JSON.stringify(this.recordId));
        fetchTemplates({ rec: this.recordId })
            .then(result => {
            let templateNames = [];
            if (result) {
            result.forEach(r => {
                console.log("r"+JSON.stringify(r));
                templateNames.push({
                label: r,
                value: r,
                });
            });
            this.showOptions=true;
            this.options = templateNames;
            console.log("show options"+this.showOptions);
            console.log(" options"+this.options);
            }
               
                
            })
            .catch(error => {
                this.error = error;
            });
    }


    handleRadionChange(event)
    {
        console.log(JSON.stringify(event.detail));
        this.emailTemplateValue=event.detail.value;

    }

    handleNext()
    {
        console.log('handleNext value'+this.emailTemplateValue);
       
        generatePDF({ emailTemplateName: this.emailTemplateValue , rec :this.recordId ,insertAtt : this.insertAttachment})
        .then(result => {
          
        let templateNames = [];
        if (result) {
      
     
        console.log("result"+JSON.stringify(result));
      
       
        var strFile = "data:application/pdf;base64,"+result;
        console.log("strFiles"+JSON.stringify(strFile));
        window.download(strFile, this.emailTemplateValue+".pdf", "application/pdf");
     
        
        this.showNotification("Success","Document generation is successful", "success");
        this.dispatchEvent(new CloseActionScreenEvent());
       
        }
           
            
        })
        .catch(error => {
            console.log("show error"+JSON.stringify(error));
            this.showNotification("Error","Document generation failed. Try again after sometime", "error");
            this.error = error;
            this.dispatchEvent(new CloseActionScreenEvent());
        });

    }

    showNotification(title,message,variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    toggleChange(event) 
    {
        this.insertAttachment=event.target.checked;
        console.log(this.insertAttachment);
    }
    cancelAction()
    {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    
}