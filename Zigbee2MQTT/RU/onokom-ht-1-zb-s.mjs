
import {Zcl} from "zigbee-herdsman";
import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as reporting from 'zigbee-herdsman-converters/lib/reporting';

const manufacturerCode = 0x4703;
 export default {
        zigbeeModel: ["HT-1-ZB-S"],
        model: "HT-1-ZB-S",
        vendor: "ONOKOM",
        description: "ONOKOM AIR HT-1-MB-B (Адаптер для бытовых систем Hitachi)",
        ota: true,
        extend: [
            m.enumLookup({
            name: "AC connected",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4734, type: Zcl.DataType.ENUM8},
            lookup: {
                "Disconnected": 0,
                "Invalid data recieved": 1,
                "Connected with issues": 2,
                "Connected": 3,
            },
            description: "Связь с кондиционером",
            access: "STATE",
        }),
        m.onOff({
            powerOnBehavior: false,
            description: "Включение/выключение устройства",
        }),
        m.numeric({
            name: "Current temperature",
            cluster: "hvacThermostat",
            attribute: "localTemp",
            scale: 100,
            unit: "°C",
            description: "Текущая температура",
            access: "STATE",
        }),
        m.numeric({
            name: "Target temperature",
            cluster: "hvacThermostat",
            attribute: "occupiedCoolingSetpoint",
            valueMin: 16,
            valueMax: 32,
            valueStep: 1,
            scale: 100,
            unit: "°C",
            description: "Целевая температура",
        }),
        m.enumLookup({
            name: "System mode",
            cluster: "hvacThermostat",
            attribute: "systemMode",
            lookup: {
                "off": 0,
                "auto": 1,
                "cool": 3,
                "heat": 4,
                "fan_only": 7,
                "dry": 8,
            },
            description: "Режим работы системы",
        }),
        
        m.numeric({
            name: "ZB Fan speed",
            cluster: "hvacFanCtrl",
            attribute: "fanMode",
            valueMin: 1,
            valueMax: 3,
            valueStep: 1,
            description: "Стандартная скорость вентилятора: Авто(5), Минимальная(1), Средняя(2), Максимальная(3)",
        }),
        m.numeric({
            name: "Fan speed",
            cluster: "hvacFanCtrl",
            attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 3,
            valueStep: 1,
            description: "Скорость вентилятора: Авто(0), Первая(1) - Максимальная(3)",
            zigbeeCommandOptions: {manufacturerCode},
            }),
        m.numeric({
            name: "Smart fan speed",
            cluster: "hvacFanCtrl",
            attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 4,
            valueStep: 1,
            description: "Расширенная скорость вентилятора: Авто (0), Первая (1) ... Максимальная (3)",
            zigbeeCommandOptions: {manufacturerCode},
            }),
        ],
        fromZigbee: [
        {
            cluster: 'hvacThermostat',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                meta.logger.info(`Received data hvacThermostat: ${JSON.stringify(msg)}`); // Логируем полученные данные
            },
        },
        {
            cluster: 'hvacFanCtrl',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                meta.logger.info(`Received data hvacFanCtrl: ${JSON.stringify(msg)}`); // Логируем полученные данные
            },
        },
        {
            cluster: 'genOnOff',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                meta.logger.info(`Received data genOnOff: ${JSON.stringify(msg)}`); // Логируем полученные данные
            },
        },],
        configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ['hvacThermostat', 'hvacFanCtrl', 'genOnOff']);
        await reporting.thermostatTemperature(endpoint);
        await reporting.onOff(endpoint);
    },
};