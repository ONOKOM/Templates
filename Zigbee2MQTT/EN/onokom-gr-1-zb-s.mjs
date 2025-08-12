
import {Zcl} from "zigbee-herdsman";
import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as reporting from 'zigbee-herdsman-converters/lib/reporting';

const manufacturerCode = 0x4703;
 export default {
        zigbeeModel: ["GR-1-ZB-S"],
        model: "GR-1-ZB-S",
        vendor: "ONOKOM",
        description: "ONOKOM AIR GR-1-MB-B (Adapter for household GREE systems)",
        ota: true,
        extend: [
            m.enumLookup({
                name: "AC connected",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4734, type: Zcl.DataType.ENUM8},
                lookup: {
                    Disconnected: 0,
                    "Invalid data recieved": 1,
                    "Connected with issues": 2,
                    Connected: 3,
                },
                description: "AC connected",
                access: "STATE",
            }),
            m.onOff({
                powerOnBehavior: false,
                description: "On/off state",
            }),
            m.numeric({
                name: "Current temperature",
                cluster: "hvacThermostat",
                attribute: "localTemp",
                scale: 100,
                unit: "°C",
                description: "Current temperature",
                access: "STATE",
            }),
            m.numeric({
                name: "Target temperature",
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
                name: "System mode",
                cluster: "hvacThermostat",
                attribute: "systemMode",
                lookup: {
                    off: 0,
                    auto: 1,
                    cool: 3,
                    heat: 4,
                    fan_only: 7,
                    dry: 8,
                },
                description: "System mode",
            }),
            m.numeric({
                name: "Outdoor air temperature",
                cluster: "hvacThermostat",
                attribute: "outdoorTemp",
                scale: 100,
                unit: "°C",
                description: "Outdoor air temperature",
                access: "STATE",
            }),
            m.numeric({
                name: "ZB Fan speed",
                cluster: "hvacFanCtrl",
                attribute: "fanMode",
                valueMin: 1,
                valueMax: 5,
                valueStep: 1,
                description: "Fan speed modes: Auto(5), Low(1), Medium(2), Maximum(3)",
            }),
            m.numeric({
                name: "Vertical vanes",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 6,
                valueStep: 1,
                description: "Vertical vanes: Stopped(0), Swing(1), Leftmost position(2), Rightmost position(6)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "Horizontal vanes",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 6,
                valueStep: 1,
                description: "Horizontal vanes: Stopped(0), Swing(1), Lowest postion(2), Highest position(6)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "Fan speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 5,
                valueStep: 1,
                description: "Fan speed: Auto(0), First(1) - Maximum(5)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "Smart fan speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 7,
                valueStep: 1,
                description: "Smart fan speed: Auto (0), Quiet mode (1), First (2) ... Maximum (6), Turbo(7)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "Vanes swing",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4702, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 1,
                valueStep: 1,
                description: "Vanes swing: Stopped0), Horizontal and vertical swing(1), Horizontal swing(2), Vertical swing(3)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "Quiet mode",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4710, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Quiet mode",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "Eco mode",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4727, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Eco mode",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "Turbo mode",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4711, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Turbo mode",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "Sleep mode",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4728, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Sleep mode",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "Ionization",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4720, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Ionization",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "Screen light",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4731, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Screen light",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.binary({
                name: "Disable screen when power off",
                cluster: "hvacThermostat",
                attribute: {ID: 0x4732, type: Zcl.DataType.BOOLEAN},
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Disable screen when power off",
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