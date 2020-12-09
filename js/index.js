window.onload=function () {
    showDropDown();//悬浮菜单
    focusBlur();//搜索框获得与失去焦点
    cityChange();//城市改变

    addGood();//添加商品

    deleteOne();//删除指定的单件商品
    clearChecked();//删除被选中的商品
    deleteAll();//删除所有商品（清理购物车）

    addCount();//单件商品的数量增加
    minusCount();//单件商品的数量减少
    inputChange();//商品数量通过输入框改变

    isChecked();//单选，选中一件商品
    checkMulti();//多选，选中一类商品
    checkALl();//全选，选中所有商品
    isCheckAll();//一类中的所有商品都被选中，则这一类的复选框也被选中，所有类中的商品都被选中，则全选的复选框也被选中
    bgColorChange();//被选中时背景颜色的改变

    submit();//点击结算时的事件
    //good1.concat(good2)
}

//计算是否免运费
function feed() {
    var worse1=document.querySelector("#jDZY>td:nth-child(7)");
    var worse2=document.querySelector("#jDHD>td:nth-child(7)");
    //console.log(worse1);
    //console.log(worse2);
    var goods1=document.querySelectorAll("tbody>.good1");
    var goods2=document.querySelectorAll("tbody>.good2");
    var subPrice1=0;
    var subPrice2=0;
    for (var i=0;i<goods1.length;i++) {
        //console.log(parseFloat(goods1[i].querySelector(".subtotal").innerHTML.slice(1)));
        if (goods1[i].cells[0].querySelector("input").checked) {
            subPrice1+=parseFloat(goods1[i].querySelector(".subtotal").innerHTML.slice(1));
        }/* else if (subPrice1>0) {
            subPrice1-=parseFloat(goods1[i].querySelector(".subtotal").innerHTML.slice(1));
        }*/
    }
    for (var i=0;i<goods2.length;i++) {
        if (goods2[i].cells[0].querySelector("input").checked) {
            subPrice2+=parseFloat(goods2[i].querySelector(".subtotal").innerHTML.slice(1));
        }/* else if (subPrice2>0) {
            subPrice2-=parseFloat(goods2[i].querySelector(".subtotal").innerHTML.slice(1));
        }*/
    }
    //console.log(subPrice1.toFixed(2));
    //console.log(subPrice2.toFixed(2));
    if (subPrice1>90) {
        worse1.innerHTML=
            "<img src=\"img/i.png\" class=\"i\">"+
            "<span class=\"tip\">已免运费</span>"
        ;
    } else if (goods1.length!=0) {
        worse1.innerHTML=
            "<img src=\"img/i.png\" class=\"i\">"+
            "<span class=\"tip\">还差<span class=\"worse\">&yen;"+(subPrice1!=0?(90-subPrice1).toFixed(2):"0.00")+"</span>免运费</span>&nbsp;&nbsp;<a href=\"#recommend\">去凑单</a>&gt;"
        ;
    }
    if (subPrice2>90) {
        worse2.innerHTML=
            "<img src=\"img/i.png\" class=\"i\">"+
            "<span class=\"tip\">已免运费</span>"
        ;
    } else if (goods2.length!=0) {
        worse2.innerHTML=
            "<img src=\"img/i.png\" class=\"i\">"+
            "<span class=\"tip\">还差<span class=\"worse\">&yen;"+(subPrice2!=0?(90-subPrice2).toFixed(2):"0.00")+"</span>免运费</span>&nbsp;&nbsp;<a href=\"#recommend\">去凑单</a>&gt;"
        ;
    }
}

//修改被选中商品的背景颜色
function bgColorChange() {
    var inputs=document.getElementsByName("check");
    for (var i=0;i<inputs.length;i++) {
        var str=inputs[i].parentNode.parentNode.title;
        if (inputs[i].checked) {
            str="checked";
        } else {
            str="noChecked";
        }
        //console.log(str);
        inputs[i].parentNode.parentNode.title=str;
    }
}

//点击结算按钮
function submit() {
    var sub=document.getElementById("submit");
    sub.onclick=function () {
        var inputs=document.getElementsByName("check");
        var str="";
        for (var i=0;i<inputs.length;i++) {
            if (inputs[i].checked) {
                str+="商品："+inputs[i].parentNode.parentNode.cells[1].querySelector("img").alt+"——数量："+inputs[i].parentNode.parentNode.cells[5].querySelector("input").value+"\n";
            }
        }
        if (str!="") {
            str+="总数量："+document.getElementById("totalNum").innerHTML+"——总价格："+document.getElementById("totalPrice").innerHTML;
            //console.log(str);
            while (true) {
                var money=prompt("您选中的商品如下：\n"+str+"\n是否要结算？\n如要结算，请输入付款金额：");
                //console.log(money);
                if (money==null) {//点击取消
                    break;
                } else if (money=="") {
                    alert("您输入的金钱数不能为空，请重新输入！");
                } else if ((money=parseFloat(money))>parseFloat(document.getElementById("totalPrice").innerHTML.slice(1))) {
                    confirm(document.getElementById("totalNum").innerHTML+"件商品，总价是"+document.getElementById("totalPrice").innerHTML+"\n您付了"+money+"美元，找零"+(money-parseFloat(document.getElementById("totalPrice").innerHTML.slice(1))).toFixed(2)+"美元");
                    break;
                } else if (money<parseFloat(document.getElementById("totalPrice").innerHTML.slice(1))){
                    confirm(document.getElementById("totalNum").innerHTML+"件商品，总价是"+document.getElementById("totalPrice").innerHTML+"\n您付了"+money+"美元，还需支付"+(parseFloat(document.getElementById("totalPrice").innerHTML.slice(1))-money).toFixed(2)+"美元");
                    break;
                } else {
                    confirm(document.getElementById("totalNum").innerHTML+"件商品，总价是"+document.getElementById("totalPrice").innerHTML+"\n您付了"+money+"美元，付款成功");
                    break;
                }
            }
        }
    }
}

