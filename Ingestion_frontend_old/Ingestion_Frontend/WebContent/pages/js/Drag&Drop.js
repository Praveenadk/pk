var i = 0,
            i1 = 0,
            j = 0,
            j1 = 0,
            k = 0,
            sc = 0,
            sc1 = 0,
            tc = 0,
            trc = 0,
            trc1 = 0;
        var a = 0;
        var src_id;
        var src_type;
        var data = [];
        var finaljson = {};
        var finalconfig = {};
        var configuration = {};
        var nullcheckoption = {};
        var nullcheckoption1 = {};
        var dateformatoption1 = {};
        var dateformatoption = {};
        var cols_global_nullcheck = [];
        var columns = [];
        var configuration_nullcheck = {};
        var configuration_dateformat = {};
        var conn_obj = {};
        var conn_arr = [];
        var conn_arr_br = [];
        var finaldata_src = {};
        var finaldata_trg = {};
        var srcdata = [];
        var trgdata = [];
        var trns_arr = [];
        var oracleconfigdetails = {};
        var oracledata = {};
		var mysqlconfigdetails = {};
        var mysqldata = {};
        var e, e1, e2, e3, e4, e5;
        $(document).ready(function() {
            $(".toggle-password").click(function() {
			debugger;
                $(this).toggleClass("fa-eye fa-eye-slash");
                var Input = $($(this).attr("toggle"));
                if (Input.attr("type") == "password") {
                    Input.attr("type", "text");
                } else {
                    Input.attr("type", "password");
                }
            });
			 $('.modal').on('hidden.bs.modal', function(e)
    { 
        $(".modal-body input").val("");
    }) ;

        });

        function replacevaluenullcheck() {
            $("#value_to_replace_nullcheck").empty();
            $("#label").show();
            var selected_value = document.getElementById("nullchecksel").value;
            console.log(selected_value);
            if (selected_value == "replace value") {
                $('#value_to_replace_nullcheck').show();
                var selected = $("#columns1 option:selected");
                console.log(selected);
                var cols = [];
                var message = "";
                selected.each(function() {
                    message = $(this).val();
                    cols.push(message);
                });
                console.log(cols);
                cols_global_nullcheck = cols;
                console.log(cols.length);
                for (var c = 0; c < (cols.length); c++) {
                    $('#value_to_replace_nullcheck').append('<div><Input type="text" class="form-control fields" id="value_to_replace' + c + '"placeholder="Enter the value to replace for ' + cols[c] + '"/></div>');
                }
            } else {
                $('#value_to_replace_nullcheck').hide();
                $(".label").hide();
            }
        }

        function replacevaluedateformat() {
            $("#format_to_change_dateformat").empty();
            var selected_value = document.getElementById("dateformatsel").value;
            console.log(selected_value);
            if (selected_value == "change format") {
                $('#format_to_change_dateformat').show();
                var selected = $("#columns2 option:selected");
                console.log(selected);
                var cols = [];
                var message = "";
                selected.each(function() {
                    message = $(this).val();
                    cols.push(message);
                });
                console.log(cols);
                cols_global_dateformat = cols;
                console.log(cols.length);
                for (var c = 0; c < (cols.length); c++) {
                    $('#format_to_change_dateformat').append('<div><Input type="text" class="form-control fields" id="format_to_change' + c + '"placeholder="Enter the value to replace for ' + cols[c] + '"/></div>');
                }
            } else {
                $('#format_to_change_dateformat').hide();
                $(".label").hide();
            }
        }

        function dragEnter(ev) {
            //debugger;
            event.preventDefault();
            return true;
        }

        function dragOver(ev) {
            //debugger;
            return false;
        }

        function srcdragging(event) {
            //debugger;
            $("#sourcediv").addClass("highlightborder");
        }

        function transformdragging(event) {
            //debugger;
            $("#transformdiv").addClass("highlightborder");
        }

        function targetdragging(event) {
            //debugger;
            $("#targetdiv").addClass("highlightborder");
        }

        function srcStart(ev) {
            //debugger;
            console.log(ev);
            if (ev.dataTransfer) {
                <!-- debugger; -->
                console.log("ev.datatransfer");
                ev.dataTransfer.effectAllowed = 'move';
                ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
                return true;
            } else {
                console.log("no datransfer");
                return false;
            }
        }

        function transformStart(ev) {
            //debugger;
            if (ev.dataTransfer) {
                <!-- debugger; -->
                console.log("ev.datatransfer");
                ev.dataTransfer.effectAllowed = 'move';
                ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
                return true;
            } else {
                console.log("no datransfer");
                return false;
            }
        }

        function targetStart(ev) {
            //debugger;
            if (ev.dataTransfer) {
                <!-- debugger; -->
                console.log("ev.datatransfer");
                ev.dataTransfer.effectAllowed = 'move';
                ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
                return true;
            } else {
                console.log("no datransfer");
                return false;
            }
        }

        var endpointOptions;
        var jsp;
        jsPlumb.ready(function() {
            console.log("khajsdf");
            jsp = jsPlumb.getInstance({
                Container: wrapper
            });
            endpointOptions = {
                isSource: true,
                isTarget: true,
                connector: "Flowchart",
                connectorOverlays: [
                    ["Arrow", {
                        width: 10,
                        height: 10,
                        length: 15,
                        location: 0.97,
                        id: "arrow"
                    }]
                ],
                connectorStyle: {
                    lineWidth: 2.5,
                    //cursor:pointer,
                    strokeStyle: '#004849'
                },
                beforeDrop: function(params) {
				debugger;
                    console.log(params);
                    console.log(params.sourceId);
                    console.log(params.targetId);
                    console.log(params.connection.id);
					var src_check = "mysql[0-9]";
					var trg_check = "Target[0-9]";
					var trnfrm_check2 = "dateTransform[0-9]";
					var trnfrm_check1 = "nullcheckTransform[0-9]";
					if((params.sourceId).match(src_check) && (params.targetId).match(trnfrm_check1))
					{
					$("#src_nullcheck,#upperdiv1").show();
					}
					if((params.sourceId).match(trnfrm_check1) && (params.targetId).match(trnfrm_check2))
					{
					$("#nullcheck_dateformat,#upperdiv2").show();
					}
					if((params.sourceId).match(trnfrm_check2) && (params.targetId).match(trg_check))
					{
					$("#dateformat_trg,#upperdiv3").show();
					$('#play').show();
					}
					if((params.targetId).match(trg_check))
					{
				    $('#play').show();
					}
                    var conn_id = params.connection.id
                    console.log(conn_id)
                    var config = {
                        from: params.sourceId,
                        to: params.targetId
                    }
                    finalconfig = {
                        connectionid: conn_id,
                        configuration: config
                    }
                    console.log(finalconfig);
                    conn_arr.push(finalconfig);
                    console.log(conn_arr);
                    conn_arr_br = conn_arr;
                    conn_obj["Connection"] = conn_arr;
                    console.log(JSON.stringify(conn_obj));
                    return true;
					
                    //confirm("Connect " + params.sourceId + " to " + params.targetId + "?");

                },
                scope: "blueline",
                maxConnections: 1,
                dragAllowedWhenFull: false
            }
        });

        function srcDrop(ev) {

            debugger;
            <!-- data = [{ -->
            <!-- "column_name": "id", -->
            <!-- "type": "INT" -->
            <!-- }, { -->
            <!-- "column_name": "first_name", -->
            <!-- "type": "VARCHAR" -->
            <!-- }, { -->
            <!-- "column_name": "last_name", -->
            <!-- "type": "VARCHAR" -->
            <!-- }, { -->
            <!-- "column_name": "email", -->
            <!-- "type": "VARCHAR" -->
            <!-- }, { -->
            <!-- "column_name": "gender", -->
            <!-- "type": "VARCHAR" -->
            <!-- }, { -->
            <!-- "column_name": "date", -->
            <!-- "type": "DATETIME" -->
            <!-- }] -->
            console.log(data);

            console.log("srcccc");
            console.log(ev);
            if (ev.target.className == "item highlightborder" || "item") {
                var src = ev.dataTransfer.getData("Text");
                console.log(src);
                if (src == "mysql") {
                    $(".drag").remove();
                    $("#sourcediv").removeClass("highlightborder");
                    if (src != "") {
                        var nodeCopy = document.getElementById(src).cloneNode(true);
                        nodeCopy.removeAttribute("Id");
                        nodeCopy.removeAttribute("draggable");
                        nodeCopy.className = "source";
                        nodeCopy.setAttribute("id", "mysql" + i + "");
                        console.log(nodeCopy);
                        console.log(nodeCopy.getAttribute('id'));
                        var id = nodeCopy.getAttribute('id');
                        var li = document.createElement("i");
                        li.setAttribute('class', "fa fa-cog");
                        <!-- sc = 0; -->
                        li.setAttribute('id', "configmysql" + sc + "");
                        <!-- sc++; -->
                        nodeCopy.appendChild(li);

                        ev.target.appendChild(nodeCopy);
                        ev.stopPropagation();
                        src_id = id;
                        src_type = src;
                        var e1 = jsp.addEndpoint($("#" + id), {
                            anchor: "RightMiddle"
                        }, endpointOptions);
                        jsp.draggable($("#" + id));
                        i++;
							$('#mysqlconfigsave').click(function() {
                            debugger;
                            console.log(JSON.stringify(mysqldata));
                            srcdata.push(mysqldata);
                            console.log(JSON.stringify(srcdata));
                            finaldata_src["source"] = srcdata;
                            console.log(JSON.stringify(finaldata_src));
                        });
                        jsp.bind('click', function(e1, e) {
                            debugger;
                            console.log(e1.id);
                            console.log(e);
                            Swal.fire({
                                title: 'Delete Connection ?',
                                text: '',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonClass: "btn btn-md btn-primary",
                                confirmButtonText: "Yes",
                                cancelButtonText: "No",
                                closeOnConfirm: true,
                                closeOnCancel: true
                            }).then((result) => {
                                debugger;
                                if (result.value) {
                                    console.log(e1);
                                    console.log(e1.id);
                                    for (var d = 0; d < conn_arr.length; d++) {
                                        if (conn_arr[d].connectionid == e1.id)
                                            conn_arr.splice(d, 1);
                                    }
                                    console.log(conn_arr);
                                    jsp.detach(e1);
                                }
                            });
                        });

                    }
                    $("#configmysql" + sc + "").click(function() {
                        $('#mysqlConfig').modal('show');
                    });
                    sc++;
                } else if (src == "oracle") {
                    $(".drag").remove();
                    $("#sourcediv").removeClass("highlightborder");
                    if (src != "") {
                        var nodeCopy = document.getElementById(src).cloneNode(true);
                        nodeCopy.removeAttribute("Id");
                        nodeCopy.removeAttribute("draggable");
                        nodeCopy.className = "source";
                        nodeCopy.setAttribute("id", "oracle" + i1 + "");
                        console.log(nodeCopy);
                        console.log(nodeCopy.getAttribute('id'));
                        var id = nodeCopy.getAttribute('id');
                        var li = document.createElement("i");
                        li.setAttribute('class', "fa fa-cog");
                        <!-- sc = 0; -->
                        li.setAttribute('id', "configoracle" + sc1 + "");
                        <!-- sc++; -->
                        nodeCopy.appendChild(li);

                        ev.target.appendChild(nodeCopy);
                        ev.stopPropagation();
                        src_id = id;
                        src_type = src;
                        var e1 = jsp.addEndpoint($("#" + id), {
                            anchor: "RightMiddle"
                        }, endpointOptions);
                        jsp.draggable($("#" + id));
                        i++;
                        	$('#oracleconfigsave').click(function() {
                            debugger;
                            <!-- srcconfigdetails = { -->
                                <!-- host: document.getElementById("hostoracle").value, -->
                                <!-- port: document.getElementById("portoracle").value, -->
                                <!-- username: document.getElementById("usernameoracle").value, -->
                                <!-- password: document.getElementById("passwordoracle").value, -->
                                <!-- databasename: document.getElementById("databasenameoracle").value, -->
                                <!-- tablename: document.getElementById("tablenameoracle").value, -->
                                <!-- maxconnection: document.getElementById("connectionsoracle").value, -->
                            <!-- } -->
                            <!-- console.log(srcconfigdetails); -->

                            <!-- Sourcedata = { -->
                                <!-- sourceid: id, -->
                                <!-- source_type: src, -->
                                <!-- configuration: srcconfigdetails -->
                            <!-- } -->
                            console.log(JSON.stringify(oracledata));
                            srcdata.push(oracledata);
                            console.log(JSON.stringify(srcdata));
                            finaldata_src["source"] = srcdata;
                            console.log(JSON.stringify(finaldata_src));
                        });
                        jsp.bind('click', function(e1, e) {
                            debugger;
                            console.log(e1.id);
                            console.log(e);
                            Swal.fire({
                                title: 'Delete Connection ?',
                                text: '',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonClass: "btn btn-md btn-primary",
                                confirmButtonText: "Yes",
                                cancelButtonText: "No",
                                closeOnConfirm: true,
                                closeOnCancel: true
                            }).then((result) => {
                                debugger;
                                if (result.value) {
                                    console.log(e1);
                                    console.log(e1.id);
                                    for (var d = 0; d < conn_arr.length; d++) {
                                        if (conn_arr[d].connectionid == e1.id)
                                            conn_arr.splice(d, 1);
                                    }
                                    console.log(conn_arr);
                                    jsp.detach(e1);
                                }
                            });
                        });

                    }
                    $("#configoracle" + sc1 + "").click(function() {
                        $('#oracleConfig').modal('show');
                    });
                    sc1++;

                } else {
                    $("#transformdiv").removeClass("highlightborder");
                    $("#targetdiv").removeClass("highlightborder");
                    Swal.fire("Warning!", "Drop Only Sources !", "warning")
                }
                $(".source").on("dblclick", function(e) {
                    debugger;
                    if ($(e.target).is('i')) {
                        e.preventDefault();
                        return;
                    }
                    Swal.fire({
                        title: 'Remove Source ?',
                        text: '',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    }).then((result) => {
                        if (result.value) {
                            console.log(e);
                            console.log(e.target.id);
                            var div = e.target.id;
                            jsp.removeAllEndpoints(div);
                            $("#" + div).remove();
                            jsp.repaintEverything();
                        }
                    })

                });

            }

        }

        function transformDrop(ev) {
            debugger;

            console.log("transformmmmmmm");
            console.log(ev);
            if (ev.target.className == "item highlightborder" || "item") {
                var trnfm = ev.dataTransfer.getData("Text");
                console.log(trnfm);

                if (trnfm == "nullcheck") {
                    $(".drag1").remove();
                    $("#transformdiv").removeClass("highlightborder");
                    if (trnfm != "") {
                        var nodeCopy = document.getElementById(trnfm).cloneNode(true);
                        nodeCopy.removeAttribute("Id");
                        //nodeCopy.removeAttribute("draggable");
                        nodeCopy.className = "transform";
                        nodeCopy.setAttribute("id", "nullcheckTransform" + j + "");
                        for (var z = 0; z < conn_arr_br.length; z++) {
                            var regex = "Target[0-9]";
                            var check = (conn_arr_br[z].configuration.to);
                            console.log(check);
                            if ((check.match(regex))) {
                                event.target.appendChild(document.createElement("br"));
                                conn_arr_br.length = 0;
                            }
                        }
                        if ($('ul#transformdiv li').length % 2 == 0) {
                            event.target.appendChild(document.createElement("br"));
                        }
                        console.log(nodeCopy);
                        console.log(nodeCopy.getAttribute('id'));
                        var id = nodeCopy.getAttribute('id');
                        var li = document.createElement("i");
                        li.setAttribute('class', "fa fa-cog");
                        li.setAttribute('id', "nullcheckconfigtrans" + trc + "");
                        nodeCopy.appendChild(li);
                        ev.target.appendChild(nodeCopy);
                        ev.stopPropagation();
                        <!-- $("#src_nullcheck,#upperdiv1").show(); -->
                        for (var b = 0; b < data.length; b++) {
                            $("#columns1").append($('<option title="' + data[b].type + '" value="' + data[b].column_name + '">' + data[b].column_name + '</option>'));
                        }
                        $('#columns1').multiselect();
                        var e2 = jsp.addEndpoint($("#" + id), {
                            anchor: "LeftMiddle"
                        }, endpointOptions);
                        var e3 = jsp.addEndpoint($("#" + id), {
                            anchor: "RightMiddle"
                        }, endpointOptions);
                        jsp.draggable($("#" + id));
                        j++;
                        $('#nullcheckconfigsave').click(function() {
                            debugger;

                            console.log(cols_global_nullcheck);
                            console.log(cols_global_nullcheck.length);
                            nullcheckoption = {
                                type: document.getElementById("nullchecksel").value,
                                configuration: configuration_nullcheck
                            }
                            for (a = 0; a < cols_global_nullcheck.length; a++) {
                                configuration_nullcheck[cols_global_nullcheck[a]] = document.getElementById("value_to_replace" + a + "").value;
                            }
                            console.log(configuration);
                            console.log(nullcheckoption);
                            nullcheckoption1["option"] = nullcheckoption;
                            nullcheckoption1["columns"] = cols_global_nullcheck;
                            nullcheckconfigdetails = {
                                transformationid: id,
                                transformation_type: trnfm,
                                configuration: nullcheckoption1,
                            }
                            console.log(JSON.stringify(nullcheckconfigdetails));
                            trns_arr.push(nullcheckconfigdetails);
                        });
                    }
                    $("#nullcheckconfigtrans" + trc + "").click(function() {
                        $('#nullcheckconfig').modal('show');
                    });
                    trc++;

                } else if (trnfm == "dateformat") {
                    $(".drag1").remove();
                    $("#transformdiv").removeClass("highlightborder");
                    if (trnfm != "") {
                        var nodeCopy = document.getElementById(trnfm).cloneNode(true);
                        nodeCopy.removeAttribute("Id");
                        //nodeCopy.removeAttribute("draggable");
                        nodeCopy.className = "transform";
                        nodeCopy.setAttribute("id", "dateTransform" + j1 + "");
                        if ($('ul#transformdiv li').length % 2 == 0) {
                            event.target.appendChild(document.createElement("br"));
                        }
                        console.log(nodeCopy);
                        console.log(nodeCopy.getAttribute('id'));
                        var id = nodeCopy.getAttribute('id');
                        var li = document.createElement("i");
                        li.setAttribute('class', "fa fa-cog");
                        li.setAttribute('id', "dateconfigtrans" + trc1 + "");
                        for (var z = 0; z < conn_arr_br.length; z++) {
                            var regex = "Target[0-9]";
                            var check = (conn_arr_br[z].configuration.to);
                            console.log(check);
                            if ((check.match(regex))) {
                                event.target.appendChild(document.createElement("br"));
                                conn_arr_br.length = 0;
                            }
                        }
                        //trc++;
                        nodeCopy.appendChild(li);
                        ev.target.appendChild(nodeCopy);
                        ev.stopPropagation();
                        <!-- $("#nullcheck_dateformat,#upperdiv2").show(); -->
                        for (var c = 0; c < data.length; c++) {
                            $("#columns2").append($('<option title="' + data[c].type + '" value="' + data[c].column_name + '">' + data[c].column_name + '</option>'));
                        }
                        $('#columns2').multiselect();
                        var e4 = jsp.addEndpoint($("#" + id), {
                            anchor: "LeftMiddle"
                        }, endpointOptions);
                        var e5 = jsp.addEndpoint($("#" + id), {
                            anchor: "RightMiddle"
                        }, endpointOptions);
                        jsp.draggable($("#" + id));
                        j1++;
                        $('#dateformatconfigsave').click(function() {
                            debugger;

                            console.log(cols_global_dateformat);
                            console.log(cols_global_dateformat.length);
                            dateformatoption = {
                                type: document.getElementById("dateformatsel").value,
                                configuration: configuration_dateformat
                            }
                            for (a = 0; a < cols_global_dateformat.length; a++) {
                                configuration_dateformat[cols_global_dateformat[a]] = document.getElementById("format_to_change" + a + "").value;
                            }
                            console.log(configuration);
                            console.log(dateformatoption);
                            dateformatoption1["option"] = dateformatoption;
                            dateformatoption1["columns"] = cols_global_dateformat;
                            dateformatconfigdetails = {
                                transformationid: id,
                                transformation_type: trnfm,
                                configuration: dateformatoption1,
                            }
                            console.log(JSON.stringify(dateformatconfigdetails));
                            trns_arr.push(dateformatconfigdetails);
                        });
                    }
                    $("#dateconfigtrans" + trc1 + "").click(function() {
                        $('#dateformatconfig').modal('show');
                    });
                    trc1++;
                } else {
                    $("#sourcediv").removeClass("highlightborder");
                    $("#targetdiv").removeClass("highlightborder");
                    Swal.fire("Warning!", "Drop Only Transformations !", "warning")
                }

                $(".transform").on("dblclick", function(e) {
                    debugger;
                    if ($(e.target).is('i')) {
                        e.preventDefault();
                        return;
                    }
                    Swal.fire({
                        title: 'Remove Transform ?',
                        text: '',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    }).then((result) => {
                        if (result.value) {
                            console.log(e);
                            console.log(e.target.id);
                            var div = e.target.id;
                            jsp.removeAllEndpoints(div);
                            $("#" + div).remove();
                            jsp.repaintEverything();
                        }
                    })
                });

            }
        }

        function targetDrop(ev) {
            debugger;
            console.log("trgggggg");
            console.log(ev);
            if (ev.target.className == "item highlightborder" || "item") {
                var trg = ev.dataTransfer.getData("Text");
                console.log(trg);
                if (trg == "HDFS") {
                    $(".drag2").remove();
                    $("#targetdiv").removeClass("highlightborder");
                    if (trg != "") {
                        var nodeCopy = document.getElementById(trg).cloneNode(true);
                        nodeCopy.removeAttribute("Id");
                        //nodeCopy.removeAttribute("draggable");
                        nodeCopy.className = "target";
                        nodeCopy.setAttribute("id", "Target" + k + "");
                        $(nodeCopy).draggable({
                            containment: "targetdiv"
                        });
                        console.log(nodeCopy);
                        console.log(nodeCopy.getAttribute('id'));
                        var id = nodeCopy.getAttribute('id');
                        var li = document.createElement("i");
                        li.setAttribute('class', "fa fa-cog");
                        li.setAttribute('id', "configtrg" + tc + "");
                        nodeCopy.appendChild(li);
                        ev.target.appendChild(nodeCopy);
                        ev.stopPropagation();
                        <!-- $("#dateformat_trg,#upperdiv3").show(); -->
                        var e6 = jsp.addEndpoint($("#" + id), {
                            anchor: "LeftMiddle"
                        }, endpointOptions);
                        // $('#play').show();
                        jsp.draggable($("#" + id));
                        k++;
                        $('#trgconfigsave').click(function() {
                            debugger;
                            trgconfigdetails = {
                                connection_url: document.getElementById("connectionurltrg").value,
                                username: document.getElementById("usernametrg").value,
                                password: document.getElementById("passwordtrg").value,
                                maxconnection: document.getElementById("connectionstrg").value,
                            }
                            console.log(trgconfigdetails);
                            Targetdata = {
                                targetid: id,
                                target_type: trg,
                                configuration: trgconfigdetails
                            }
                            console.log(JSON.stringify(Targetdata));
                            trgdata.push(Targetdata);
                            console.log(trgdata);
                            finaldata_trg["target"] = trgdata;
                            console.log(JSON.stringify(finaldata_trg));
                        });

                    }
                    $("#configtrg" + tc + "").click(function() {
                        $('#targetConfig').modal('show');
                    });
                    tc++;
                } else {
                    $("#sourcediv").removeClass("highlightborder");
                    $("#transformdiv").removeClass("highlightborder");
                    Swal.fire("Warning!", "Drop Only Targets !", "warning")
                }
            }

            $(".target").on("dblclick", function(e) {
                debugger;
                if ($(e.target).is('i')) {
                    e.preventDefault();
                    return;
                }
                Swal.fire({
                    title: 'Remove Target ?',
                    text: '',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }).then((result) => {
                    if (result.value) {
                        console.log(e);
                        console.log(e.target.id);
                        var div = e.target.id;
                        jsp.removeAllEndpoints(div);
                        $("#" + div).remove();
                        jsp.repaintEverything();
                    }
                })

            });
        }
        $('#start_workflow').on("click", function() {
            debugger;
            finaljson["source"] = srcdata;
            finaljson["target"] = trgdata;
            finaljson["connection"] = conn_arr;
            finaljson["transformation"] = trns_arr;
            console.log(JSON.stringify(finaljson));

        });
        $('#clear').click(function() {
			debugger;
            location.reload();
        });
        $('#test_conn_mysql').on("click", function() {
            debugger;
            mysqlconfigdetails = {
                host: document.getElementById("hostmysql").value,
                port: document.getElementById("portmysql").value,
                username: document.getElementById("usernamemysql").value,
                password: document.getElementById("passwordmysql").value,
                databasename: document.getElementById("databasenamemysql").value,
                tablename: document.getElementById("tablenamemysql").value,
                maxconnection: document.getElementById("connectionsmysql").value,
            }
            console.log(mysqlconfigdetails);
            mysqldata = {
                sourceid: src_id,
                source_type: src_type,
                configuration: mysqlconfigdetails
            }
            console.log(JSON.stringify(mysqldata));
            $.ajax({
                type: 'POST',
                url: 'http://10.60.65.14:8082/IngestionFramework/ConnectionCheck',
                data: JSON.stringify(mysqldata),
                beforeSend: function() {
                    $("#ajax_loader").show();
                },
                success: function(msg) {
                    console.log(msg);
                    var msg1 = JSON.parse(msg);
                    if (msg1.connection == "SUCCESS") {
                        $('#success_alert_mysql').show();
						document.getElementById("mysqlconfigsave").disabled = false;
                        window.setTimeout(function() {
                            $("#success_alert_mysql").fadeTo(500, 0).slideUp(500, function() {
                                $(this).remove();
                            });
                        }, 1500);

                        console.log(msg1.columns);
                        data = msg1.columns;
                    } else {
                        $('#failure_alert').show();
                        window.setTimeout(function() {
                            $("#failure_alert").fadeTo(500, 0).slideUp(500, function() {
                                $(this).remove();
                            });
                        }, 1500);

                    }
                },
                complete: function() {
                    $("#ajax_loader").hide();
                },
            });
        });
		
		 $('#test_conn_oracle').on("click", function() {
            debugger;
            oracleconfigdetails = {
                host: document.getElementById("hostoracle").value,
                port: document.getElementById("portoracle").value,
                username: document.getElementById("usernameoracle").value,
                password: document.getElementById("passwordoracle").value,
                databasename: document.getElementById("databasenameoracle").value,
                tablename: document.getElementById("tablenameoracle").value,
                maxconnection: document.getElementById("connectionsoracle").value,
            }
            console.log(oracleconfigdetails);
            oracledata = {
                sourceid: src_id,
                source_type: src_type,
                configuration: oracleconfigdetails
            }
            console.log(JSON.stringify(oracledata));
            $.ajax({
                type: 'POST',
                url: 'http://10.60.65.14:8082/IngestionFramework/ConnectionCheck',
                data: JSON.stringify(oracledata),
                beforeSend: function() {
                    $("#ajax_loader").show();
                },
                success: function(msg) {
                    console.log(msg);
                    var msg1 = JSON.parse(msg);
                    if (msg1.connection == "SUCCESS") {
                        $('#success_alert_orc').show();
						
                        window.setTimeout(function() {
                            $("#success_alert_orc").fadeTo(500, 0).slideUp(500, function() {
                                $(this).remove();
                            });
                        }, 1500);

                        console.log(msg1.columns);
                        data = msg1.columns;
                    } else {
                        $('#failure_alert').show();
                        window.setTimeout(function() {
                            $("#failure_alert").fadeTo(500, 0).slideUp(500, function() {
                                $(this).remove();
                            });
                        }, 1500);

                    }
                },
                complete: function() {
                    $("#ajax_loader").hide();
                },
            });
        });
		
        $('#test_conn_trg').on("click", function() {
            debugger;
            $.ajax({
                type: 'POST',
                url: 'http://10.60.65.14:8082/IngestionFramework/ConnectionCheck',
                data: JSON.stringify(Sourcedata),
                beforeSend: function() {
                    $("#ajax_loader").show();
                },
                success: function(msg) {
                    console.log(msg);
                },
                complete: function() {
                    $("#ajax_loader").hide();
                }
            });
        });