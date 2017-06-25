/**
 * Created by USER
 */


(function(){

    var myApp =  angular.module("GeekStore", []);

    //controllers

    myApp.controller("ProductsController" , ProductsController);

    ProductsController.$inject = ['$scope' , '$http'];
    function ProductsController($scope, $http) {
        $scope.products = [];
        $scope.bill = [];
        $scope.history = [];
        $scope.listProducts = [];
        getProducts();
        $scope.bills = [];
        getInvoce();

        var URL = "/api/matrix";
        $scope.product = "";
        $scope.quantity = 0;
        $scope.value = 0;
        $scope.currency = "";

        $scope.message = "Usted no ha realizado ninguna compra aún";

        $scope.getProduct =  function(){
            for (var i = 0 ; i< $scope.listProducts.length; i++) {
                if($scope.product === $scope.listProducts[i].nombre){   
                    $scope.quantity = 0;
                    $scope.value = $scope.listProducts[i].precio;
                    $scope.currency =$scope.listProducts[i].moneda;
                };
            };
        };

        $scope.addProduct =  function(){
            $scope.products.push(  {name: $scope.product, quantity: $scope.quantity , value: $scope.value, currency: $scope.currency });
            $scope.product = "";
            $scope.quantity = 0;
            $scope.value = 0;
            $scope.currency = "";

        };



        $scope.removeProduct =  function(productName){
            for(var i = 0 ;  i < $scope.products.length; i++){
                if(  $scope.products[i].name == productName){
                    $scope.products.splice(i, 1);
                }
            }
        };

        $scope.buyProducts =  function(){
            //TODO
            var URL = "/api/invoice";
            var jsondata =  {products: $scope.products};

            $http.post(URL, jsondata).
            success(function(data, status, headers, config) {
                $scope.bill = data;
                $scope.bills.push(data);
                $scope.products =[];
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });
        };

        $scope.getProductPDF =  function(){
            var tableData = [];
            tableData.push(['Cantidad', 'Nombre', 'Precio Unitario', 'Total']);
            for (var i =0; i < $scope.bill.products.length ; i++) {
                tableData.push([$scope.bill.products[i].quantity,$scope.bill.products[i].name,$scope.bill.products[i].value,$scope.bill.products[i].amount]);
            }

            var docDefinition = {
              content: [
                
                    { text: 'GeekStore', style: 'header', margin: [ 0, 0, 0, 20 ]  },
                    {table: {
                        headerRows: 1,
                        widths: [ '*', 'auto', 100, '*' ],
                        body: tableData
                    }},
                    {
                      columns: [
                        '       ',
                        '       ',
                        [
                          'Subtotal ',
                          'Iva ',
                          'Total '
                        ],
                        [

                          $scope.bill.subtotal,
                          $scope.bill.iva,
                          $scope.bill.total
                        ],
                        ], style: 'subheader', margin: [ 0, 20, 0, 20 ]
                    }
                
              ],
              styles: {
                 header: {
                   fontSize: 22,
                   bold: true
                 },
                 anotherStyle: {
                   italic: true,
                   alignment: 'right'
                 },
                 subheader:{
                    fontSize: 14,
                    bold: true
                 
                 }
                }
            };
            pdfMake.createPdf(docDefinition).download('bill'+ $scope.bill.id +'.pdf');
            
        };

        $scope.getInvoce = getInvoce;

        function getInvoce(){
            var URL = "/api/invoice";
            $http.get(URL).
            success(function(data, status, headers, config) {
                $scope.bills = data ;
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });
        };

        $scope.getProducts = getProducts;

        function getProducts(){
            var URL = "/api/product";
            $http.get(URL).
            success(function(data, status, headers, config) {
                $scope.listProducts = data ;
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });
        };

        $scope.getBill =  function(billId){
            //TODO
            var URL = "/api/invoice";
            var jsondata =  {products: $scope.products};
            for (var i = 0 ; i< $scope.bills.length; i++) {
                if(billId === $scope.bills[i].id){   
                    $scope.bill = $scope.bills[i];
                    break;
                };
            };
        };

    }


})();