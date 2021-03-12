// 重构-改善既有的代码设计第10章+12章
// 1.分解条件表达式
{
    if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
        charge = quantity * plan.summerRate;
    } else {
        charge = quantity * plan.regularRate + plan.regularServiceCharge;
    }

    // ------------------------------------------------------
    // 分解后利用短路运算符或三目运算，此处是三目运算
    function summer() {
        return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
    }

    function summerCharge() {
        return quantity * plan.summerRate;
    }

    function regularCharge() {
        return quantity * plan.regularRate + plan.regularServiceCharge;
    }

    charge = summer() ? summerCharge() : regularCharge();
}

/**
 * 合并条件表达式
 * 检查条件各不相同，最终行为却一致
 */
{
    function disabilityAmount(anEmployee) {
        if (anEmployee.seniority < 2) return 0;
        if (anEmployee.monthsDisabled > 12) return 0;
        if (anEmployee.isPartTime) return 0;
    }
    // ----------------------------------------
    function disabilityAmount(anEmployee) {
        if ((anEmployee.seniority < 2) ||
            (anEmployee.monthsDisabled > 12) ||
            (anEmployee.isPartTime)) return 0;
        // compute the disability amount
    }

    // -----------------------------------------
    function disabilityAmount(anEmployee) {
        if (isNotEligableForDisability()) return 0;
        // compute the disability amount
    }

    function isNotEligableForDisability() {
        return ((anEmployee.seniority < 2) ||
            (anEmployee.monthsDisabled > 12) ||
            (anEmployee.isPartTime));
    }
}

/**
 * 卫语句
 */
function getPayAmount() {
    let result;
    if (isDead)
        result = deadAmount();
    else {
        if (isSeparated)
            result = separatedAmount();
        else {
            if (isRetired)
                result = retiredAmount();
            else
                result = normalPayAmount();
        }
    }
    return result;
}
// -------------------------------------------
function getPayAmount() {
    if (isDead) return deadAmount();
    if (isSeparated) return separatedAmount();
    if (isRetired) return retiredAmount();
    return normalPayAmount();
}
/**
 * 4.以多态取代条件，详见重构10.4
 */

/**
 * 5.引入特例
 */

if (aCustomer === "unknown") customerName = "occupant";
class UnknownCustomer {
    get name() {
        return "occupant";
    }
} 