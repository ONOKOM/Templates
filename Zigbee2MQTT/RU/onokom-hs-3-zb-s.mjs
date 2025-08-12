
import {Zcl} from "zigbee-herdsman";
import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as reporting from 'zigbee-herdsman-converters/lib/reporting';

const manufacturerCode = 0x4703;
 export default {
        zigbeeModel: ["HS-3-ZB-S"],
        model: "HS-3-ZB-S",
        vendor: "ONOKOM",
        description: "ONOKOM AIR HS-3-MB-B (Адаптер для бытовых систем Hisense)",
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
            name: "Outdoor temperature",
            cluster: "hvacThermostat",
            attribute: "outdoorTemp",
            scale: 100,
            unit: "°C",
            description: "Температура на улице",
            access: "STATE",
        }),
        m.numeric({
            name: "ZB Fan speed",
            cluster: "hvacFanCtrl",
            attribute: "fanMode",
            valueMin: 1,
            valueMax: 5,
            valueStep: 1,
            description: "Стандартная скорость вентилятора: Авто(5), Минимальная(1), Средняя(2), Максимальная(3)",
        }),
        m.numeric({
            name: "Vertical vanes",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 4,
            valueStep: 1,
            description: "Положение вертикальных шторок: Остановлены(0), Качание(1), Максимально влево(2), Максимально вправо(4)",
            zigbeeCommandOptions: {manufacturerCode},
            }),
        m.numeric({
            name: "Horizontal vanes",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 7,
            valueStep: 1,
            description: "Положение горизонтальных шторок: Остановлены(0), Качание(1), Самый низ(2), Самый верх(7)",
            zigbeeCommandOptions: {manufacturerCode},
            }),
        m.numeric({
            name: "Fan speed",
            cluster: "hvacFanCtrl",
            attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 5,
            valueStep: 1,
            description: "Скорость вентилятора: Авто(0), Первая(1) - Максимальная(5)",
            zigbeeCommandOptions: {manufacturerCode},
            }),
        m.numeric({
            name: "Smart fan speed",
            cluster: "hvacFanCtrl",
            attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 7,
            valueStep: 1,
            description: "Расширенная скорость вентилятора: Авто (0), Тихий (1), Первая (2) ... Максимальная (6), Турбо(7)",
            zigbeeCommandOptions: {manufacturerCode},
            }),
        m.numeric({
            name: "Vanes swing",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4702, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 1,
            valueStep: 1,
            description: "Качание шторок: Остановлены все(0), Качание всех(1), Качание горизонтальных(2), Качание вертикальных(3)",
            zigbeeCommandOptions: {manufacturerCode},
        }),m.binary({
            name: "Quiet mode",
            cluster: "hvacFanCtrl",
            attribute: {ID: 0x4710, type: Zcl.DataType.BOOLEAN},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Режим тихий",
            zigbeeCommandOptions: {manufacturerCode},
        }),m.binary({
            name: "Eco mode",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4727, type: Zcl.DataType.BOOLEAN},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Режим эко",
            zigbeeCommandOptions: {manufacturerCode},
        }),m.binary({
            name: "Turbo mode",
            cluster: "hvacFanCtrl",
            attribute: {ID: 0x4711, type: Zcl.DataType.BOOLEAN},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Режим турбо",
            zigbeeCommandOptions: {manufacturerCode},
        }),m.binary({
            name: "Sleep mode",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4728, type: Zcl.DataType.BOOLEAN},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Режим сна",
            zigbeeCommandOptions: {manufacturerCode},
        }),m.binary({
            name: "Smart sleep mode",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4736, type: Zcl.DataType.ENUM8},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Умный режим сна",
            zigbeeCommandOptions: {manufacturerCode},
        }),m.binary({
            name: "Ionization",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4720, type: Zcl.DataType.BOOLEAN},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Ионизация",
            zigbeeCommandOptions: {manufacturerCode},
        }),m.binary({
            name: "Smart eye",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4735, type: Zcl.DataType.ENUM8},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Умный глаз",
            zigbeeCommandOptions: {manufacturerCode},
        }),m.binary({
            name: "Screen light",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4731, type: Zcl.DataType.BOOLEAN},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Подсветка экрана",
            zigbeeCommandOptions: {manufacturerCode},
        }),m.binary({
            name: "Beeper",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4730, type: Zcl.DataType.BOOLEAN},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Звуковая индикация",
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