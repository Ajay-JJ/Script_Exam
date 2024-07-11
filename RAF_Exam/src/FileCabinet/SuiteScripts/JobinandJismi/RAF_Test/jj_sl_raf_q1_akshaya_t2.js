/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/**********************************************************************************
 * Tuition Fee Query Record Creation
 *
 *
 * ********************************************************************************
 *
 * ********************
 * company name
 *
 * Author: Ajay Sankar J, Jobin and Jismi IT Services
 *
 *
 * Date Created: 11-July-2024
 *
 * Description: This script have a custom form and transfer it to a custom record after submitting the form
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 11-July-2024: Created the initial build by JJ0348
 *
 *
 *
 **************/
define(['N/auth', 'N/currency', 'N/currentRecord', 'N/email', 'N/error', 'N/file', 'N/format', 'N/http', 'N/https', 'N/https/clientCertificate', 'N/keyControl', 'N/log', 'N/record', 'N/recordContext', 'N/redirect', 'N/render', 'N/runtime', 'N/search', 'N/ui/serverWidget', 'N/url'],
    /**
 * @param{auth} auth
 * @param{currency} currency
 * @param{currentRecord} currentRecord
 * @param{email} email
 * @param{error} error
 * @param{file} file
 * @param{format} format
 * @param{http} http
 * @param{https} https
 * @param{clientCertificate} clientCertificate
 * @param{keyControl} keyControl
 * @param{log} log
 * @param{record} record
 * @param{recordContext} recordContext
 * @param{redirect} redirect
 * @param{render} render
 * @param{runtime} runtime
 * @param{search} search
 * @param{serverWidget} serverWidget
 * @param{url} url
 */
    (auth, currency, currentRecord, email, error, file, format, http, https, clientCertificate, keyControl, log, record, recordContext, redirect, render, runtime, search, serverWidget, url) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
           if (scriptContext.request.method === 'GET'){
           // let header = scriptContext.request.headers; // declared a variable to get header in GET method
           // //let url = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_CT6YVzP0SGL7vOPFatFbh5EKP9pPj5SzmYbXKMP0&currencies=INR%2CGBP%2CEUR%2CUSD%2CAUD&base_currency=INR';
           // let response = http.get({
                  // url: url,
                  // headers: header
              // });
                //log.debug("response", response)
                //let body = response.body;  //stored the value of body passed through the api in a variable
                //let data = JSON.parse(body);
                //let length = data.length;

                

                let form = serverWidget.createForm({
                    title: "Tuition Fee Query"
                });

                form.clientScriptFileId = 600;

                // added fields to the form.
                form.addField({
                    id: 'custpage_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                })

                
                form.addField({
                    id: 'custpage_age',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Age'
                })

                form.addField({
                    id: 'custpage_phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Phone'

                })

                form.addField({
                    id: 'custpage_email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email'

                })

                form.addField({
                    id: 'custpage_country',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Country'

                })

               /* var selectField = */form.addField({
                    id : 'custpage_plswork',
                    type : serverWidget.FieldType.SELECT,
                    label : 'Course',
                    source: 'customlist_jj_course_tuition'     
                });

                form.addField({
                    id: 'custpage_transaction_curr',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Transaction Currency',
                    source: 'customlist_jj_curr_raf'
                })

                form.addField({
                    id: 'custpage_amount',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Amount',
                    //source: 'customlist_jj_course_fees1'
                })

                form.addField({
                    id: 'custpage_exchangerate',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Exchange Rate',
                    //source: 'customlist_jj_course_fees1'
                })



                form.addSubmitButton({
                    label: 'Submit'
                });

                scriptContext.response.writePage(form);
            }else {
                let request = scriptContext.request;
                let name = request.parameters.custpage_name;
                let email = request.parameters.custpage_email;
                let phone = request.parameters.custpage_phone;
                let age = request.parameters.custpage_age;
                let course = request.parameters.custpage_plswork;
                let currency = request.parameters.custpage_transaction_curr;
                let amount = request.parameters.custpage_amount;
                let exchange = request.parameters.custpage_exchangerate;

                let tutRec = record.create({
                    type: 'customrecord_jj_tuition_fee_query',
                    isDynamic: true
                });

                tutRec.setValue({
                    fieldId: 'name',
                    value: name});
                
                tutRec.setValue({
                    fieldId: 'custrecord_jj_tuition_address',
                    value: email
                });

                tutRec.setValue({
                    fieldId: 'custrecord_jj_tuition_phone',
                    value: phone
                });

                tutRec.setValue({
                    fieldId: 'custrecord_jj_tutition_age',
                    value: age
                });

                tutRec.setValue({
                    fieldId: 'custrecord_jj_tuition_language',
                    value: course
                });

                tutRec.setValue({
                    fieldId: 'custrecord_jj_transaction_currency',
                    value: currency
                });

                tutRec.setValue({
                    fieldId: 'custrecord_jj_fee_amount',
                    value: amount
                });

                tutRec.setValue({
                    fieldId: 'custrecord_jj_exchange_rate',
                    value: exchange
                });

                let tutId = tutRec.save();

                scriptContext.response.write('Tuition Fee Query submitted successfully!<br>');
                scriptContext.response.write('Name: ' + name + '<br>');
                scriptContext.response.write('Email: ' + email + '<br>');
                scriptContext.response.write('Phone: ' + phone + '<br>');
                scriptContext.response.write('Course: ' + course + '<br>');
                scriptContext.response.write('Amount: ' + amount + '<br>');
                scriptContext.response.write('Age: ' + age + '<br>');
                scriptContext.response.write('Tuition Record ID: ' + tutId + '<br>');

                email.send({
                    author: -5,
                    recipients: -5,
                    subject: "Tuition Fee Query Received for Training",
                    body: "Link: https://td2920378.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=17&id="+tutId
                });
            }

        }
    
    

        return {onRequest}

    });