//good1和good2都被选中了，全选也得选中
function isCheckAll() {
    var flag1=1;
    var flag2=1;
    var goods1=document.querySelectorAll("tbody>.good1");
    var goods2=document.querySelectorAll("tbody>.good2");
    for (var i=0;i<goods1.length;i++) {
        if (!goods1[i].cells[0].querySelector("input").checked) {
            flag1=0;
        }
    }
    for (var i=0;i<goods2.length;i++) {
        if (!goods2[i].cells[0].querySelector("input").checked) {
            flag2=0;
        }
    }
    if (flag1==1&&flag2==1) {
        document.querySelector(".checkMulti1").checked=true;
        document.querySelector(".checkMulti2").checked=true;
        document.querySelectorAll(".checkAll")[0].checked=true;
        document.querySelectorAll(".checkAll")[1].checked=true;
    } else if (flag1==1) {
        document.querySelector(".checkMulti1").checked=true;
        document.querySelector(".checkMulti2").checked=false;
        document.querySelectorAll(".checkAll")[0].checked=false;
        document.querySelectorAll(".checkAll")[1].checked=false;
    } else if (flag2==1) {
        document.querySelector(".checkMulti1").checked=false;
        document.querySelector(".checkMulti2").checked=true;
        document.querySelectorAll(".checkAll")[0].checked=false;
        document.querySelectorAll(".checkAll")[1].checked=false;
    } else {
        document.querySelector(".checkMulti1").checked=false;
        document.querySelector(".checkMulti2").checked=false;
        document.querySelectorAll(".checkAll")[0].checked=false;
        document.querySelectorAll(".checkAll")[1].checked=false;
    }
}

