const fs = require('fs');
const axios = require('axios');



const newDate = () => new Date().toISOString().split('T')[0]
const number = Math.round(Math.random() * (100 - 1) + 1);
const date = newDate();
const newDateOrder = (parseInt(number +  1 + date.split('-').join('')) );




const getNewId = (array) => {
    if (array.length > 0) {
        return newDateOrder
        return 1
    }
}



function mustBeInArray(array, OrderId) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.OrderId == OrderId)
        if (!row) {
            reject({
                message: 'incorrect OrderId',
                status: 404
            })
        }
        resolve(row)
    })
}

function getAllOrders(filename) {
    const rawData = fs.readFileSync(filename, 'utf8');
    const tData = rawData
    // console.log("bueno", tData, "aqui")

    return JSON.parse(rawData);
   
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}


const getRules = async (methodId, req, res) => {
    try {
      const res = await axios.get(
        `https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods/${methodId}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT",
          },
        }
      );
      return (await res.json())
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
  //Function to get the offDays.
  // Out: array with offDays of 2021.
  const getOffDays = async (req, res) => {
    try {
      const res = await axios.get(
        "https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/off-days",
        {
          method: "GET",
          headers: {
            "x-api-key": "oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT",
          },
        }
      );
      return (await res.json())
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
  //Function to get the time.
  // In: a date. Out: date in epoch format.
  const getDataTimeEpoch = (today) => {
    try {
      const epoch = Date.UTC(today.getFullYear(), (today.getMonth() + 1), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
      return epoch;
    } catch (error) {
      return ({ message: error.message });
    }
  };
  
  //Function to generate a number beteewn 0 and 100.
  // In: range of number to be generated (min & max). Out: random number between min & max.
  const getRandomArbitrary = (min, max) => {
    try {
      return Math.floor(Math.random() * (max - min)) + min;
    } catch (error) {
      return ({ message: error.message });
    }
  }
  
  //Function to generate internal order number.
  // In: a date. Out: unique number for the order.
  const generateIntOrderNumber = (date) => {
    try {
      const epoch = getDataTimeEpoch(date);
      const random = getRandomArbitrary(0, 100);
      return "MSE" + epoch + random;
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Function to handle the wrong validation. 
  // In: a object orderData. Out: a object ordeDate with the promises calculated when was an wrong validation.
  const handleWrongValidation = (orderData) => {
    try {
      orderData.packPromiseMin = null;
      orderData.packPromisaMax = null;
      orderData.shipPromiseMin = null;
      orderData.shipPromisaMax = null;
      orderData.deliveryPromiseMin = null;
      orderData.deliveryPromisaMax = null;
      orderData.readyPickupPromiseMin = null;
      orderData.readyPickupPromisaMax = null;
      return orderData
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Function to formation tomorrow date.
  // In: a date. Out: date with a specific format to display.
  const getFormatDate = (date) => {
    if ((date.getMonth() + 1) < 10) {
      if ((date.getDate()) < 10) {
        return date.getFullYear() + "-" + "0" + (date.getMonth() + 1) + "-" + "0" + date.getDate();
      } else {
        return date.getFullYear() + "-" + "0" + (date.getMonth() + 1) + "-" + date.getDate();
      }
    } else {
      if ((date.getDate()) < 10) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + "0" + date.getDate();
      } else {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      }
    }
  }
  //Function to verify if tomorrow is a business day.
  // In: a date and a array with offDays. Out: true if the date is a offDay, false if not.
  const verifyBusinessDays = async (date, offDays) => {
    const noBusinessDay = offDays.some((offDay) => date == offDay)
    return noBusinessDay
  }
  //Function to create next business day
  // In: a array with offDays. Out: array with the next 10 business days.
  const nextBusinesDays = async (offDays) => {
    try {
      let today = new Date();
      let nextBusinessDays = [];
      while (nextBusinessDays.length < 10) {
        const nextDayAux = new Date(today.setDate(today.getDate() + 1));
        const nextDay = getFormatDate(nextDayAux);
        const delay = await verifyBusinessDays(nextDay, offDays)
        if (delay == false) {
          nextBusinessDays.push(nextDay)
        }
      }
      return nextBusinessDays
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Function to calculate the weight of the list itmes in the order.
  // In: array with purchase items. Out: total weight of teh order.
  const calculateOrderWeight = (items) => {
    try {
      let orderWeight = 0
      items.forEach(item => {
        orderWeight += (parseFloat(item.productWeight) * parseInt(item.productQty));
      })
      return orderWeight
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Function to validate the weight
  // In: params for validate (min & max) and total weight of a purchase. Out: true if the order weight is in the rande, false if is not.
  const verifyWeight = (min, max, weight) => {
    try {
      let validated = true;
      if (min <= weight && weight <= max) {
        validated = true;
      } else {
        validated = false
      }
      return validated
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Function to validate day type
  // In: a date, an array with offDays, and a type of day. Out: true if the is valid or false if is not.
  const verifyDayType = async (date, offDays, type) => {
    try {
      let validated = false;
      if (type == "ANY") {
        validated = true;
      }
      else if (type == "BUSINESS") {
        const day = getFormatDate(date)
        const offDay = await verifyBusinessDays(day, offDays)
        if (offDay == false) {
          validated = true;
        } else {
          validated = false;
        }
      }
  
      return validated
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Function to validate the time of the day 
  // In: a date, a hour from and a hour to. Out: true if the actual hour is in the range.
  const verifyTimeOfDay = async (date, from, to) => {
    try {
      let validated = true;
      const hour = date.getHours();
      if (from <= hour && hour <= to) {
        validated = true;
      } else {
        validated = false
      }
      return validated
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Funtion to validate id the case exists
  // In: a cases and priority. Out: an array with caseAux(selected at the moment) and validated( true if teh case exists or false if is not).
  const caseValidator = async (cases, priority) => {
    try {
      const outPut = [];
      let validated = false
      const caseAux = cases.find(element => element.priority == priority);
      if (!caseAux) { //case doesn´t exist
        validated = false
      } else { // case exists
        validated = true;
      }
      outPut.caseAux = caseAux;
      outPut.validated = validated;
      return outPut
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Funtion to build a date format for a promise
  // In: a date. Out: date in format to display
  const getPromiseFormat = (date) => {
    try {
      const hour = date.getUTCHours()
      if (hour < 12) {
        return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + " at " + (hour) + " am"
      } else {
        return date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + " at " + (hour - 12) + " pm"
      }
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Function to get pack params from working case
  // In: a working case. Out: array with the params to evaluate
  const getPromiseParams = (workingCase) => {
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
      return packParams
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Function to iterate the case
  // In: priority, time of order creation, rules of case, offDays. Out: working case
  const caseIterator = async (priority, nowDataTime, rules, offDays) => {
    try {
      const caseValidation = await caseValidator(rules.rules.promisesParameters.cases, priority) //Vefiry case
      if (caseValidation.validated == true) {
        const dayType = caseValidation.caseAux.condition.byRequestTime.dayType;
        const fromTimeOfDay = caseValidation.caseAux.condition.byRequestTime.fromTimeOfDay;
        const toTimeOfDay = caseValidation.caseAux.condition.byRequestTime.toTimeOfDay;
        const caseDayTypeValidation = await verifyDayType(nowDataTime, offDays, dayType);
        if (caseDayTypeValidation == true) {
          const caseTimeOfDay = await verifyTimeOfDay(nowDataTime, fromTimeOfDay, toTimeOfDay)
          if (caseTimeOfDay == true) {
            const workingCase = caseValidation.caseAux; //Select workingCase
            return workingCase
          } else {
            return await caseIterator((priority + 1), nowDataTime, rules, offDays)
          }
        } else {
          return await caseIterator((priority + 1), nowDataTime, rules,offDays)
        }
      } else {
        orderData = handleWrongValidation(orderData);
        // res.send({ message: "Case validation failed" })
      }
    } catch (error) {
      return ({ message: error.message });
    }
  }
  //Function to calculate the min value of a promise
  // In: a date, type, delta, an array with business days, deltaBusinessDay and minTimeofDay for a specific case. Out: calculated promise min
  const calculatePromiseMin = (date, type, deltaHours, nextBusinessDays, minDeltaBusinessDays, minTimeOfDay) => {
    try {
      if (type == "NULL") {
        promiseMin = null;
      } else if (type == "DELTA-HOURS") {
        const hour = date.getUTCHours() + deltaHours;
        const time = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour);
        promiseMin = getPromiseFormat(time);
      } else if (type == "DELTA-BUSINESSDAYS") {
        const newDate = new Date(nextBusinessDays[minDeltaBusinessDays - 1]);
        const newTime = minTimeOfDay
        const promise = new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), newTime);
        promiseMin = getPromiseFormat(promise);
      }
      return promiseMin
    } catch (error) {
      return ({ message: error.message });
    }
  }
  
  //Function to calculate the max value of a promise
  // In: a date, type, delta, an array with business days, deltaBusinessDay and maxTimeofDay for a specific case. Out: calculated promise max
  const calculatePromiseMax = (date, type, deltaHours, nextBusinessDays, maxDeltaBusinessDays, maxTimeOfDay) => {
    try {
      if (type == "NULL") {
        promiseMax = null;
      } else if (type == "DELTA-HOURS") {
        const hour = date.getUTCHours() + deltaHours;
        const time = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour);
        promiseMax = getPromiseFormat(time);
      } else if (type == "DELTA-BUSINESSDAYS") {
        const newDate = new Date(nextBusinessDays[maxDeltaBusinessDays - 1]);
        const newTime = maxTimeOfDay
        const promise = new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), newTime);
        promiseMax = getPromiseFormat(promise);
      }
      return promiseMax
    } catch (error) {
      return ({ message: error.message });
    }
  }

module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile,
    getAllOrders,
    getRules, getOffDays, generateIntOrderNumber, handleWrongValidation, getFormatDate, nextBusinesDays, calculateOrderWeight, verifyWeight, verifyDayType, verifyTimeOfDay, getPromiseParams, caseIterator, calculatePromiseMin, calculatePromiseMax
}