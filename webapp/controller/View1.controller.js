sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Slider",
	"sap/m/ResponsiveScale",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (Controller, Slider, ResponsiveScale, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("com.fullthrottletest.interestratecalculator.controller.View1", {
		onInit: function () {
			var that = this;

			that.oRangeSlider = new Slider({
				max: "{ticks>/max}",
				min: "{ticks>/min}",

				value: "{ticks>/value1}",
				enableTickmarks: true,
				showAdvancedTooltip: true,
				showHandleTooltip: false,
				width: "100%",
				step: "{ticks>/step}",
				enabled: true,

				scale: new ResponsiveScale({
					tickmarksBetweenLabels: 1
				})
			});
			//Attach Change Event To Slider
			that.oRangeSlider.attachChange(this.onSliderChange, this);

			that.oRangeSlider.addDelegate({
					onAfterRendering: function () {
						var $this = this.$();
						var month = this.getModel("ticks").getProperty("/month");

						$this.find(".sapMSliderLabel").each(function (i, label) {

							this.v = $(label).text();
							if (this.v <= 5000) {
								$(label).text(month + "" + this.v);
							}

						});

					}
				},
				that.oRangeSlider);

			that.oRangeSlider.setModel(new JSONModel({
				max: 5000,
				min: 500,
				month: "$",
				value1: 500,
				step: 500

			}), "ticks");

			return this.byId("verticalLayoutId").addContent(that.oRangeSlider);

		},

		onSliderChange: function () {
			var that = this;

			//Open Busy Dialog
			var dialog = new sap.m.BusyDialog({

				text: 'Loading Data...'

			});
			dialog.open();

			var userSelectedTenureValue = this.getView().byId("stepInputId").mProperties.value;
			var userSelectedLoanAmountValue = this.oRangeSlider.mProperties.value;

			var userEnteredLoanAmountValue = this.getView().byId("amountInputId").setValue(userSelectedLoanAmountValue);

			var fullThrottleLabsApi = "https://ftl-frontend-test.herokuapp.com/interest?amount=" + userSelectedLoanAmountValue + "&numMonths=" +
				userSelectedTenureValue;

			$.get(fullThrottleLabsApi, function (data, status) {

				var apiInterestRate = data.interestRate;
				var apiMonthlyAmount = data.monthlyPayment.amount;
				var listItemLoanAmount = "Amount:" + " " + userSelectedLoanAmountValue;
				var listItemTenureValue = "EMI Tenure:" + " " + userSelectedTenureValue + " " + "Months";
				that.listItem = new sap.m.StandardListItem({
					title: "EMI Tenure:" + " " + userSelectedTenureValue + " " + "Months",
					info: "USD",
					description: listItemLoanAmount,
					wrapping: false,
					infoState: "Error",
					highlight: "Success"

				});

				//Dialog Close
				dialog.close()
				that.getView().byId("list").addItem(that.listItem);

				//Setting Value in Generic Tags Amount
				that.getView().byId("genericTagInterestRateId").setNumber(apiInterestRate);
				that.getView().byId("genericTagInterestRateId").setNumberUnit("%");
				//Setting Value in Generic Tags Interest Rate
				that.getView().byId("genericTagMonthlyAmountId").setNumber(apiMonthlyAmount);
				that.getView().byId("genericTagMonthlyAmountId").setNumberUnit("USD");

			});

		},

		listItemSelect: function (oEvent) {
			var that = this;

			var listItemMonthTenure = oEvent.mParameters.listItem.mProperties.title.slice(12, 14);
			listItemMonthTenure.replace(/\s+/g, ' ').trim(); //Remove Extra Space From String 
			var listItemLoanAmount = oEvent.mParameters.listItem.mProperties.description.slice(8, 12);
			listItemLoanAmount.replace(/\s+/g, ' ').trim(); //Remove Extra Space From String 

			var fullThrottleLabsApi = "https://ftl-frontend-test.herokuapp.com/interest?amount=" + listItemLoanAmount + "&numMonths=" +
				listItemMonthTenure;

			$.get(fullThrottleLabsApi, function (data, status) {

				var apiInterestRate1 = data.interestRate;
				var apiMonthlyAmount1 = data.monthlyPayment.amount;
				that.getView().byId("genericTagInterestRateId").setNumber(apiInterestRate1);
				//API Data Set To Generic Tags
				that.getView().byId("genericTagMonthlyAmountId").setNumber(apiMonthlyAmount1);
			});
			var userEnteredLoanAmountValue = this.getView().byId("amountInputId").setValue(listItemLoanAmount);
			var userSelectedTenureValue = this.getView().byId("stepInputId").setValue(listItemMonthTenure);
			//Set Default value to slider
			this.oRangeSlider.setValue(500); //Default Slider Value

		},

		//Calculate button event
		onPressCalculate: function () {
			var that = this;
			var userSelectedTenureValue = this.getView().byId("stepInputId").mProperties.value;
			var userEnteredLoanAmountValue = this.getView().byId("amountInputId").mProperties.value;
			//Set Default Range Slider Value
			this.oRangeSlider.setValue(500);
			//Open Busy Dialog
			var dialog = new sap.m.BusyDialog({

				text: 'Loading Data...'

			});
			dialog.open();

			var fullThrottleLabsApi = "https://ftl-frontend-test.herokuapp.com/interest?amount=" + userEnteredLoanAmountValue + "&numMonths=" +
				userSelectedTenureValue;

			$.get(fullThrottleLabsApi, function (data, status) {

				var apiInterestRate = data.interestRate;
				var apiMonthlyAmount = data.monthlyPayment.amount;
				var listItemLoanAmount = "Amount:" + " " + userEnteredLoanAmountValue;
				var listItemTenureValue = "EMI Tenure:" + " " + userSelectedTenureValue + " " + "Months";
				that.listItem = new sap.m.StandardListItem({
					title: "EMI Tenure:" + " " + userSelectedTenureValue + " " + "Months",
					info: "USD",
					description: listItemLoanAmount,
					wrapping: false,
					infoState: "Error",
					highlight: "Success"

				});

				//Dialog Close
				dialog.close()
				that.getView().byId("list").addItem(that.listItem);

				//Setting Value in Generic Tags Amount
				that.getView().byId("genericTagInterestRateId").setNumber(apiInterestRate);
				that.getView().byId("genericTagInterestRateId").setNumberUnit("%");
				//Setting Value in Generic Tags Interest Rate
				that.getView().byId("genericTagMonthlyAmountId").setNumber(apiMonthlyAmount);
				that.getView().byId("genericTagMonthlyAmountId").setNumberUnit("USD");

			});

		},

		onSemanticButtonPress: function () {

			// Code Needs to be write according to the requirements
		},

		onAmountInputValueChange: function () {

			var amountInputValue = this.getView().byId("amountInputId");

			var domAmountInputValue = amountInputValue.getDOMValue();

			if (domAmountInputValue < 500) {
				amountInputValue.setValueState("Error");
				amountInputValue.setValueStateText("Enter the amount greater than $500");

			}

			if (domAmountInputValue == 500 || domAmountInputValue > 500) {
				amountInputValue.setValueState("Success");
				amountInputValue.setValueStateText("");

			}
			if (domAmountInputValue > 5000) {
				amountInputValue.setValueState("Error");
				amountInputValue.setValueStateText("Enter the amount less than $5000");

			}

		},

		//Step Input Value Change
		onStepInputValueChange: function () {

			this.oRangeSlider.setValue(500); //Default Slider Value
			var stepInputValue = this.getView().byId("stepInputId");
			if (stepInputValue.mProperties.value < 6 || stepInputValue.mProperties.value > 24 || stepInputValue.mProperties.value == "") {

				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				stepInputValue.setValue(6);
				stepInputValue.setValueState("Success");
				MessageBox.error(
					" EMI tenure can be selected between 6 to 24 months.", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);

			}

		},

		//Reset default values
		onResetPress: function () {
			var that = this;
			this.oRangeSlider.setValue(500);
			this.getView().byId("amountInputId").setValue(500);
			this.getView().byId("stepInputId").setValue(6);

			//Setting default Value in Generic Tags Amount
			that.getView().byId("genericTagInterestRateId").setNumber("");
			that.getView().byId("genericTagInterestRateId").setNumberUnit("");
			//Setting default Value in Generic Tags Interest Rate
			that.getView().byId("genericTagMonthlyAmountId").setNumber("");
			that.getView().byId("genericTagMonthlyAmountId").setNumberUnit("");
			that.getView().byId("list").removeAllItems(that.listItem);
		}

	});
});
		