//添加商品
function addGood() {
    var recommendGoods=document.getElementsByName("recommendGood");
    for (var i=0;i<recommendGoods.length;i++) {
        //console.log(recommendGoods[i].childNodes[7].childNodes[0]);
        //console.log(recommendGoods[i].childNodes[1].childNodes[0].name);
        recommendGoods[i].childNodes[7].childNodes[0].onclick=function () {
            //console.log(this.parentNode.parentNode.childNodes[1].childNodes[0].alt);
            var goodName=this.parentNode.parentNode.childNodes[1].childNodes[0].name;
            var goodClass=this.parentNode.parentNode.className;
            var tbody=document.getElementsByTagName("tbody")[0];
            //console.log(this.parentNode.parentNode.childNodes[5].innerHTML);
            var thead=document.createElement("thead");
            thead.innerHTML=
                "<tr>"+
                "<th><input type=\"checkbox\" class=\"checkAll\"></th>"+
                "<th>全选</th>"+
                "<th>商品</th>"+
                "<th></th>"+
                "<th>单价</th>"+
                "<th>数量</th>"+
                "<th>小计</th>"+
                "<th>操作</th>"+
                "</tr>"
            ;

            var settlement=document.createElement("div");
            settlement.id="settlement";
            var div1=document.createElement("div");
            div1.innerHTML="<input type=\"checkbox\" class=\"checkAll\">";
            var div2=document.createElement("div");
            div2.innerHTML="全选&nbsp;&nbsp;";
            var div3=document.createElement("div");
            div3.innerHTML="<span class=\"link\">删除选中的商品&nbsp;&nbsp;</span>";
            var div4=document.createElement("div");
            div4.innerHTML="<span class=\"link\">移到我的关注&nbsp;&nbsp;</span>";
            var div5=document.createElement("div");
            div5.innerHTML="<span class=\"link\">清理购物车</span>";
            var div6=document.createElement("div");
            div6.innerHTML="";
            var div7=document.createElement("div");
            div7.innerHTML="<div>已选择<span id=\"totalNum\">0</span>件商品&nbsp;&nbsp;&nbsp;&nbsp;</div><div>总价:<span id=\"totalPrice\">&yen;0.00</span><img src=\"img/灯泡_03.png\"></div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已节省:<span id=\"reduce\">-&yen;0.00</span></div>";
            var div8=document.createElement("div");
            div8.id="submit";
            div8.innerHTML="去结算";
            settlement.appendChild(div1);
            settlement.appendChild(div2);
            settlement.appendChild(div3);
            settlement.appendChild(div4);
            settlement.appendChild(div5);
            settlement.appendChild(div6);
            settlement.appendChild(div7);
            settlement.appendChild(div8);

            if (goodClass=="good1") {
                var jDZY=document.createElement("tr");
                jDZY.id="jDZY";
                jDZY.innerHTML=
                    "<td><input type=\"checkbox\"  class=\"checkMulti1\" name=\"checkMulti\"></td>"+
                    "<td><img src=\"img/京东自营.png\" width=\"60px\"></td>"+
                    "<td></td>"+
                    "<td><img src=\"img/优惠券.png\"></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td colspan=\"2\"><img src=\"img/i.png\" class=\"i\"><span class=\"tip\">还差<span class=\"worse\">&yen;0.00</span>免运费</span>&nbsp;&nbsp;<a href=\"#recommend\">去凑单</a>&gt;</td>"
                ;

                var hr=document.createElement("tr");
                hr.className="fenGe";
                hr.innerHTML="<td colspan=\"8\"><hr/></td>";

                var fullReduction1=document.createElement("tr");
                fullReduction1.id="fullReduction1";
                fullReduction1.innerHTML=
                    "<td><img src=\"img/满减.png\"></td>"+
                    "<td colspan=\"7\"><span>活动商品购满两件，即可享受满减&nbsp;&gt;</span><span>&nbsp;&nbsp;<a href=\"#recommend\">去凑单</a>&nbsp;&gt;</span> </td>"
                ;

                var tr=document.createElement("tr");
                tr.className="good1";
                var td1=document.createElement("td");
                /*if (document.getElementsByClassName("checkAll")[0].checked) {
                    td1.innerHTML="<input type=\"checkbox\" name=\"check\" checked=\"checked\">";
                } else {
                    td1.innerHTML="<input type=\"checkbox\" name=\"check\">";
                }*/
                //td1.innerHTML="<input type=\"checkbox\" name=\"check\" checked=\"checked\">";
                td1.innerHTML="<input type=\"checkbox\" name=\"check\">";
                var td2=document.createElement("td");
                //console.log(this.parentNode.parentNode.childNodes[1].childNodes[0].alt);
                td2.innerHTML="<img src=\"img/"+goodName+".png\" name="+goodName+" alt="+this.parentNode.parentNode.childNodes[1].childNodes[0].alt+" width=\"95%\">";
                var td3=document.createElement("td");
                td3.innerHTML="<img src=\"img/shop.png\"><span>&nbsp;"+this.parentNode.parentNode.childNodes[3].innerHTML+"</span>";
                var td4=document.createElement("td");
                td4.innerHTML=this.parentNode.parentNode.childNodes[3].className;
                var td5=document.createElement("td");
                var span=document.createElement("span");
                span.className="price";
                span.innerHTML=this.parentNode.parentNode.childNodes[5].innerHTML;
                var img=document.createElement("img");
                img.src="img/促销.png";
                td5.appendChild(span);
                td5.appendChild(img);
                var td6=document.createElement("td");
                var minus=document.createElement("div");
                minus.className="minus";
                minus.innerHTML="-";
                var input=document.createElement("input");
                input.type="text";
                input.className="input";
                input.value="1";
                var add=document.createElement("div");
                add.className="add";
                add.innerHTML="+";
                var hasGood=document.createElement("div");
                hasGood.className="hasGood";
                hasGood.innerHTML="有货";
                td6.appendChild(minus);
                td6.appendChild(input);
                td6.appendChild(add);
                td6.appendChild(hasGood);
                var td7=document.createElement("td");
                var subtotal=document.createElement("div");
                subtotal.className="subtotal";
                subtotal.innerHTML=this.parentNode.parentNode.childNodes[5].innerHTML;
                var weight=document.createElement("div");
                weight.className="weight";
                weight.innerHTML=this.parentNode.parentNode.childNodes[5].className;
                td7.appendChild(subtotal);
                td7.appendChild(weight);
                var td8=document.createElement("td");
                td8.innerHTML="<div class=\"delete\">删除</div><div class=\"remove\">移到我的关注</div>";
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);

                var goods1=document.querySelectorAll("tbody>.good1");
                var goods2=document.querySelectorAll("tbody>.good2");
                //console.log(goods1.length);
                //console.log(goods2.length);
                if (goods1.length==0&&goods2.length==0) {
                    tbody=document.createElement("tbody");
                    tbody.appendChild(jDZY);
                    tbody.appendChild(hr);
                    tbody.appendChild(fullReduction1);
                    tbody.appendChild(tr);
                    var table=document.getElementById("goods");
                    table.innerHTML="";
                    table.appendChild(thead);
                    table.appendChild(tbody);
                    var body=document.getElementById("body");
                    body.insertBefore(settlement,document.getElementById("recommend"));
                    deleteAll();
                    deleteOne();
                    addCount();
                    minusCount();
                    isChecked();
                    checkALl();
                    checkMulti();
                    clearChecked();
                    inputChange();
                    submit();
                    feed();
                    goods1.length+=1;
                    //console.log(this.parentNode.parentNode.childNodes[1].childNodes[0].alt);
                } else if (goods1.length==0) {
                    tbody.appendChild(jDZY);
                    tbody.appendChild(hr);
                    tbody.appendChild(fullReduction1);
                    tbody.appendChild(tr);
                    deleteAll();
                    deleteOne();
                    addCount();
                    minusCount();
                    isChecked();
                    checkALl();
                    checkMulti();
                    clearChecked();
                    inputChange();
                    feed();
                } else if (goods1.length!=0) {
                    for (var i=0;i<goods1.length;i++) {
                        //console.log(this.parentNode.parentNode.childNodes[1].childNodes[0].alt==goods1[i].cells[1].querySelector("img").alt)
                        if (this.parentNode.parentNode.childNodes[1].childNodes[0].alt==goods1[i].cells[1].querySelector("img").alt) {
                            var m=parseInt(goods1[i].cells[5].querySelector("input").value);
                            //console.log(m);
                            goods1[i].cells[5].querySelector("input").value=m+1;
                            //console.log(goods1[i].cells[5].querySelector("input").value);
                            var n=parseInt(goods1[i].cells[5].querySelector("input").value);
                            //console.log(n);
                            var price=parseFloat(goods1[i].getElementsByClassName("price")[0].innerHTML.slice(1));
                            var weight=goods1[i].getElementsByClassName("weight")[0].innerHTML;
                            //console.log(weight);
                            goods1[i].getElementsByClassName("subtotal")[0].innerHTML="&yen;"+(n*price).toFixed(2);
                            if (goods1[i].getElementsByClassName("weight")[0].innerHTML!="") {
                                var coe=n/m;
                                goods1[i].getElementsByClassName("weight")[0].innerHTML=(coe*parseFloat(weight)).toFixed(2)+"kg";
                            }
                            //console.log(this.parentNode.parentNode.cells[4].childNodes[1]);
                            var count=parseInt(document.getElementById("totalNum").innerHTML);
                            var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
                            if (goods1[i].cells[0].querySelector("input").checked) {
                                count=count-m+n;
                                totalPrice=totalPrice+parseFloat(goods1[i].cells[4].querySelector(".price").innerHTML.slice(1)*(n-m));
                            }
                            changeTotal(count,totalPrice);
                            inputChange();
                            feed();
                            //把当前input中的值n赋给m
                            m=n;
                            //找到一样的商品，进行数量的增加，并跳出循环
                            break;
                        } else if (i==goods1.length-1) {
                            tbody.insertBefore(tr,goods1[0]);
                            goods1.length+=1;
                            document.getElementById("jDZY").cells[0].querySelector("input").checked=false;
                            document.getElementsByClassName("checkAll")[0].checked=false;
                            document.getElementsByClassName("checkAll")[1].checked=false;
                            deleteAll();
                            deleteOne();
                            addCount();
                            minusCount();
                            isChecked();
                            checkALl();
                            checkMulti();
                            clearChecked();
                            inputChange();
                            feed();
                        }
                    }
                }
            } else if (goodClass=="good2") {
                var jDHD=document.createElement("tr");
                jDHD.id="jDHD";
                jDHD.innerHTML=
                    "<td><input type=\"checkbox\"  class=\"checkMulti2\" name=\"checkMulti\"></td>"+
                    "<td><img src=\"img/京东好店.png\" width=\"60px\"></td>"+
                    "<td></td>"+
                    "<td><img src=\"img/优惠券.png\"></td>"+
                    "<td></td>"+
                    "<td></td>"+
                    "<td colspan=\"2\"><img src=\"img/i.png\" class=\"i\"><span class=\"tip\">还差<span class=\"worse\">&yen;0.00</span>免运费</span>&nbsp;&nbsp;<a href=\"#recommend\">去凑单</a>&gt;</td>"
                ;

                var hr=document.createElement("tr");
                hr.className="fenGe";
                hr.innerHTML="<td colspan=\"8\"><hr/></td>";

                var fullReduction2=document.createElement("tr");
                fullReduction2.id="fullReduction2";
                fullReduction2.innerHTML=
                    "<td><img src=\"img/满减.png\"></td>"+
                    "<td colspan=\"7\"><span>活动商品购满两件，即可享受满减&nbsp;&gt;</span><span>&nbsp;&nbsp;<a href=\"#recommend\">去凑单</a>&nbsp;&gt;</span> </td>"
                ;

                var tr=document.createElement("tr");
                tr.className="good2";
                var td1=document.createElement("td");
                td1.innerHTML="<input type=\"checkbox\" name=\"check\">";
                var td2=document.createElement("td");
                //console.log(this.parentNode.parentNode.childNodes[1].childNodes[0].alt);
                td2.innerHTML="<img src=\"img/"+goodName+".png\" name="+goodName+" alt="+this.parentNode.parentNode.childNodes[1].childNodes[0].alt+" width=\"95%\">";
                var td3=document.createElement("td");
                td3.innerHTML="<img src=\"img/shop.png\"><span>&nbsp;"+this.parentNode.parentNode.childNodes[3].innerHTML+"</span>";
                var td4=document.createElement("td");
                td4.innerHTML=this.parentNode.parentNode.childNodes[3].className;
                var td5=document.createElement("td");
                var span=document.createElement("span");
                span.className="price";
                span.innerHTML=this.parentNode.parentNode.childNodes[5].innerHTML;
                var img=document.createElement("img");
                img.src="img/促销.png";
                td5.appendChild(span);
                td5.appendChild(img);
                var td6=document.createElement("td");
                var minus=document.createElement("div");
                minus.className="minus";
                minus.innerHTML="-";
                var input=document.createElement("input");
                input.type="text";
                input.className="input";
                input.value="1";
                var add=document.createElement("div");
                add.className="add";
                add.innerHTML="+";
                var hasGood=document.createElement("div");
                hasGood.className="hasGood";
                hasGood.innerHTML="有货";
                td6.appendChild(minus);
                td6.appendChild(input);
                td6.appendChild(add);
                td6.appendChild(hasGood);
                var td7=document.createElement("td");
                var subtotal=document.createElement("div");
                subtotal.className="subtotal";
                subtotal.innerHTML=this.parentNode.parentNode.childNodes[5].innerHTML;
                var weight=document.createElement("div");
                weight.className="weight";
                weight.innerHTML=this.parentNode.parentNode.childNodes[5].className;
                td7.appendChild(subtotal);
                td7.appendChild(weight);
                var td8=document.createElement("td");
                td8.innerHTML="<div class=\"delete\">删除</div><div class=\"remove\">移到我的关注</div>";
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);

                var goods1=document.querySelectorAll("tbody>.good1");
                var goods2=document.querySelectorAll("tbody>.good2");
                //console.log(goods1.length);
                //console.log(goods2.length);
                if (goods1.length==0&&goods2.length==0) {
                    tbody=document.createElement("tbody");
                    tbody.appendChild(jDHD);
                    tbody.appendChild(hr);
                    tbody.appendChild(fullReduction2);
                    tbody.appendChild(tr);
                    var table=document.getElementById("goods");
                    table.innerHTML="";
                    table.appendChild(thead);
                    table.appendChild(tbody);
                    var body=document.getElementById("body");
                    body.insertBefore(settlement,document.getElementById("recommend"));
                    deleteAll();
                    deleteOne();
                    addCount();
                    minusCount();
                    isChecked();
                    checkALl();
                    checkMulti();
                    clearChecked();
                    inputChange();
                    submit();
                    feed();
                    goods2.length+=1;
                    //console.log(this.parentNode.parentNode.childNodes[1].childNodes[0].alt);
                } else if (goods2.length==0) {
                    tbody.appendChild(jDHD);
                    tbody.appendChild(hr);
                    tbody.appendChild(fullReduction2);
                    tbody.appendChild(tr);
                    deleteAll();
                    deleteOne();
                    addCount();
                    minusCount();
                    isChecked();
                    checkALl();
                    checkMulti();
                    clearChecked();
                    inputChange();
                    feed();
                } else if (goods2.length!=0) {
                    for (var i=0;i<goods2.length;i++) {
                        //console.log(this.parentNode.parentNode.childNodes[1].childNodes[0].alt==goods1[i].cells[1].querySelector("img").alt)
                        if (this.parentNode.parentNode.childNodes[1].childNodes[0].alt==goods2[i].cells[1].querySelector("img").alt) {
                            var m=parseInt(goods2[i].querySelector(".input").value);
                            //console.log(m);
                            goods2[i].querySelector(".input").value=m+1;
                            //console.log(goods1[i].cells[5].querySelector("input").value);
                            var n=parseInt(goods2[i].querySelector(".input").value);
                            //console.log(n);
                            var price=parseFloat(goods2[i].querySelector(".price").innerHTML.slice(1));
                            var weight=goods2[i].querySelector(".weight").innerHTML;
                            //console.log(weight);
                            goods2[i].querySelector(".subtotal").innerHTML="&yen;"+(n*price).toFixed(2);
                            if (goods2[i].querySelector(".weight").innerHTML!="") {
                                var coe=n/m;
                                goods2[i].getElementsByClassName("weight")[0].innerHTML=(coe*parseFloat(weight)).toFixed(2)+"kg";
                            }
                            //console.log(this.parentNode.parentNode.cells[4].childNodes[1]);
                            var count=parseInt(document.getElementById("totalNum").innerHTML);
                            var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
                            if (goods2[i].cells[0].querySelector("input").checked) {
                                count=count-m+n;
                                totalPrice=totalPrice+parseFloat(goods2[i].querySelector(".price").innerHTML.slice(1)*(n-m));
                            }
                            changeTotal(count,totalPrice);
                            inputChange();
                            feed();
                            //把当前input中的值n赋给m
                            m=n;
                            //找到一样的商品，进行数量的增加，并跳出循环
                            break;
                        } else if (i==goods2.length-1) {
                            tbody.insertBefore(tr,goods2[0]);
                            goods2.length+=1;
                            document.getElementById("jDHD").cells[0].querySelector("input").checked=false;
                            document.getElementsByClassName("checkAll")[0].checked=false;
                            document.getElementsByClassName("checkAll")[1].checked=false;
                            deleteAll();
                            deleteOne();
                            addCount();
                            minusCount();
                            isChecked();
                            checkALl();
                            checkMulti();
                            clearChecked();
                            inputChange();
                            feed();
                        }
                    }
                }
            }
        };
    }
}

