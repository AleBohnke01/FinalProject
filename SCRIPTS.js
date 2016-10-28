/**
 * Created by Ale on 10/10/16.
 */

const STRESS_COST = 225;
const TIME_MANAGEMENT_COST = 200;
const SUPERVISION_SKILLS_COST = 250;
const NEGOTIATION_COST = 175;
const INTERVIEW_COST = 155;

const GOLD_DISCOUNT = .25;
const SILVER_DISCOUNT = .15;
const BRONZE_DISCOUNT = .10;
const COPPER_DISCOUNT = .05;

const AUSTIN_LODGING_COST = 150;
const CHICAGO_LODGING_COST = 225;
const DALLAS_LODGING_COST = 175;
const ORLANDO_LODGING_COST = 300;
const PHOENIX_LODGING_COST = 175;
const RALEIGH_LODGING_COST = 150;

const SALES_TAX_RATE = 0.075;
const MAXIMUM_WORKSHOPS_SELECTED = 3;



function $(elementName) {
    return document.getElementById(elementName);
}



function PageLoad() {

    $("divStress").innerHTML= "$" + STRESS_COST;
    $("divTime").innerHTML= "$" + TIME_MANAGEMENT_COST;
    $("divSupervision").innerHTML = "$" + SUPERVISION_SKILLS_COST;
    $("divNegotiation").innerHTML = "$" + NEGOTIATION_COST;
    $("divInterview").innerHTML = "$" + INTERVIEW_COST;

    $("divAustin").innerHTML = "$" + AUSTIN_LODGING_COST;
    $("divChicago").innerHTML = "$" + CHICAGO_LODGING_COST;
    $("divDallas").innerHTML = "$" + DALLAS_LODGING_COST;
    $("divOrlando").innerHTML = "$" + ORLANDO_LODGING_COST;
    $("divPhoenix").innerHTML = "$" + PHOENIX_LODGING_COST;
    $("divRaleigh").innerHTML = "$" + RALEIGH_LODGING_COST;

    $("divGold").innerHTML = FormatPercent(GOLD_DISCOUNT);
    $("divSilver").innerHTML = FormatPercent(SILVER_DISCOUNT);
    $("divBronze").innerHTML = FormatPercent(BRONZE_DISCOUNT);
    $("divCopper").innerHTML = FormatPercent(COPPER_DISCOUNT);

    $("radGold").disabled = true;
    $("radSilver").disabled = true;
    $("radBronze").disabled = true;
    $("radCopper").disabled = true;

}

function EnableDiscount() {
    var isChecked = document.getElementById("chkEnableDiscount").checked;

    if (isChecked == true) {
        $("radGold").disabled = false;
        $("radSilver").disabled = false;
        $("radBronze").disabled = false;
        $("radCopper").disabled = false;
    } else {
        $("radGold").checked = true;
        $("radGold").disabled = true;
        $("radSilver").disabled = true;
        $("radBronze").disabled = true;
        $("radCopper").disabled = true;
    }

}


function ClearOutput() {
    $("divWorkshopTotal").innerHTML=" ";
    $("divLodgingTotal").innerHTML=" ";
    $("divDiscountAmount").innerHTML=" ";
    $("divSalesTaxAmount").innerHTML=" ";
    $("divTotalDue").innerHTML=" ";

    $("divWorkshopError").innerHTML = "";
}

function ClearInput() {
    $("chkStress").checked = false;
    $("chkTime").checked = false;
    $("chkSupervision").checked = false;
    $("chkNegotiation").checked = false;
    $("chkInterview").checked = false;

    $("radAustin").checked = true;
    $("radChicago").checked = false;
    $("radDallas").checked = false;
    $("radOrlando").checked = false;
    $("radPhoenix").checked = false;
    $("radRaleigh").checked = false;

    $("chkEnableDiscount").checked = false;

    $("radGold").checked = true;
    $("radGold").disabled = true;
    $("radSilver").disabled = true;
    $("radBronze").disabled = true;
    $("radCopper").disabled = true;

    $("chkTaxExempt").checked = false;

}


function ClearForm() {
    ClearOutput();

    ClearInput();

}





