$(document).ready(function () {
    $(".category").first().removeClass("hide-item");
    $(".opening").not('.emptyMessage').click(function () {

        var id = this.id;
        $("#OP_" + id).removeClass("hide-item").toggle("slow");

    });

    $('a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
    //$('.slide-link[data-slide="0"]').addClass('active');
    function showDetails(animal) {
        var animalType = animal.getAttribute("data-atribut");
        alert("The " + animal.innerHTML + " is a " + animalType + ".");
    }

    $(".grupName").click(function () {
        showDetails(this)
    });

    $("#addgrup").click(function () {
        $("#Addgrupopap").removeClass("hide-item");
        $("body").addClass("blar");

    });

    $("#CloseAddgrupopap").click(function () {
        $("#Addgrupopap").addClass("hide-item");
        $("body").removeClass("blar")

    });
    $("#savedgrup").click(function () {
        var addgrup = $("#add-grup").val();

        if ($("#add-grup").val() == "") {

            $("#add-grup").css('border', 'solid 2px red');
            $("#erroren").css("display", "block");
        } else {

            $("#add-grup").css('border', 'solid 2px green');
            $("#add-grup").css('color', 'green');
            $("#erroren").css("display", "none");

            $.ajax({
                url: "/Home/AddGrup",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({ "name": addgrup }),
                error: function (e) {
                    // ნებისმიერი ერორი მოდის აქ
                    $(".bot-fb-connection-modal-content").html("");
                    $(".bot-fb-connection-modal-content").append("დაფიქსირდა შეცდომა");
                    $("#add-fb-modal").removeClass("hide-item");
                },
                success: function (data) {
                    if (data.success) {
                        if (data.result = "saved") {

                            location.reload();

                            $("#Addgrupopap").addClass("hide-item");
                            $("#add-grup").val("");
                            $("#add-grup").css('border', 'black');
                            $("body").removeClass("blar")
                        }
                    }
                    else {
                        $(".bot-fb-connection-modal-content").html("");
                        $(".bot-fb-connection-modal-content").append("<p>" + data.errorMessage + "</p>");
                        $("#add-fb-modal").removeClass("hide-item");
                    }

                }
            });
        }
    });

    $(".deletegrup").not('.emptyMessage').click(function () {
        var id = this.id;
        $(".deleteopap").removeClass("hide-item");
        $("body").addClass("blar")
        $(".deletyes").attr('id', id);

    });
    $(".deletno").click(function () {
        $(".deleteopap").addClass("hide-item");
        $("body").removeClass("blar");

    });

    $(".deletyes").not('.emptyMessage').click(function () {
        var id = this.id;

        $.ajax({
            type: "GET",
            url: "/Home/Delete/",
            data: { Id: id },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            error: function (e) {
                // ნებისმიერი ერორი მოდის აქ
                $(".bot-fb-connection-modal-content").html("");
                $(".bot-fb-connection-modal-content").append("დაფიქსირდა შეცდომა");
                $("#add-fb-modal").removeClass("hide-item");
            },
            success: function (data) {
                if (data.success) {
                    if (data.result = "saved") {

                        $(".deleteopap").addClass("hide-item");
                        $("body").removeClass("blar");
                        location.reload();
                    }
                }
            },
            error: function (response) {

                alert("ტექნიკური ხარვეზი");
                $(".deleteopap").addClass("hide-item");
                $("body").removeClass("blar");
            }
        });


    });



    //პროდუცრის დამატება



    $(".addcategory").not('.emptyMessage').click(function () {
        var id = this.id;
        $(".addproductopap").removeClass("hide-item");
        $("body").addClass("blar")
        $("#inputaddprodu").attr('value', id);

    });

    $("#Closeproductopap").click(function () {
        $(".addproductopap").addClass("hide-item");
        $("body").removeClass("blar");

    });




    //კატეგორის წაშლა
    $(".deletecategory").not('.emptyMessage').click(function () {
        var id = this.id;
        $(".deletCategoryeopap").removeClass("hide-item");
        $("body").addClass("blar")
        $(".deletyesCategory").attr('id', id);

    });
    $(".deletnoCategory").click(function () {
        $(".deletCategoryeopap").addClass("hide-item");
        $("body").removeClass("blar");

    });
    $(".deletyesCategory").not('.emptyMessage').click(function () {
        var id = this.id;
        var num = Number(id);

        $.ajax({
            type: 'GET',
            url: './Home/DeletCategory/',
            data: { id: num },
            dataType: 'json',
            success: function (data) {
                if (data.success) {

                    $(".deletCategoryeopap").addClass("hide-item");
                    $("body").removeClass("blar");
                    location.reload();
                }
                else {
                    alert("ხარვეზია")
                }


            }
        });
    });
    //კატეგორის დამატება


    $(".addproduct").not('.emptyMessage').click(function () {
        var id = this.id;
        $(".AddCategoryopap").removeClass("hide-item");
        $("body").addClass("blar")
        $(".Categorygrubutton").attr('id', id);

    });
    $("#CloseCategorygrupopap").click(function () {
        $(".AddCategoryopap").addClass("hide-item");
        $("body").removeClass("blar");

    });

    $(".Categorygrubutton").not('.emptyMessage').click(function () {
        var id = this.id;
        var name = $("#addCategory").val()
        if ($("#addCategory").val() == "") {

            $("#addCategory").css('border', 'solid 2px red');
            $("#erroren").css("display", "block");
        } else {

            $("#addCategory").css('border', 'solid 2px green');
            $("#addCategory").css('color', 'green');
            $("#erroren").css("display", "none");
            $.ajax({
                type: "GET",
                url: "/Home/AddCategory",
                data: { "Id": id, "name": name },
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                error: function (e) {
                    // ნებისმიერი ერორი მოდის აქ
                    $(".bot-fb-connection-modal-content").html("");
                    $(".bot-fb-connection-modal-content").append("დაფიქსირდა შეცდომა");
                    $("#add-fb-modal").removeClass("hide-item");
                },
                success: function (data) {
                    if (data.success) {
                        if (data.result = "saved") {

                            $(".AddCategoryopap").addClass("hide-item");
                            $("body").removeClass("blar");
                            location.reload();
                        }
                    }
                },
                error: function (response) {
                    debugger;
                    alert("ტექნიკური ხარვეზი");
                    $(".deleteopap").addClass("hide-item");
                    $("body").removeClass("blar");
                }
            });
        }

    });




    //პროდუცქის დამატება

    $(".openproduct").not('.emptyMessage').click(function () {
        var id = this.id;
        $(".diagram").removeClass("hide-item");
        $(".diagram").attr('href', '/Diagram/Diagram/'+id+'');
        var num = Number(id);

        $.ajax({
            type: 'GET',
            url: './Home/Openproduct/',
            data: { id: num },
            dataType: 'json',
            success: function (data) {
                $("#tbodypro").append().empty();
                console.log(data)
                $.each(data.result, function (i, item) {

                   

                    $("#tbodypro").append(

                        " <tr><th scope='row'>" + data.result[i].Code + "</th> <td>" + data.result[i].Name + "</td> <td>" + data.result[i].Price + "</td> <td>" + data.result[i].Country + "</td> <td>" + data.result[i].StartDate + "</td> <td>" + data.result[i].CompletionDate + "</td> <td> <a href='/Home/_Editproducticon/"+ data.result[i].ID+"'> <img class='icons editproducticonNNN' id='" + data.result[i].ID + "' src='../Content/icons/create-24px.svg' />  </a> </td> <td> <a href='/Home/deleproduction/" + data.result[i].ID + "'> <img class='icons editproducticonNNN' id='" + data.result[i].ID + "' src='../Content/icons/delete_sweep-24px.svg' /> </a> </td> </tr >"
                      
                    );

                });

            }
        });
    });

    //პროდუცტის წაშლა 
    $(".editproducticonNNN").not('.emptyMessage').click(function () {
        var id = this.id;
        console.log(id)
    //$(".AddCategoryopap").removeClass("hide-item");
    //$("body").addClass("blar")
    //$(".Categorygrubutton").attr('id', id);

});
});