//如果直接修改input中的数量
function inputChange() {
    //var inputs=document.getElementsByClassName("input");
    var trs=document.getElementsByTagName("tr");
    var m=[];
    for (var i=0;i<trs.length;i++) {
        if (trs[i].querySelector(".input")) {
            m.push(parseInt(trs[i].querySelector(".input").value));
            trs[i].querySelector(".input").onchange=function () {
                //console.log(this.parentNode.parentNode.rowIndex);
                //修改后的值
                if (this.value=="") {
                    var n=m[this.parentNode.parentNode.rowIndex];
                    this.value=n;
                } else if (this.value=="0") {
                    var n=1;
                    this.value=n;
                } else {
                    var n=parseInt(this.value);
                }
                //console.log(n);
                var price=parseFloat(this.parentNode.parentNode.querySelector(".price").innerHTML.slice(1));
                var weight=this.parentNode.parentNode.querySelector(".weight").innerHTML;
                //console.log(weight);
                this.parentNode.parentNode.querySelector(".subtotal").innerHTML="&yen;"+(n*price).toFixed(2);
                if (this.parentNode.parentNode.querySelector(".weight").innerHTML!="") {
                    var coe=n/m[this.parentNode.parentNode.rowIndex];
                    this.parentNode.parentNode.querySelector(".weight").innerHTML=(coe*parseFloat(weight)).toFixed(2)+"kg";
                }
                //console.log(this.parentNode.parentNode.cells[4].childNodes[1]);
                var count=parseInt(document.getElementById("totalNum").innerHTML);
                var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
                if (this.parentNode.parentNode.cells[0].querySelector("input").checked) {
                    count=count-m[this.parentNode.parentNode.rowIndex]+n;
                    totalPrice=totalPrice+parseFloat(this.parentNode.parentNode.cells[4].querySelector(".price").innerHTML.slice(1)*(n-m[this.parentNode.parentNode.rowIndex]));
                }
                changeTotal(count,totalPrice);
                //把当前input中的值n赋给m
                m[this.parentNode.parentNode.rowIndex]=n;
                //console.log(m);
                feed();
            };
        } else {
            m.push(0);
        }
    }
    /*for (var i=0;i<inputs.length;i++) {
        //修改前的值
        m.push(parseInt(inputs[i].value));
        /!*if (inputs[i].parentNode.querySelector("add").click) {
            m++;
        } else if (inputs[i].parentNode.querySelector("minus").click&&m>1) {
            m--;
        }*!/
        //console.log(m);
        inputs[i].onchange=function () {
            //console.log(this.parentNode.parentNode.rowIndex);
            //修改后的值
            var n=parseInt(this.value);
            //console.log(n);
            var price=parseFloat(this.parentNode.parentNode.querySelector(".price").innerHTML.slice(1));
            var weight=this.parentNode.parentNode.querySelector(".weight").innerHTML;
            //console.log(weight);
            this.parentNode.parentNode.querySelector(".subtotal").innerHTML="&yen;"+(n*price).toFixed(2);
            if (this.parentNode.parentNode.querySelector(".weight").innerHTML!="") {
                var coe=n/m[this.parentNode.parentNode.rowIndex];
                this.parentNode.parentNode.querySelector(".weight").innerHTML=(coe*parseFloat(weight)).toFixed(2)+"kg";
            }
            //console.log(this.parentNode.parentNode.cells[4].childNodes[1]);
            var count=parseInt(document.getElementById("totalNum").innerHTML);
            var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
            if (this.parentNode.parentNode.cells[0].querySelector("input").checked) {
                count=count-m[this.parentNode.parentNode.rowIndex]+n;
                totalPrice=totalPrice+parseFloat(this.parentNode.parentNode.cells[4].querySelector(".price").innerHTML.slice(1)*(n-m[this.parentNode.parentNode.rowIndex]));
            }
            changeTotal(count,totalPrice);
            //把当前input中的值n赋给m
            m[this.parentNode.parentNode.rowIndex]=n;
            console.log(m);
        };
    }*/
}

