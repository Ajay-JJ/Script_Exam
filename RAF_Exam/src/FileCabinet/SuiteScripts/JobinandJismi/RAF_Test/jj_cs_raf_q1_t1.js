/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
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
 * Description: This script will change the field values and fetch currency rates
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 10-July-2024: Created the initial build by JJ0348
 *
 *
 *
 **************/
define(['N/currentRecord', 'N/http', 'N/https', 'N/record', 'N/recordContext', 'N/redirect', 'N/runtime', 'N/search', 'N/url'],
/**
 * @param{currentRecord} currentRecord
 * @param{http} http
 * @param{https} https
 * @param{record} record
 * @param{recordContext} recordContext
 * @param{redirect} redirect
 * @param{runtime} runtime
 * @param{search} search
 * @param{url} url
 */
function(currentRecord, http, https, record, recordContext, redirect, runtime, search, url) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    /*function pageInit(scriptContext) {

    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
        let curRec = scriptContext.currentRecord;
        let course = 'custpage_plswork';
        let currency = 'custpage_transaction_curr';
        if (scriptContext.fieldId === course) {
            let prefValue = parseInt(curRec.getValue({
                fieldId: course
            }));
        if(prefValue === 1){
            fee = record.load({
                type: 'customrecord_jj_fee_detail',
                id: 1
            });
            amount = fee.getValue({
                fieldId: 'custrecord_jj_actual_fees'
            });
            curRec.setValue({
                fieldId: 'custpage_amount',
                value: amount
            });
           // if(currency){
               // curRec.setValue({
                   // fieldId: 'custpage_exchangerate',
                   // value: 
           // }
        }
        if(prefValue === 2){
            fee = record.load({
                type: 'customrecord_jj_fee_detail',
                id: 2
            });
            amount = fee.getValue({
                fieldId: 'custrecord_jj_actual_fees'
            });
            curRec.setValue({
                fieldId: 'custpage_amount',
                value: 2
            });
        }

        if(prefValue === 3){
            fee = record.load({
                type: 'customrecord_jj_fee_detail',
                id: 3
            });
            amount = fee.getValue({
                fieldId: 'custrecord_jj_actual_fees'
            });
            curRec.setValue({
                fieldId: 'custpage_amount',
                value: 3
            });
        }}

    

        


        

    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {
        let currency = 'custpage_transaction_curr';
        let amount = 'custpage_amount';
        if (scriptContext.fieldId === currency) {
            
            let curRec = scriptContext.currentRecord;
            let curText = curRec.getText(currency);
            if(curText === 'INR'){
                var response = https.get({
                    url: 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_CT6YVzP0SGL7vOPFatFbh5EKP9pPj5SzmYbXKMP0&currencies=INR&base_currency=INR'
                });
                var data = JSON.parse(response.body.text());
                var rate = data.data.INR;
                let exchange = amount*rate;
                curRec.setValue({
                    fieldId: 'custpage_exchangerate',
                    value: exchange
                });
            }

            if(curText === 'GBP'){
                var response = https.get({
                    url: 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_CT6YVzP0SGL7vOPFatFbh5EKP9pPj5SzmYbXKMP0&currencies=GBP&base_currency=INR'
                });
                var data = JSON.parse(response.body.text());
                var rate = data.data.GBP;
                let exchange = amount*rate;
                curRec.setValue({
                    fieldId: 'custpage_exchangerate',
                    value: exchange
                });
            }

            if(curText === 'AUD'){
                var response = https.get({
                    url: 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_CT6YVzP0SGL7vOPFatFbh5EKP9pPj5SzmYbXKMP0&currencies=AUD&base_currency=INR'
                });
                var data = JSON.parse(response.body.text());
                var rate = data.data.AUD;
                let exchange = amount*rate;
                curRec.setValue({
                    fieldId: 'custpage_exchangerate',
                    value: exchange
                });
            }

            if(curText === 'EUR'){
                var response = https.get({
                    url: 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_CT6YVzP0SGL7vOPFatFbh5EKP9pPj5SzmYbXKMP0&currencies=EUR&base_currency=INR'
                });
                var data = JSON.parse(response.body.text());
                var rate = data.data.EUR;
                let exchange = amount*rate;
                curRec.setValue({
                    fieldId: 'custpage_exchangerate',
                    value: exchange
                });
            }

            if(curText === 'USD'){
                var response = https.get({
                    url: 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_CT6YVzP0SGL7vOPFatFbh5EKP9pPj5SzmYbXKMP0&currencies=USD&base_currency=INR'
                });
                var data = JSON.parse(response.body.text());
                var rate = data.data.USD;
                let exchange = amount*rate;
                curRec.setValue({
                    fieldId: 'custpage_exchangerate',
                    value: exchange
                });
            }



            


           
        }



    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    /*function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    /*function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    /*function validateField(scriptContext) {


    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    /*function validateLine(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    /*function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    /*function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    /*function saveRecord(scriptContext) {

    }*/

    return {
        //pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        //sublistChanged: sublistChanged,
        //lineInit: lineInit,
       // validateField: validateField,
       // validateLine: validateLine,
        //validateInsert: validateInsert,
        //validateDelete: validateDelete,
       // saveRecord: saveRecord
    };
    
});
