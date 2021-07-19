const store = require("store2");

const {
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
} = require("../models/orders.models");

module.exports = {
  getOrders: async (req, res) => {
    try {
      const orders = store.getAll();
      if (orders.data) {
        return res.status(200).json(orders.data);
      } else {
        return res.status(200).json([]);
      }
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  getOrder: async (req, res) => {
    try {
      const { key } = req.params;
      const orders = store.getAll();
      const order = orders.data.find(
        (order) => order.internalOrderNumber == key
      );
      return res.status(200).json(order);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  addOrder: async (req, res) => {
    try {
      let orderData = req.body;
      const rules = await orderRules(orderData.shippingMethod);
      const offDays = await ordersOffDays();
      const nowDataTime = new Date();
      orderData.creationDataTime = createDate(nowDataTime);
      orderData.internalOrderNumber = addOrderId(nowDataTime);
      orderData.nextBusinessDays = await caseNextBusinessDay(offDays);
      const orderWeight = caseWeightOrder(orderData.items);
      const weightValidation = validateWeightOrder(
        rules.rules.availability.byWeight.min,
        rules.rules.availability.byWeight.max,
        orderWeight
      );
      if (weightValidation === true) {
        const dayTypeValidation = await validateDays(
          nowDataTime,
          offDays,
          rules.rules.availability.byRequestTime.dayType
        );
        if (dayTypeValidation === true) {
          const timeOfDay = await validateDayTime(
            nowDataTime,
            rules.rules.availability.byRequestTime.fromTimeOfDay,
            rules.rules.availability.byRequestTime.toTimeOfDay
          );
          if (timeOfDay == true) {
            let priority = 1;
            workingCase = await checkOrderId(
              priority,
              nowDataTime,
              rules,
              offDays
            );

            const packPromiseParams = validateParamsPromises(
              workingCase.packPromise
            ); //Get pack promise params
            orderData.packPromiseMin = casePromiseMin(
              nowDataTime,
              packPromiseParams.minType,
              packPromiseParams.minDeltaHours,
              orderData.nextBusinessDays,
              packPromiseParams.minDeltaBusiness,
              packPromiseParams.minTimeOfDay
            );
            orderData.packPromiseMax = casePromiseMax(
              nowDataTime,
              packPromiseParams.maxType,
              packPromiseParams.maxDeltaHours,
              orderData.nextBusinessDays,
              packPromiseParams.maxDeltaBusiness,
              packPromiseParams.maxTimeOfDay
            );
            const shipPromiseParams = validateParamsPromises(
              workingCase.shipPromise
            ); //Get ship promise params
            orderData.shipPromiseMin = casePromiseMin(
              nowDataTime,
              shipPromiseParams.minType,
              shipPromiseParams.minDeltaHours,
              orderData.nextBusinessDays,
              shipPromiseParams.minDeltaBusiness,
              shipPromiseParams.minTimeOfDay
            );
            orderData.shipPromiseMax = casePromiseMax(
              nowDataTime,
              shipPromiseParams.maxType,
              shipPromiseParams.maxDeltaHours,
              orderData.nextBusinessDays,
              shipPromiseParams.maxDeltaBusiness,
              shipPromiseParams.maxTimeOfDay
            );
            const deliveryPromiseParams = validateParamsPromises(
              workingCase.deliveryPromise
            ); //Get delivery promise params
            orderData.deliveryPromiseMin = casePromiseMin(
              nowDataTime,
              deliveryPromiseParams.minType,
              deliveryPromiseParams.minDeltaHours,
              orderData.nextBusinessDays,
              deliveryPromiseParams.minDeltaBusiness,
              deliveryPromiseParams.minTimeOfDay
            );
            orderData.deliveryPromiseMax = casePromiseMax(
              nowDataTime,
              deliveryPromiseParams.maxType,
              deliveryPromiseParams.maxDeltaHours,
              orderData.nextBusinessDays,
              deliveryPromiseParams.maxDeltaBusiness,
              deliveryPromiseParams.maxTimeOfDay
            );
            const readyPickUpPromiseParams = validateParamsPromises(
              workingCase.readyPickUpPromise
            ); //Get ready pick up promise params
            orderData.readyPickUpPromiseMin = casePromiseMin(
              nowDataTime,
              readyPickUpPromiseParams.minType,
              readyPickUpPromiseParams.minDeltaHours,
              orderData.nextBusinessDays,
              readyPickUpPromiseParams.minDeltaBusiness,
              readyPickUpPromiseParams.minTimeOfDay
            );
            orderData.readyPickUpPromiseMax = casePromiseMax(
              nowDataTime,
              readyPickUpPromiseParams.maxType,
              readyPickUpPromiseParams.maxDeltaHours,
              orderData.nextBusinessDays,
              readyPickUpPromiseParams.maxDeltaBusiness,
              readyPickUpPromiseParams.maxTimeOfDay
            );
          } else {
            orderData = promisesValidation(orderData);
          }
        } else {
          orderData = promisesValidation(orderData);
        }
      } else {
        orderData = promisesValidation(orderData);
      }
      const oldOrders = store.getAll();
      const { data } = oldOrders;
      if (data) {
        let ordersArr = [...data];
        ordersArr.push(orderData);
        store("data", ordersArr);
      } else {
        store("data", [orderData]);
      }

      return res.status(200).json(orderData);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
