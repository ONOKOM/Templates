
import {Zcl} from "zigbee-herdsman";
import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as reporting from 'zigbee-herdsman-converters/lib/reporting';

const manufacturerCode = 0x4703;
const onokomExtend = {
    onokomHvacThermostatCluster: () => m.deviceAddCustomCluster("hvacThermostat", {
            name: "hvacThermostat",
            ID: Zcl.Clusters.hvacThermostat.ID,
            attributes: {
                mode: {name: "mode", ID: 0x4703, type: Zcl.DataType.ENUM8, write: true},
                statusLed: {name: "statusLed", ID: 0x4704, type: Zcl.DataType.ENUM8, write: true},
                acConnected: {name: "acConnected", ID: 0x4734, type: Zcl.DataType.ENUM8}
            },
            commands: {},
            commandsResponse: {},
        }),
    onokomHvacFanCtrlCluster: () => m.deviceAddCustomCluster("hvacFanCtrl", {
            name: "hvacFanCtrl",
            ID: Zcl.Clusters.hvacFanCtrl.ID,
            attributes: {
                fanSpeed: {name: "fanSpeed", ID: 0x4700, type: Zcl.DataType.ENUM8, write: true},
                smartFanSpeed: {name: "smartFanSpeed", ID: 0x4701, type: Zcl.DataType.ENUM8, write: true}
            },
            commands: {},
            commandsResponse: {},
        }),
    acConnected: (args = {}) => m.enumLookup({
                name: "ac_connected",
                cluster: "hvacThermostat",
                attribute: "acConnected",
                lookup: {
                    не_подключено: 0,
                    получены_некорректные_данные: 1,
                    подключено_с_ошибками: 2,
                    подключено: 3
                },
                description: "Кондиционер подключен",
                access: "STATE",
            
                ...args}),
    onOff: (args = {}) => m.onOff({
                powerOnBehavior: false,
                description: "Включение/выключение устройства",
            
                ...args}),
    currentTemperature: (args = {}) => m.numeric({
                name: "current_temperature",
                cluster: "hvacThermostat",
                attribute: "localTemp",
                scale: 100,
                unit: "°C",
                description: "Температура воздуха в помещении",
                access: "STATE",
            
                ...args}),
    targetTemperature: (args = {}) => m.numeric({
                name: "target_temperature",
                cluster: "hvacThermostat",
                attribute: "occupiedCoolingSetpoint",
                valueMin: 16,
                valueMax: 32,
                valueStep: 1,
                scale: 100,
                unit: "°C",
                description: "Целевая температура",
            
                ...args}),
    systemMode: (args = {}) => m.enumLookup({
                name: "system_mode",
                cluster: "hvacThermostat",
                attribute: "systemMode",
                lookup: {
                    выключен: 0,
                    авто: 1,
                    охлаждение: 3,
                    нагрев: 4,
                    вентиляция: 7,
                    осушение: 8
                },
                description: "Состояние и режим",
            
                ...args}),
    mode: (args = {}) => m.enumLookup({
                name: "mode",
                cluster: "hvacThermostat",
                attribute: "mode",
                lookup: {
                    нагрев: 1,
                    охлаждение: 2,
                    авто: 3,
                    осушение: 4,
                    вентиляция: 5
                },
                description: "Режим",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    zbFanSpeed: (args = {}) => m.numeric({
                name: "zb_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanMode",
                valueMin: 1,
                valueMax: 5,
                valueStep: 1,
                description: "Стандартная скорость вентилятора: Авто(5), Минимальная(1), Средняя(2), Максимальная(3)",
            
                ...args}),
    fanSpeed: (args = {}) => m.numeric({
                name: "fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanSpeed",
                valueMin: 0,
                valueMax: 3,
                valueStep: 1,
                description: "Скорость вентилятора: Авто(0), Первая(1) - Максимальная(3)",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    smartFanSpeed: (args = {}) => m.numeric({
                name: "smart_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "smartFanSpeed",
                valueMin: 0,
                valueMax: 4,
                valueStep: 1,
                description: "Расширенная скорость вентилятора: Авто (0), Первая (1) ... Максимальная (3)",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    statusLed: (args = {}) => m.enumLookup({
                name: "status_led",
                cluster: "hvacThermostat",
                attribute: "statusLed",
                lookup: {
                    обычный_режим: 0,
                    отключен_если_нет_ошибок: 1,
                    отключен_до_перезагрузки: 2,
                    всегда_отключен: 3,
                    зеленый_до_перезагрузки: 8,
                    красный_до_перезагрузки: 9
                },
                description: "Индикатор состояния",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
};
 export default {
        zigbeeModel: ["OK-AC-H-HT-1-ZB-S-A"],
        model: "OK-AC-H-HT-1-ZB-S-A",
        vendor: "ONOKOM",
        description: "Адаптер для бытовых систем Hitachi",
        ota: true,
        extend: [
            onokomExtend.onokomHvacThermostatCluster(),
            onokomExtend.onokomHvacFanCtrlCluster(),
            onokomExtend.acConnected({name: "ac_connected",
                cluster: "hvacThermostat",
                attribute: "acConnected",
                lookup: {
                    не_подключено: 0,
                    получены_некорректные_данные: 1,
                    подключено_с_ошибками: 2,
                    подключено: 3
                },
                description: "Кондиционер подключен",
                access: "STATE",}),
            onokomExtend.onOff({powerOnBehavior: false,
                description: "Включение/выключение устройства",}),
            onokomExtend.currentTemperature({name: "current_temperature",
                cluster: "hvacThermostat",
                attribute: "localTemp",
                scale: 100,
                unit: "°C",
                description: "Температура воздуха в помещении",
                access: "STATE",}),
            onokomExtend.targetTemperature({name: "target_temperature",
                cluster: "hvacThermostat",
                attribute: "occupiedCoolingSetpoint",
                valueMin: 16,
                valueMax: 32,
                valueStep: 1,
                scale: 100,
                unit: "°C",
                description: "Целевая температура",}),
            onokomExtend.systemMode({name: "system_mode",
                cluster: "hvacThermostat",
                attribute: "systemMode",
                lookup: {
                    выключен: 0,
                    авто: 1,
                    охлаждение: 3,
                    нагрев: 4,
                    вентиляция: 7,
                    осушение: 8
                },
                description: "Состояние и режим",}),
            onokomExtend.mode({name: "mode",
                cluster: "hvacThermostat",
                attribute: "mode",
                lookup: {
                    нагрев: 1,
                    охлаждение: 2,
                    авто: 3,
                    осушение: 4,
                    вентиляция: 5
                },
                description: "Режим",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.zbFanSpeed({name: "zb_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanMode",
                valueMin: 1,
                valueMax: 5,
                valueStep: 1,
                description: "Стандартная скорость вентилятора: Авто(5), Минимальная(1), Средняя(2), Максимальная(3)",}),
            onokomExtend.fanSpeed({name: "fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanSpeed",
                valueMin: 0,
                valueMax: 3,
                valueStep: 1,
                description: "Скорость вентилятора: Авто(0), Первая(1) - Максимальная(3)",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.smartFanSpeed({name: "smart_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "smartFanSpeed",
                valueMin: 0,
                valueMax: 4,
                valueStep: 1,
                description: "Расширенная скорость вентилятора: Авто (0), Первая (1) ... Максимальная (3)",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.statusLed({name: "status_led",
                cluster: "hvacThermostat",
                attribute: "statusLed",
                lookup: {
                    обычный_режим: 0,
                    отключен_если_нет_ошибок: 1,
                    отключен_до_перезагрузки: 2,
                    всегда_отключен: 3,
                    зеленый_до_перезагрузки: 8,
                    красный_до_перезагрузки: 9
                },
                description: "Индикатор состояния",
                zigbeeCommandOptions: {manufacturerCode},})
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