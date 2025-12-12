
import {Zcl} from "zigbee-herdsman";
import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as reporting from 'zigbee-herdsman-converters/lib/reporting';

const manufacturerCode = 0x4703;
 export default {
        zigbeeModel: ["MD-3-ZB-S"],
        model: "MD-3-ZB-S",
        vendor: "ONOKOM",
        description: "AIR MD-3-ZB-S (Adapter for semi-industrial MDV systems)",
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
                description: "AC connected",
                access: "STATE",
            }),
            m.onOff({
                powerOnBehavior: false,
                description: "On/off state",
            }),
            m.numeric({
                name: "current_temperature",
                cluster: "hvacThermostat",
                attribute: "localTemp",
                scale: 100,
                unit: "°C",
                description: "Indoor air temperature",
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
                description: "Target temperature",
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
                description: "Active mode",
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
                description: "Mode",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            
            m.numeric({
                name: "zb_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanMode",
                valueMin: 1,
                valueMax: 5,
                valueStep: 1,
                description: "Fan speed modes: Auto(5), Low(1), Medium(2), Maximum(3)",
            }),
            m.numeric({
                name: "horizontal_vanes",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 1,
                valueStep: 1,
                description: "Horizontal vanes: Stopped(0), Swing(1)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "fan_speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 3,
                valueStep: 1,
                description: "Fan speed: Auto(0), First(1) - Maximum(3)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "smart_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 4,
                valueStep: 1,
                description: "Smart fan speed: Auto (0), Low (1) ... Maximum (3)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "vanes_swing",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4702, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 2,
                valueStep: 2,
                description: "Vanes swing: Stopped(0), Horizontal and vertical swing(1), Horizontal swing(2), Vertical swing(3)",
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
                description: "Status LED",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "eco_mode",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4727, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Eco mode",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "indoor_heat_exchanger_temperature",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4740, type: Zcl.DataType.UINT16},                
                access: "STATE",                
                valueMin: 0,
                valueMax: 100,
                valueStep: 1,
                unit: "°C",
                description: "Indoor heat exchanger temperature",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "outdoor_heat_exchanger_temperature",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4741, type: Zcl.DataType.UINT16},                
                access: "STATE",                
                valueMin: 0,
                valueMax: 100,
                valueStep: 1,
                unit: "°C",
                description: "Outdoor heat exchanger temperature",
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