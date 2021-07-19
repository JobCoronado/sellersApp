const fetch = require("node-fetch");

const orderRules = async (methodId, req, res) => {
  try {
    const res = await fetch(
      `https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods/${methodId}`,
      {
        method: "GET",
        headers: {
          "x-api-key": "oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT",
        },
      }
    );
    return await res.json();
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const ordersOffDays = async (req, res) => {
  try {
    const res = await fetch(
      "https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/off-days",
      {
        method: "GET",
        headers: {
          "x-api-key": "oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT",
        },
      }
    );
    return await res.json();
  } catch (error) {
    return res.json({ message: error.message });
  }
};
// Get time in Epoch format
const getEpochDate = (today) => {
  try {
    const epoch = Date.UTC(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
      today.getHours(),
      today.getMinutes(),
      today.getSeconds(),
      today.getMilliseconds()
    );
    return epoch;
  } catch (error) {
    return { message: error.message };
  }
};

// add a random numbert ot the orderId
const getRandomNumber = (min, max) => {
  try {
    return Math.floor(Math.random() * (max - min)) + min;
  } catch (error) {
    return { message: error.message };
  }
};

// create the orderId
const addOrderId = (date) => {
  try {
    const epoch = getEpochDate(date);
    const random = getRandomNumber(0, 100);
    return "MSE" + epoch + random;
  } catch (error) {
    return { message: error.message };
  }
};
// valdation of the promises
const promisesValidation = (orderData) => {
  try {
    orderData.packPromiseMin = null;
    orderData.packPromisaMax = null;
    orderData.shipPromiseMin = null;
    orderData.shipPromisaMax = null;
    orderData.deliveryPromiseMin = null;
    orderData.deliveryPromisaMax = null;
    orderData.readyPickupPromiseMin = null;
    orderData.readyPickupPromisaMax = null;
    return orderData;
  } catch (error) {
    return { message: error.message };
  }
};

const createDate = (date) => {
  if (date.getMonth() + 1 < 10) {
    if (date.getDate() < 10) {
      return (
        date.getFullYear() +
        "-" +
        "0" +
        (date.getMonth() + 1) +
        "-" +
        "0" +
        date.getDate()
      );
    } else {
      return (
        date.getFullYear() +
        "-" +
        "0" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate()
      );
    }
  } else {
    if (date.getDate() < 10) {
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        "0" +
        date.getDate()
      );
    } else {
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    }
  }
};

const caseBusinessDay = async (date, offDays) => {
  const noBusinessDay = offDays.some((offDay) => date == offDay);
  return noBusinessDay;
};

const caseNextBusinessDay = async (offDays) => {
  try {
    let today = new Date();
    let nextBusinessDays = [];
    while (nextBusinessDays.length < 10) {
      const nextDayAux = new Date(today.setDate(today.getDate() + 1));
      const nextDay = createDate(nextDayAux);
      const delay = await caseBusinessDay(nextDay, offDays);
      if (delay == false) {
        nextBusinessDays.push(nextDay);
      }
    }
    return nextBusinessDays;
  } catch (error) {
    return { message: error.message };
  }
};

const caseWeightOrder = (items) => {
  try {
    let orderWeight = 0;
    items.forEach((item) => {
      orderWeight += parseFloat(item.productWeight) * parseInt(item.productQty);
    });
    return orderWeight;
  } catch (error) {
    return { message: error.message };
  }
};

const validateWeightOrder = (min, max, weight) => {
  try {
    let validated = true;
    if (min <= weight && weight <= max) {
      validated = true;
    } else {
      validated = false;
    }
    return validated;
  } catch (error) {
    return { message: error.message };
  }
};
//Function to validate day type

const validateDays = async (date, offDays, type) => {
  try {
    let validated = false;
    if (type == "ANY") {
      validated = true;
    } else if (type == "BUSINESS") {
      const day = createDate(date);
      const offDay = await caseBusinessDay(day, offDays);
      if (offDay == false) {
        validated = true;
      } else {
        validated = false;
      }
    }

    return validated;
  } catch (error) {
    return { message: error.message };
  }
};

const validateDayTime = async (date, from, to) => {
  try {
    let validated = true;
    const hour = date.getHours();
    if (from <= hour && hour <= to) {
      validated = true;
    } else {
      validated = false;
    }
    return validated;
  } catch (error) {
    return { message: error.message };
  }
};

const validateOrderId = async (cases, priority) => {
  try {
    const outPut = [];
    let validated = false;
    const caseAux = cases.find((element) => element.priority == priority);
    if (!caseAux) {
      validated = false;
    } else {
      validated = true;
    }
    outPut.caseAux = caseAux;
    outPut.validated = validated;
    return outPut;
  } catch (error) {
    return { message: error.message };
  }
};

const caseFormatPromises = (date) => {
  try {
    const hour = date.getUTCHours();
    if (hour < 12) {
      return (
        date.getUTCFullYear() +
        "-" +
        (date.getUTCMonth() + 1) +
        "-" +
        date.getUTCDate() +
        " at " +
        hour +
        " am"
      );
    } else {
      return (
        date.getUTCFullYear() +
        "-" +
        (date.getUTCMonth() + 1) +
        "-" +
        date.getUTCDate() +
        " at " +
        (hour - 12) +
        " pm"
      );
    }
  } catch (error) {
    return { message: error.message };
  }
};

const validateParamsPromises = (workingCase) => {
  try {
    const packParams = [];
    packParams.minType = workingCase.min.type;
    packParams.minDeltaHours = workingCase.min.deltaHours;
    packParams.minDeltaBusiness = workingCase.min.deltaBusinessDays;
    packParams.minTimeOfDay = workingCase.min.timeOfDay;
    packParams.maxType = workingCase.max.type;
    packParams.maxDeltaHours = workingCase.max.deltaHours;
    packParams.maxDeltaBusiness = workingCase.max.deltaBusinessDays;
    packParams.maxTimeOfDay = workingCase.max.timeOfDay;
    return packParams;
  } catch (error) {
    return { message: error.message };
  }
};

const checkOrderId = async (priority, nowDataTime, rules, offDays) => {
  try {
    const caseValidation = await validateOrderId(
      rules.rules.promisesParameters.cases,
      priority
    ); //Vefiry case
    if (caseValidation.validated == true) {
      const dayType = caseValidation.caseAux.condition.byRequestTime.dayType;
      const fromTimeOfDay =
        caseValidation.caseAux.condition.byRequestTime.fromTimeOfDay;
      const toTimeOfDay =
        caseValidation.caseAux.condition.byRequestTime.toTimeOfDay;
      const caseDayTypeValidation = await validateDays(
        nowDataTime,
        offDays,
        dayType
      );
      if (caseDayTypeValidation == true) {
        const caseTimeOfDay = await validateDayTime(
          nowDataTime,
          fromTimeOfDay,
          toTimeOfDay
        );
        if (caseTimeOfDay == true) {
          const workingCase = caseValidation.caseAux;
          return workingCase;
        } else {
          return await checkOrderId(priority + 1, nowDataTime, rules, offDays);
        }
      } else {
        return await checkOrderId(priority + 1, nowDataTime, rules, offDays);
      }
    } else {
      orderData = promisesValidation(orderData);
    }
  } catch (error) {
    return { message: error.message };
  }
};

const casePromiseMin = (
  date,
  type,
  deltaHours,
  nextBusinessDays,
  minDeltaBusinessDays,
  minTimeOfDay
) => {
  try {
    if (type == "NULL") {
      promiseMin = null;
    } else if (type == "DELTA-HOURS") {
      const hour = date.getUTCHours() + deltaHours;
      const time = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        hour
      );
      promiseMin = caseFormatPromises(time);
    } else if (type == "DELTA-BUSINESSDAYS") {
      const newDate = new Date(nextBusinessDays[minDeltaBusinessDays - 1]);
      const newTime = minTimeOfDay;
      const promise = new Date(
        newDate.getUTCFullYear(),
        newDate.getUTCMonth(),
        newDate.getUTCDate(),
        newTime
      );
      promiseMin = caseFormatPromises(promise);
    }
    return promiseMin;
  } catch (error) {
    return { message: error.message };
  }
};

const casePromiseMax = (
  date,
  type,
  deltaHours,
  nextBusinessDays,
  maxDeltaBusinessDays,
  maxTimeOfDay
) => {
  try {
    if (type == "NULL") {
      promiseMax = null;
    } else if (type == "DELTA-HOURS") {
      const hour = date.getUTCHours() + deltaHours;
      const time = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        hour
      );
      promiseMax = caseFormatPromises(time);
    } else if (type == "DELTA-BUSINESSDAYS") {
      const newDate = new Date(nextBusinessDays[maxDeltaBusinessDays - 1]);
      const newTime = maxTimeOfDay;
      const promise = new Date(
        newDate.getUTCFullYear(),
        newDate.getUTCMonth(),
        newDate.getUTCDate(),
        newTime
      );
      promiseMax = caseFormatPromises(promise);
    }
    return promiseMax;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  orderRules,
  ordersOffDays,
  addOrderId,
  promisesValidation,
  createDate,
  caseNextBusinessDay,
  caseWeightOrder,
  validateWeightOrder,
  validateDays,
  validateDayTime,
  validateParamsPromises,
  checkOrderId,
  casePromiseMin,
  casePromiseMax,
};
