$(document).ready(function(){
    const IP = '62.28.29.50:82';

    function AjaxRequest(jsonReq){
        $.ajax({
            method: jsonReq.hasOwnProperty('method') ? jsonReq.method : 'GET',
            url: jsonReq.url,
            data: jsonReq.data,
            cache: false,
            timeout: jsonReq.hasOwnProperty('timeout') ? jsonReq.timeout : 0,
            crossDomain: true
        })
        .done(function(data, textStatus, jqXHR){
            if(jsonReq.hasOwnProperty('doneFunction'))
                jsonReq.doneFunction(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown){
            console.log(textStatus);
            if(jsonReq.hasOwnProperty('failFunction'))
                jsonReq.failFunction();
        });
    }


   /* function AppViewModel() {
        var self = this;
        this.name = ko.observable("user");
        this.age = ko.observable("37");
        this.response = ko.observable('');

        this.showAllData = ko.computed(function(){
            return self.name() + " " + self.age();
        });

        this.getMordomusJson = function() {
            $.ajax({
                url: 'http://www.mordomus.com/_my/myip.php',
                method: 'get',
                data: {name: 'ioline'}
            }).done(function(data){
                console.log(data);
                //self.response(ko.toJSON(data));
                self.response(JSON.stringify(data));
            })
            .fail(function(error){

            });
        }

        self.getMordomusJson();
    }

*/
    function Devices() {
        var self = this;
        self.loginStatus = ko.observable();

        self.login = function(){
            var myu = 'stick',
                myp = 'mordomus',
                d = new Date();
                ml = d.getTime(),
                aux1 = ml + (myu).toLowerCase(),
                aux2 = ml + myp,
                myhusa = CryptoJS.MD5(aux1),
                myhpas = CryptoJS.MD5(aux2),
                ml1 = (ml * 3);
            
            var ajaxRequest = new AjaxRequest(
                {
                    url: 'http://' + IP + '/logas',
                    data: {value: myhusa + myhpas, value1: String(ml1)},
                    doneFunction: function(data) {
                        console.log(data);
                        if(data.Hello[0].Login == 'OK') {
                            self.loginStatus('LOGIN OK');
                            self.getDevices();
                        } else {
                            self.loginStatus('LOGIN FAILED');
                        }

                    } 
                }
            );
        }

        self.getDevices = function(){
            var ajaxRequest = new AjaxRequest(
                {
                    url: 'http://' + IP + '/json',
                    data: 'devices',
                    doneFunction: function(data) {
                       

                    } 
                }
            );
        }

        self.login();
    }



    // Bind view model to a specific container
    //ko.applyBindings(new AppViewModel(),document.getElementById("container1"));
   // ko.applyBindings(new AppViewModel());
    ko.applyBindings(new Devices());
});