function Calculate() {
    ClearOutput();

    var workshopsCost = 0;
    var lodgingCost = 0;
    var discountRate = 0;
    var discountAmount = 0;
    var subtotal = 0;
    var salesTaxAmount = 0;
    var totalCost = 0;


    if (CheckWorkshopsSelected() > 3) {
        $("divWorkshopError").innerHTML = "* Selected workshops exceeds maximum of "
            + MAXIMUM_WORKSHOPS_SELECTED;
        return;
    } else if (CheckWorkshopsSelected() == 0) {
        $("divWorkshopError").innerHTML = "* No workshop(s) selected";
        return;
    }

    workshopsCost = CalculateWorkshopsTotalCost();
    lodgingCost = CalculateLodgingCost();
    subtotal = workshopsCost + lodgingCost;
    discountRate = CalculateDiscountRate();
    discountAmount = subtotal * discountRate;

    if ($("chkTaxExempt").checked == false) {
        salesTaxAmount = (subtotal - discountAmount) * SALES_TAX_RATE;
    }

    totalCost = subtotal - discountAmount + salesTaxAmount;

    $("divDiscountAmount").innerHTML = FormatCurrency(discountAmount);

    $("divSalesTaxAmount").innerHTML = FormatCurrency(salesTaxAmount);

    $("divTotalDue").innerHTML = FormatCurrency(totalCost);

    //display output to appropriate div element
}



function CheckWorkshopsSelected() {
    var totalNumber = 0;


    if ($("chkStress").checked) {
        totalNumber++;
    }

    if ($("chkTime").checked) {
        totalNumber++;
    }

    if ($("chkSupervision").checked) {
        totalNumber++;
    }

    if ($("chkNegotiation").checked) {
        totalNumber++;
    }

    if ($("chkInterview").checked) {
        totalNumber++;
    }

    return totalNumber;

}




function CalculateWorkshopsTotalCost() {
    var workshopTotalCost = 0;

    if ($("chkStress").checked == true) {
        workshopTotalCost += STRESS_COST;
    }
    if ($("chkTime").checked == true) {
        workshopTotalCost += TIME_MANAGEMENT_COST;
    }
    if ($("chkSupervision").checked == true) {
        workshopTotalCost += SUPERVISION_SKILLS_COST;
    }
    if ($("chkNegotiation").checked == true) {
        workshopTotalCost += NEGOTIATION_COST;
    }
    if ($("chkInterview").checked == true) {
        workshopTotalCost += INTERVIEW_COST;
    }

    $("divWorkshopTotal").innerHTML = FormatCurrency(workshopTotalCost);
    return workshopTotalCost;

    //determine total cost of workshops selected
    //determine which ones and add together

}




function CalculateLodgingCost() {
    var lodgingtotal = 0;

    if ($("radAustin").checked == true){
        lodgingtotal = AUSTIN_LODGING_COST
    }

    else if ($("radChicago").checked == true){
        lodgingtotal = CHICAGO_LODGING_COST
    }

    else if ($("radDallas").checked == true){
        lodgingtotal = DALLAS_LODGING_COST
    }

    else if ($("radOrlando").checked == true){
        lodgingtotal = ORLANDO_LODGING_COST
    }

    else if ($("radPhoenix").checked == true){
        lodgingtotal= PHOENIX_LODGING_COST
    }

    else if ($("radRaleigh").checked == true){
        lodgingtotal = RALEIGH_LODGING_COST
    }

    $("divLodgingTotal").innerHTML = FormatCurrency(lodgingtotal);
    return lodgingtotal;

}

function CalculateDiscountRate() {



    if ($("chkEnableDiscount").checked)
    if ($("radGold").checked == true) {
        return GOLD_DISCOUNT;
    }
    else if ($("radSilver").checked == true) {
        return SILVER_DISCOUNT;
    }

    else if ($("radBronze").checked == true) {
        return BRONZE_DISCOUNT;
    }
    else if ($("radCopper").checked == true) {
        return COPPER_DISCOUNT;
    }

    return 0;

    //ONLY IF APPLIED (CHECKED)
    //FINDS RATE
}


function FormatCurrency(dollarsign) {
    dollarsign = dollarsign.toFixed(2);
    dollarsign = "$" + dollarsign;

    return dollarsign;
    //rounded to two decimal places
    //add a dollar sign
}

function FormatPercent(percent) {
    percent= percent * 100;
    percent= percent.toFixed(2);
    percent = percent + "%";

    return percent;
    //two decimal places and % sign
}
