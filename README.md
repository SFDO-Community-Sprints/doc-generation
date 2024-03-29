# doc-generation
Project to provide guidance and solution options for Nonprofits needing a doc gen solution
This project a proud part of Salesforce.org Open Source Commons initiative.


## Problem :- 

Users want to be able to generate PDF documents for different use case scenarios. The document generators available in markets are pricey or require significant  technical expertise.

## Solution :- 
The Open source document generator combines the power of Salesforce email templates and LWC. It enables the users to generate documents tailored to their specific needs.
Working :
User creates/updates an Lightning email template (With merge fields if applicable). User also adds a quick action on the record page of sObject. On click of the quick action, user chooses the applicable email template and  system resolves the merge fields and creates a PDF document (based on the chosen email template)

## Installation Guide:
1. Create the desired email template. The name of the email template should contain the API Name of the sObject based out of which the document need to be generated. Example, if you want to create a welcome aboard email template for new accounts, your email template name should be  Account_<welcomeAboard> or welcomeAboard_Account.
     
<img width="770" alt="3" src="https://user-images.githubusercontent.com/66730581/227024606-d554c324-7014-4f12-88d9-b03c17c0d1d2.png">
<img width="758" alt="4" src="https://user-images.githubusercontent.com/66730581/227024595-ce978a84-525d-4800-bc05-37068b7a5d32.png">

2. Create a quick action on the corresponding Object. 
    Action type: Lightning web component
    LightningWebComponent : generateDocumentsQuickAction
  Label : <your choice>
     <img width="952" alt="1" src="https://user-images.githubusercontent.com/66730581/227024504-e6cd909a-a9ee-4faa-99ea-67f50a12d9fd.png">
     
3. Add the quick action to the required page layout. Example, for quick action to be on Account, Object Manager-> Account-> Page layouts-> Mobile Lightning Action-> Drag and drop the quick action created on the previous step.
     <img width="949" alt="2" src="https://user-images.githubusercontent.com/66730581/227024553-1a4ad10a-b1d0-407e-a112-dc36e52c7883.png">
4. Setup-> Static Resources -> upload download.js . MIME Type: Text/Javascript , Cache control : Public
    <img width="626" alt="7" src="https://user-images.githubusercontent.com/66730581/227025704-c4eeb6b0-3458-4b97-a138-045c3540b279.png"> 
5. Your installation is ready !

    






    
    
      
 ##  How to generate Document: 
    
  1. Once installed, your quick action button should be available on detail page. 
  2. Click on the button-> choose your document template-> Click on generate Document.
  <img width="956" alt="6" src="https://user-images.githubusercontent.com/66730581/227024603-d9315455-f6e6-48c0-b0be-9d4430d0920f.png">
  
  


##  Considerations/limitations:
Currently, this tool does not support templates with  rich text formats and multiple images. However it supports basic HTML templates.




##  Upcoming releases
Support for rich text format documents.
Functional for any page size/ Image/ Content.


## Vertical-  Nonprofit 


## Trailblazer Group or Slack Channel Link (access required)
https://app.slack.com/client/T01G0063H29/C04K8PJNYLW/thread/C04AFQFSCQP-1673954871.274739

  
  
  
  
  
## Other famous commercial Document generator tools:
  1. S-Docs
  2. Conga
  3. Foundation Document generation
  4. Docomotion.
 

  
## How to Contribute:
- Way 1. Support by providing us used cases of Doc Gen Requirement within the Non Profit Sector
- Way 2. Support with developing and testing the tool 

## Project Resources and Documentation
[Documentation can be found in the repository [wiki] (URL for wiki where docs are stored)
](https://docs.google.com/presentation/d/1PDGXjLBDfAEgEiokrvMGObkf2pdQ6evNHxAkrX3yuV0/edit#slide=id.g1d752c44c13_0_0)
https://docs.google.com/forms/d/e/1FAIpQLSd8483IlUJUJlznxsMznZHkmWJQ75O83pkzdKien1seg-4jJw/viewform
https://docs.google.com/document/d/1bUG0DQGpAULCAyFRIWJnFWAnWWBVuWfZI6oacJOYqD8/edit

***
BELOW CONTENT TO USE TO CREATE YOUR FIRST WIKI PAGE TO HOUSE DETAILS ABOUT YOUR SPRINT PARTICIPATION. 
1. Cut the below from the readme and paste into a new Wiki page. Delete these instructions.
2. Update that wiki page with details from the Sprint. 
3. Copy that format for the next Sprint.

# Sprint (17th and 18th Jan 23 london - ): 
## Project Team & Accomplishments
Add details here - what you did, links to docs if there are any, etc.

## Contributors

Full Name            | Team Role               | Github Username                                    | Working Group? 
------------         | -------------           | -------------                                      |-------------   
Rebecca Heald        | Group Leader            |    | 
Aishwarya Badri      | Contributor/Developer   |                                                    | 
Phoebe Lee
Srividya



## Future Contributions 
(AKA what were you unable to finish at the Sprint)
Replace with the goals your team would like to continue working on next time.

***


