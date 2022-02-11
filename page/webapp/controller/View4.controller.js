sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("page.controller.View4", {
            onInit: function () {
                var userDetailsModel = new sap.ui.model.json.JSONModel();
                // this.userDetailsModel = new JSONModel({});
                this.getView().setModel(this.userDetailsModel, "UserDetailsModel");
                var authInfoData = {};
                $.ajax({
                    type: "GET",
                    url: "/eci-supplier-backend/getToken",
                    dataType: "json",
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        authInfoData = data;
                    }
                });
                debugger;
                if(typeof authInfoData.jwt !== 'undefined'){
                var userfirstName = authInfoData.jwt.name.givenName;
                var userLastName = authInfoData.jwt.name.familyName;
                var nameInitials = userfirstName.substring(0, 1) + userLastName.substring(0, 1);
                this.byId("avatarId").setInitials(nameInitials);
                this.userDetailsModel.setProperty("/jwtDetails", authInfoData.jwt);
                console.log(this.getView().getModel("UserDetailsModel").getData());
                }
            },
            press : function(evt) {              
                debugger;
                window.open('https://supplier.ariba.com', '_blank');
                MessageToast.show("Opened in new tab.");
            },
            press1 : function(evt) {
                debugger;
                window.open('https://xcore2.fgvms.com/SSOLogin?SSOParams=company%3DNINA%3B%3Breturningurl%3DcloseWindow', '_blank');
                MessageToast.show("Opened in new tab.");
            },
        });
    });