//清除选中的商品
function clearChecked() {
    var clear=document.getElementsByClassName("link")[0];
    clear.onclick=function () {
        var goods1=document.querySelectorAll("tbody>.good1");
        var goods2=document.querySelectorAll("tbody>.good2");
        //console.log(goods1);
        //console.log(goods2);
        var goods=[];
        var table=document.getElementById("goods");
        for (var i=0;i<goods1.length;i++) {
            if (goods1[i].cells[0].querySelector("input").checked) {
                goods.push(goods1[i]);
            }
        }
        for (var j=0;j<goods2.length;j++) {
            if (goods2[j].cells[0].querySelector("input").checked) {
                goods.push(goods2[j]);
            }
        }
        if (goods.length>0&&confirm("确认要删除选中的商品吗？")) {
            for (var k=0;k<goods.length;k++) {
                goods[k].remove();
            }
        }
        var count=0;
        var totalPrice=0;
        changeTotal(count,totalPrice);
        goods1=document.querySelectorAll("tbody>.good1");
        goods2=document.querySelectorAll("tbody>.good2");
        if (goods1.length==0&&goods2.length==0) {
            set(table);
        } else if (goods1.length==0) {
            if (document.getElementById("jDZY")) {
                document.getElementById("jDZY").remove();
                document.getElementById("fullReduction1").remove();
            }
        } else if (goods2.length==0) {
            if (document.getElementById("jDHD")) {
                document.getElementById("jDHD").remove();
                document.getElementById("fullReduction2").remove();
            }
        }
    };
}

