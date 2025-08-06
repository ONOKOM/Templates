import {Zcl} from "zigbee-herdsman";
import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as reporting from 'zigbee-herdsman-converters/lib/reporting';

const manufacturerCode = 0x4703;

export default {
    zigbeeModel: ['MD-1-ZB-S'],
    model: 'MD-1-ZB-S',
    vendor: 'ONOKOM',
    description: 'Zigbee кондиционер ONOKOM MDV',
    ota: true,
    extend: [
        m.onOff({
            powerOnBehavior: false,
            description: "Включение/выключение устройства",
        }),
        m.numeric({
            name: "current_temperature",
            cluster: "hvacThermostat",
            attribute: "localTemp",
            scale: 100,
            unit: "°C",
            description: "Текущая температура",
            access: "STATE",
        }),
        m.numeric({
            name: "outdoor_temperature",
            cluster: "hvacThermostat",
            attribute: "outdoorTemp",
            scale: 100,
            unit: "°C",
            description: "Температура на улице",
            access: "STATE",
        }),
        m.numeric({
            name: "target_temperature",
            cluster: "hvacThermostat",
            attribute: "occupiedCoolingSetpoint",
            valueMin: 16,
            valueMax: 30,
            valueStep: 1,
            scale: 100,
            unit: "°C",
            description: "Целевая температура",
        }),
        m.enumLookup({
            name: "system_mode",
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
            name: "fan_speed",
            cluster: "hvacFanCtrl",
            attribute: "fanMode",
            valueMin: 1,
            valueMax: 5,
            valueStep: 1,
            description: "Стандартная скорость вентилятора: Авто(5), Минимальная(1), Средняя(2), Максимальная(3)",
        }),
        m.numeric({
            name: "ok_fan_speed",
            cluster: "hvacFanCtrl",
            attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 5,
            valueStep: 1,
            description: "Скорость вентилятора: Авто(0), Первая(1) - Пятая(5)",
            zigbeeCommandOptions: {manufacturerCode},
        }),
        m.numeric({
            name: "ok_smart_fan_speed",
            cluster: "hvacFanCtrl",
            attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 7,
            valueStep: 1,
            description: "Расширенная скорость вентилятора:  Авто(0), Тихий(1), Первая(2) ...  Пятая(6), Турбо(7)",
            zigbeeCommandOptions: {manufacturerCode},
        }),
        m.numeric({
            name: "ac_louver_position",
            cluster: "hvacThermostat",
            attribute: "acLouverPosition",
            valueMin: 0,
            valueMax: 5,
            valueStep: 1,
            description: "Положение жалюзи: Остановелны(0), Качание(1), Самый низ(2), Самый верх(6)",
        }),
        m.numeric({
            name: "vanes_hor",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 6,
            valueStep: 1,
            description: "Положение вертикальных шторок: Остановлены(0), Качание(1), Максимально влево(2), Максимально вправо(6)",
            zigbeeCommandOptions: {manufacturerCode},
        }),
        m.numeric({
            name: "vanes_ver",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 6,
            valueStep: 1,
            description: "Положение горизонтальных шторок: Остановлены(0), Качание(1), Самый низ(2), Самый верх(6)",
            zigbeeCommandOptions: {manufacturerCode},
        }),
        m.numeric({
            name: "air_direction",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4702, type: Zcl.DataType.ENUM8},
            valueMin: 0,
            valueMax: 3,
            valueStep: 1,
            description: "Качание шторок: Остановлены все(0), Качание всех(1), Качание горизонтальных(2), Качание вертикальных(3)",
            zigbeeCommandOptions: {manufacturerCode},
        }),
        m.binary({
            name: "ionization",
            cluster: "hvacThermostat",
            attribute: {ID: 0x4720, type: Zcl.DataType.BOOLEAN},
            valueOn: ["ON", 1],
            valueOff: ["OFF", 0],
            description: "Ионизация",
            zigbeeCommandOptions: {manufacturerCode},
        }),
    ],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, [
            'hvacThermostat',
            'hvacFanCtrl',
            'genOnOff',
        ]);
        await reporting.thermostatTemperature(endpoint);
        await reporting.onOff(endpoint);
        //await reporting.read(endpoint, 'hvacThermostat', ['acLouverPosition']);
    },
};