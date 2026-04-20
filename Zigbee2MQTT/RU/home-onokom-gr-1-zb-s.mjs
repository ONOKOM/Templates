
import {Zcl} from "zigbee-herdsman";
import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as reporting from 'zigbee-herdsman-converters/lib/reporting';

const manufacturerCode = 0x4703;
 export default {
        zigbeeModel: ["OK-AC-H-GR-1-ZB-S-A"],
        model: "OK-AC-H-GR-1-ZB-S-A",
        vendor: "ONOKOM",
        description: "Адаптер для бытовых систем GREE",
        ota: true,
        extend: [
            m.enumLookup({
                name: "ac_connected",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4734, type: Zcl.DataType.ENUM8},
                lookup: {
                    disconnected: 0,
                    invalid_data_recieved: 1,
                    connected_with_issues: 2,
                    connected: 3
                },
                description: "Кондиционер подключен",
                access: "STATE",
            }),
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
                description: "Температура воздуха в помещении",
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
                    off: 0,
                    auto: 1,
                    cool: 3,
                    heat: 4,
                    fan_only: 7,
                    dry: 8
                },
                description: "Состояние и режим",
            }),
            m.enumLookup({
                name: "mode",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4703, type: Zcl.DataType.ENUM8},
                lookup: {
                    heat: 1,
                    cool: 2,
                    auto: 3,
                    dry: 4,
                    fan_only: 5
                },
                description: "Режим",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "outdoor_air_temperature",
                cluster: "hvacThermostat",
                attribute: "outdoorTemp",
                scale: 100,
                unit: "°C",
                description: "Температура воздуха на улице",
                access: "STATE",
            }),
            m.numeric({
                name: "zb_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanMode",
                valueMin: 1,
                valueMax: 5,
                valueStep: 1,
                description: "Стандартная скорость вентилятора: Авто(5), Минимальная(1), Средняя(2), Максимальная(3)",
            }),
            m.numeric({
                name: "vertical_vanes",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 6,
                valueStep: 1,
                description: "Положение вертикальных шторок: Остановлены(0), Качание(1), Максимально влево(2), Максимально вправо(6)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "horizontal_vanes",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 6,
                valueStep: 1,
                description: "Положение горизонтальных шторок: Остановлены(0), Качание(1), Самый низ(2), Самый верх(6)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "fan_speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 5,
                valueStep: 1,
                description: "Скорость вентилятора: Авто(0), Первая(1) - Максимальная(5)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "smart_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 7,
                valueStep: 1,
                description: "Расширенная скорость вентилятора: Авто (0), Тихий (1), Первая (2) ... Максимальная (6), Турбо(7)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "vanes_swing",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4702, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 3,
                valueStep: 1,
                description: "Качание шторок: Остановлены все(0), Качание всех(1), Качание горизонтальных(2), Качание вертикальных(3)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.enumLookup({
                name: "status_led",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4704, type: Zcl.DataType.ENUM8},
                lookup: {
                    normal_mode: 0,
                    disabled_if_no_errors: 1,
                    disabled_untill_reboot: 2,
                    always_disabled: 3,
                    green_untill_reboot: 8,
                    red_untill_reboot: 9
                },
                description: "Индикатор состояния",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "quiet_mode",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4710, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Режим тихий",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "eco_mode",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4727, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Режим эко",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "turbo_mode",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4711, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Режим турбо",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "sleep_mode",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4728, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Режим сна",
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
            m.binary({
                name: "screen_light",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4731, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Подсветка экрана",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "disable_screen_when_power_off",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4732, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Отключать экран при отключении питания",
                zigbeeCommandOptions: {manufacturerCode},
            }),
        ],
        fromZigbee: [
        {
            cluster: 'hvacThermostat',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                meta.logger.info(`Received data hvacThermostat: ${JSON.stringify(msg)}`); 
            },
        },
        {
            cluster: 'hvacFanCtrl',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                meta.logger.info(`Received data hvacFanCtrl: ${JSON.stringify(msg)}`); 
            },
        },
        {
            cluster: 'genOnOff',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                meta.logger.info(`Received data genOnOff: ${JSON.stringify(msg)}`); 
            },
        },],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["hvacThermostat", "hvacFanCtrl", "genOnOff"]);
            await reporting.thermostatTemperature(endpoint);
            await reporting.onOff(endpoint);
        }
    };