//选择一类good1或good2
function checkMulti() {
    var checkMultiS=document.getElementsByName("checkMulti");
    for (var i=0;i<checkMultiS.length;i++) {
        //console.log(checkMultiS[i].className.checked);
        checkMultiS[i].onchange=function () {
            var count=parseInt(document.getElementById("totalNum").innerHTML);
            var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
            if (this.className=="checkMulti1") {
                var goods1=document.querySelectorAll("tbody>.good1");
                for (var j=0;j<goods1.length;j++) {
                    if (this.checked) {
                        if (goods1[j].cells[0].querySelector("input").checked!=true) {
                            goods1[j].cells[0].querySelector("input").checked=true;
                            count+=parseInt(goods1[j].cells[5].querySelector("input").value);
                            totalPrice+=parseFloat(goods1[j].cells[6].querySelector(".subtotal").innerHTML.slice(1));
                        }
                    } else {
                        if (goods1[j].cells[0].querySelector("input").checked!=false) {
                            goods1[j].cells[0].querySelector("input").checked=false;
                            count-=parseInt(goods1[j].cells[5].querySelector("input").value);
                            totalPrice-=parseFloat(goods1[j].cells[6].querySelector(".subtotal").innerHTML.slice(1));
                        }
                    }
                }
            } else if (this.className=="checkMulti2") {
                var goods2=document.querySelectorAll("tbody>.good2");
                for (var j=0;j<goods2.length;j++) {
                    if (this.checked) {
                        if (goods2[j].cells[0].querySelector("input").checked!=true) {
                            goods2[j].cells[0].querySelector("input").checked=true;
                            count+=parseInt(goods2[j].cells[5].querySelector("input").value);
                            totalPrice+=parseFloat(goods2[j].cells[6].querySelector(".subtotal").innerHTML.slice(1));
                        }
                    } else {
                        if (goods2[j].cells[0].querySelector("input").checked!=false) {
                            goods2[j].cells[0].querySelector("input").checked=false;
                            count-=parseInt(goods2[j].cells[5].querySelector("input").value);
                            totalPrice-=parseFloat(goods2[j].cells[6].querySelector(".subtotal").innerHTML.slice(1));
                        }
                    }
                }
            }
            changeTotal(count,totalPrice);
            bgColorChange();
            isCheckAll();
            feed();
        };
    }
}

//全选
function checkALl() {
    //console.log(document.getElementsByClassName("checkAll"));
    var checkAllS=document.getElementsByClassName("checkAll");
    checkAllS[0].onchange=function () {
        var goods1=document.querySelectorAll("tbody .good1");
        var goods2=document.querySelectorAll("tbody .good2");
        var jDZY=document.getElementById("jDZY");
        var jDHD=document.getElementById("jDHD");
        var jDHD=document.getElementById("jDHD");
        //console.log(goods1);
        //console.log(goods2);
        var count=parseInt(document.getElementById("totalNum").innerHTML);
        var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
        for (var i=0;i<goods1.length;i++) {
            //console.log(goods1[i].cells[0].childNodes[0]);
            if (this.checked) {
                checkAllS[1].checked=true;
                jDZY.cells[0].querySelector("input").checked=true;
                if (goods1[i].cells[0].querySelector("input").checked!=true) {
                    goods1[i].cells[0].querySelector("input").checked=true;
                    count+=parseInt(goods1[i].cells[5].querySelector("input").value);
                    totalPrice+=parseFloat(goods1[i].cells[6].querySelector(".subtotal").innerHTML.slice(1));
                }
            } else {
                checkAllS[1].checked=false;
                jDZY.cells[0].querySelector("input").checked=false;
                if (goods1[i].cells[0].querySelector("input").checked!=false) {
                    goods1[i].cells[0].querySelector("input").checked=false;
                    count=0;
                    totalPrice=0;
                }
            }
        }
        for (var j=0;j<goods2.length;j++) {
            if (this.checked) {
                checkAllS[1].checked=true;
                jDHD.cells[0].querySelector("input").checked=true;
                if (goods2[j].cells[0].querySelector("input").checked!=true) {
                    goods2[j].cells[0].querySelector("input").checked=true;
                    count+=parseInt(goods2[j].cells[5].querySelector("input").value);
                    totalPrice+=parseFloat(goods2[j].cells[6].querySelector(".subtotal").innerHTML.slice(1));
                }
            } else {
                checkAllS[1].checked=false;
                jDHD.cells[0].querySelector("input").checked=false;
                if (goods2[j].cells[0].querySelector("input").checked!=false) {
                    goods2[j].cells[0].querySelector("input").checked=false;
                    count=0;
                    totalPrice=0;
                }
            }
        }
        inputChange();
        changeTotal(count,totalPrice);
        bgColorChange();
        isCheckAll();
        feed();
    };
    checkAllS[1].onchange=function () {
        var goods1=document.querySelectorAll("tbody>.good1");
        var goods2=document.querySelectorAll("tbody>.good2");
        var jDZY=document.getElementById("jDZY");
        var jDHD=document.getElementById("jDHD");
        var jDHD=document.getElementById("jDHD");
        //console.log(goods1);
        //console.log(goods2);
        var count=parseInt(document.getElementById("totalNum").innerHTML);
        var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
        for (var i=0;i<goods1.length;i++) {
            if (this.checked) {
                checkAllS[0].checked=true;
                jDZY.cells[0].querySelector("input").checked=true;
                if (goods1[i].cells[0].querySelector("input").checked!=true) {
                    goods1[i].cells[0].querySelector("input").checked=true;
                    count+=parseInt(goods1[i].cells[5].querySelector("input").value);
                    totalPrice+=parseFloat(goods1[i].cells[6].querySelector(".subtotal").innerHTML.slice(1));
                }
            } else {
                checkAllS[0].checked=false;
                jDZY.cells[0].querySelector("input").checked=false;
                if (goods1[i].cells[0].querySelector("input").checked!=false) {
                    goods1[i].cells[0].querySelector("input").checked=false;
                    count=0;
                    totalPrice=0;
                }
            }
        }
        for (var j=0;j<goods2.length;j++) {
            if (this.checked) {
                checkAllS[0].checked=true;
                jDHD.cells[0].querySelector("input").checked=true;
                if (goods2[j].cells[0].querySelector("input").checked!=true) {
                    goods2[j].cells[0].querySelector("input").checked=true;
                    count+=parseInt(goods2[j].cells[5].querySelector("input").value);
                    totalPrice+=parseFloat(goods2[j].cells[6].querySelector(".subtotal").innerHTML.slice(1));
                }
            } else {
                checkAllS[0].checked=false;
                jDHD.cells[0].querySelector("input").checked=false;
                if (goods2[j].cells[0].querySelector("input").checked!=false) {
                    goods2[j].cells[0].querySelector("input").checked=false;
                    count=0;
                    totalPrice=0;
                }
            }
        }
        inputChange();
        changeTotal(count,totalPrice);
        bgColorChange();
        isCheckAll();
        feed();
    };
}

