
import {Zcl} from "zigbee-herdsman";
import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as reporting from 'zigbee-herdsman-converters/lib/reporting';

const manufacturerCode = 0x4703;
 export default {
        zigbeeModel: ["MD-1-ZB-S"],
        model: "MD-1-ZB-S",
        vendor: "ONOKOM",
        description: "AIR MD-1-ZB-S (Adapter for household MDV systems)",
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
                valueStep: 0.5,
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
                name: "outdoor_air_temperature",
                cluster: "hvacThermostat",
                attribute: "outdoorTemp",
                scale: 100,
                unit: "°C",
                description: "Outdoor air temperature",
                access: "STATE",
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
                name: "vertical_vanes",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 7,
                valueStep: 1,
                description: "Vertical vanes: Stopped(0), Swing(1), Leftmost position(2), Rightmost position(7)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "horizontal_vanes",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 7,
                valueStep: 1,
                description: "Horizontal vanes: Stopped(0), Swing(1), Lowest postion(2), Highest position(7)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "fan_speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 5,
                valueStep: 1,
                description: "Fan speed: Auto(0), First(1) - Maximum(5)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "smart_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 7,
                valueStep: 1,
                description: "Smart fan speed: Auto (0), Quiet mode (1), First (2) ... Maximum (6), Turbo(7)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "vanes_swing",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4702, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 3,
                valueStep: 1,
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
                name: "quiet_mode",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4710, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Quiet mode",
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
            m.binary({
                name: "turbo_mode",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4711, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Turbo mode",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "self_cleaning",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4721, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Self cleaning",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "heating_8_deg",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4724, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Heating 8 deg",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "gentle_wind",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4725, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Gentle wind",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "target_fan_rpm",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4723, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 100,
                valueStep: 1,
                description: "Target fan speed",
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