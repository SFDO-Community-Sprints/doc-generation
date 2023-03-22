public with sharing class DocumentGenerationController {
    public DocumentGenerationController() {

    }

    @AuraEnabled
    public static List<String> getClassicEmailTemplates(String rec){
        List<String> templateNames= new List<String>();
        try {
            
            Id sObjId= (Id)rec;
            System.debug('rec:::'+rec);
            // EmailTemplate coverTemplate = EmailTemplateSelector.getEmailTemplateForCover('Mail Cover Letter');
            System.debug('sobject type'+sObjId.getsobjecttype()); 
            List<EmailTemplate> templates = getEmailTemplate(sObjId.getsobjecttype());
            System.debug('templates->'+templates);
            if(!templates.isEmpty())
            {
                for(EmailTemplate template : templates)
                {
                    templateNames.add(template.name);
                }
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return templateNames;
    }
    
    
    public static List<EmailTemplate> getEmailTemplate(Schema.SObjectType sobjectType)
    {  
        return [Select Id,Name,Subject,HtmlValue,Body from EmailTemplate where name like :'%'+sobjectType+'%' ];
    }
    public static EmailTemplate getEmailTemplateContent(String Name)
    {  
        return [Select Id,Name,Subject,HtmlValue,Body from EmailTemplate where name like :'%'+Name+'%' ];
    }
    
    @AuraEnabled
    public static String generatePDF(String emailTemplateName,String rec,Boolean insertAtt)
    {
        System.debug('insertAtt'+insertAtt);
        System.debug('rec'+rec);
        String returnBody=null;
        try {
            EmailTemplate attachTemplate = getEmailTemplateContent(emailTemplateName);  
            System.debug('attachTemplate'+attachTemplate);
            if(attachTemplate!=null)
            {
                String pdfContent = attachTemplate.HtmlValue;
                
                Messaging.SingleEmailMessage email = Messaging.renderStoredEmailTemplate(attachTemplate.Id, UserInfo.getUserId(), rec);
                System.debug('email'+email);
                System.debug('html'+email.getHtmlBody());
                System.debug('plain'+email.getPlainTextBody());
                if(email.getHtmlBody()!=null)
                {
                    returnBody=email.getHTMLBody();
                }else
                {
                    returnBody=email.getPlainTextBody();
                }
                
                System.debug('returnBody'+returnBody);
                
                
                
                Attachment attachmentPDF = new Attachment();
                attachmentPdf.parentId = rec;
                // attachmentPdf.setContentType('application/pdf');
                attachmentPdf.name = emailTemplateName + '.pdf';
                //attachmentPdf.body = blob.toPDF(renderResults[0].getMergedBody());
                attachmentPdf.body = blob.toPDF(returnBody);
                if(insertAtt)
                {
                    insert attachmentPDF;
                }
                
                String base64Pdf = EncodingUtil.base64Encode(attachmentPdf.body);
                return base64Pdf;
                
            }
          
            return null;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
}