//如果被选中
function isChecked() {
    var checks=document.getElementsByName("check");
    for (var i=0;i<checks.length;i++) {
        checks[i].onchange=function () {
            var count=parseInt(document.getElementById("totalNum").innerHTML);
            var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
            var n=parseInt(this.parentNode.parentNode.querySelector(".input").value);
            if (this.checked) {
                count+=n;
                totalPrice+=parseFloat(this.parentNode.parentNode.querySelector(".subtotal").innerHTML.slice(1));
            } else {
                count-=n;
                totalPrice-=parseFloat(this.parentNode.parentNode.querySelector(".subtotal").innerHTML.slice(1));
            }
            inputChange();
            changeTotal(count,totalPrice);
            bgColorChange();
            isCheckAll();
            feed();
        };
        //console.log(checks[i].parentNode.parentNode);
        /*checks[i].parentNode.parentNode.onclick=function (event) {
            var target=event.target;
            var n=parseInt(target.parentNode.parentNode.cells[5].childNodes[3].value);
            //console.log(target.parentNode.parentNode.cells[0].childNodes[0].checked);
            if (target.parentNode.parentNode.cells[0].childNodes[0].checked) {
                if (target.className=="add") {
                    n=1;
                } else if (target.className=="minus"&&count>1) {
                    n=-1;
                }
                count+=n;

            } else {
                count-=n;
            }
            totalPrice+=parseFloat(target.parentNode.parentNode.cells[6].childNodes[1].innerHTML.slice(1));
            changeTotal(count,totalPrice);
        }*/
    }
}

function changeTotal(count,totalPrice) {
    document.getElementById("num").innerHTML=count;
    document.getElementById("totalNum").innerHTML=count;
    document.getElementById("totalPrice").innerHTML="&yen;"+totalPrice.toFixed(2);
    //console.log(document.getElementById("reduce").innerHTML);
}

function addCount() {
    //获取class为add的数组
    var adds=document.getElementsByClassName("add");
    for (var i=0;i<adds.length;i++) {
        adds[i].onclick=function () {
            var coe=1;
            var n=this.parentNode.querySelector("input").value;
            n++;
            this.parentNode.querySelector("input").value=n;
            if (n>1) {
                coe=n/(n-1);
            }
            subtotal(this,n,coe);
            //console.log(this.parentNode.parentNode.cells[4].childNodes[1]);
            var count=parseInt(document.getElementById("totalNum").innerHTML);
            var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
            if (this.parentNode.parentNode.cells[0].querySelector("input").checked) {
                count++;
                totalPrice+=parseFloat(this.parentNode.parentNode.cells[4].querySelector(".price").innerHTML.slice(1));
            }
            changeTotal(count,totalPrice);
            inputChange();
            feed();
        };
    }
}

function minusCount() {
    //获取class为minus的数组
    var minus=document.getElementsByClassName("minus");
    for (var i=0;i<minus.length;i++) {
        minus[i].onclick=function () {
            var n=this.parentNode.querySelector("input").value;
            //系数，减的时候重量要乘以系数
            var coe=1;
            if (n>1) {
                n--;
                this.parentNode.querySelector("input").value=n;
                coe=n/(n+1);
                //console.log(parseFloat(target.parentNode.nextSibling.nextSibling.childNodes[3].innerHTML));
                //console.log(document.getElementById("totalNum").innerHTML);
                var count=parseInt(document.getElementById("totalNum").innerHTML);
                var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
                if (this.parentNode.parentNode.cells[0].querySelector("input").checked&&count>0) {
                    //console.log(this.parentNode.childNodes[3].value);
                    count--;
                    totalPrice-=parseFloat(this.parentNode.parentNode.cells[4].querySelector(".price").innerHTML.slice(1));
                }
                changeTotal(count,totalPrice);
                inputChange();
            }
            subtotal(this,n,coe);
            feed();
        };
    }
}

function subtotal(target,n,coe) {
    //console.log(target.parentNode.parentNode.getElementsByClassName("price")[0].innerHTML);
    var price=parseFloat(target.parentNode.parentNode.querySelector(".price").innerHTML.slice(1));
    var weight=target.parentNode.parentNode.querySelector(".weight").innerHTML;
    //console.log(weight);
    target.parentNode.parentNode.querySelector(".subtotal").innerHTML="&yen;"+(n*price).toFixed(2);
    if (target.parentNode.parentNode.querySelector(".weight").innerHTML!="") {
        //加的时候系数coe=n/(n-1)，重量为coe*weight
        //减的时候系数coe=n/(n+1)，重量为coe*weight
        target.parentNode.parentNode.querySelector(".weight").innerHTML=(coe*parseFloat(weight)).toFixed(2)+"kg";
    }
}

function cityChange() {
    //城市改变
    //根据id获取城市对象
    var select=document.getElementById("city");
    //绑定onchange事件
    select.onchange=function () {
        //如果改变了，获取当前城市的value值
        var cityVal=select.value;
        //alert(cityVal);
        //根据id获取要被修改的地区对象
        var area = document.getElementById("area");
        var myCity=document.querySelector("#myCity>a>span");
        //用分支进行判断
        switch (cityVal) {
            //如果改为北京
            case 'bj':
                //修改北京地区城市的对应
                area.innerHTML = "<option value='hd'>海淀区</option><option value='cy'>朝阳区</option><option value='dc'>东城区</option>";
                myCity.innerHTML="北京";
                break;
            //如果改为天津
            case 'tj':
                //修改天津城市对应的地区
                area.innerHTML = "<option value='nk'>南开区</option><option value='xq'>西青区</option><option value='hx'>河西区</option>";
                myCity.innerHTML="天津";
                break;
            //如果改为上海
            case 'sh':
                //修改上海城市对应的地区
                area.innerHTML = "<option value='pd'>浦东区</option><option value='yp'>杨浦区</option>";
                myCity.innerHTML="上海";
                break;
            default :
                alert("ERROR");
                break;
        }
    };
}

function focusBlur() {
    //搜索输入框活动失去焦点时的不同状态
    var input=document.querySelector("#search>input:nth-child(1)");
    //获取焦点
    input.onfocus=function () {
        if (input.value=="自营") {
            input.value="";
        }
    };
    //失去焦点
    input.onblur=function () {
        if (input.value=="") {
            input.value="自营";
        }
    };
}

function deleteOne() {
    var table=document.getElementById("goods");
    //获取class为delete的数组
    var deletes=document.getElementsByClassName("delete");
    for (var i=0;i<deletes.length;i++) {
        deletes[i].onclick=function () {
            var count=parseInt(document.getElementById("totalNum").innerHTML);
            var totalPrice=parseFloat(document.getElementById("totalPrice").innerHTML.slice(1));
            var tr=this.parentNode.parentNode;

            //获取每一类的商品数组
            var good1=table.getElementsByClassName("good1");
            var good2=table.getElementsByClassName("good2");

            //console.log(tr.cells[0].querySelector("input").checked);
            //删除单件商品
            if (confirm("确认要删除\""+tr.cells[1].childNodes[0].alt+"\"吗？")) {
                if (tr.cells[0].querySelector("input").checked==true) {
                    tr.cells[0].querySelector("input").checked=false;
                    count-=parseInt(tr.cells[5].querySelector("input").value);
                    totalPrice-=parseFloat(tr.querySelector(".subtotal").innerHTML.slice(1));
                }
                tr.remove();
            }
            if (good1.length==0&&(good2.length==0)) {
                set(table);
            } else if (good1.length==0&&(good2.length!=0)) {
                if (document.getElementById("jDZY")) {
                    document.getElementById("jDZY").remove();
                    document.getElementById("fullReduction1").remove();
                }
            } else if (good2.length==0&&(good1.length!=0)) {
                if (document.getElementById("jDHD")) {
                    document.getElementById("jDHD").remove();
                    document.getElementById("fullReduction2").remove();
                }
            }
            good1=table.getElementsByClassName("good1");
            good2=table.getElementsByClassName("good2");
            if ((good1.length>0||good2.length>0)) {
                changeTotal(count,totalPrice);
                feed();
            }
        };
    }
}

function set(table) {
    document.getElementById("num").innerHTML=0;
    table.innerHTML="<div class='isEmpty'>购物车内暂时没有商品，请添加商品</div>";
    document.getElementById("settlement").remove();
}

function deleteAll() {
    //清理购物车
    var table=document.getElementById("goods");
    var deleteAllGood=document.querySelector("#settlement>div:nth-child(5)>span");
    deleteAllGood.onclick=function () {
        if (confirm("确认要清理购物车吗？")) {
            set(table);
        }
    };
}

//悬浮菜单显示
function showDropDown() {
    //显示我的京东下的悬浮菜单
    var MyJD=document.getElementById("myJD");
    var MyJDDropDown=document.getElementById("myJDDropDown");
    toggleShow(MyJD,MyJDDropDown);

    //显示企业采购下的悬浮菜单
    var EnterpriseProcurement=document.getElementById("EnterpriseProcurement");
    var EnterpriseProcurementDropDown=document.getElementById("EnterpriseProcurementDropDown");
    toggleShow(EnterpriseProcurement,EnterpriseProcurementDropDown);

    //显示客户服务下的悬浮菜单
    var service=document.getElementById("service");
    var serviceDropDown=document.getElementById("serviceDropDown");
    toggleShow(service,serviceDropDown);

    //显示网站导航下的悬浮菜单
    var siteNavigation=document.getElementById("siteNavigation");
    var siteNavigationDropDown=document.getElementById("siteNavigationDropDown");
    toggleShow(siteNavigation,siteNavigationDropDown);
}

//target目标，dropDown与之对应的悬浮列表
function toggleShow(target,dropDown) {
    //鼠标移入
    //移入主菜单
    target.onmouseover=function () {
        dropDown.className="show";
        //移入悬浮菜单
        dropDown.onmouseover=function () {
            dropDown.className="show";
        };
    };
    //鼠标移出
    //移出主菜单
    target.onmouseout=function () {
        dropDown.className="hide";
        //移除悬浮菜单
        dropDown.onmouseout=function () {
            dropDown.className="hide";
        };
    };
}

function tips(a) {
    var massage=a.getElementsByTagName("span")[0].innerHTML;
    alert("将要打开的页面是："+massage);
}