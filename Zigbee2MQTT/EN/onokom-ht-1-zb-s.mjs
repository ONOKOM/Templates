
import {Zcl} from "zigbee-herdsman";
import * as m from 'zigbee-herdsman-converters/lib/modernExtend';
import * as reporting from 'zigbee-herdsman-converters/lib/reporting';

const manufacturerCode = 0x4703;
 export default {
        zigbeeModel: ["HT-1-ZB-S"],
        model: "HT-1-ZB-S",
        vendor: "ONOKOM",
        description: "ONOKOM AIR HT-1-MB-B (Adapter for household Hitachi systems)",
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
                valueMax: 32,
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
                name: "ZB Fan speed",
                cluster: "hvacFanCtrl",
                attribute: "fanMode",
                valueMin: 1,
                valueMax: 3,
                valueStep: 1,
                description: "Fan speed modes: Auto(5), Low(1), Medium(2), Maximum(3)",
            }),
            m.numeric({
                name: "Fan speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4700, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 3,
                valueStep: 1,
                description: "Fan speed: Auto(0), First(1) - Maximum(3)",
                zigbeeCommandOptions: {manufacturerCode},
            }),
            m.numeric({
                name: "Smart fan speed",
                cluster: "hvacFanCtrl",
                attribute: {ID: 0x4701, type: Zcl.DataType.ENUM8},
                valueMin: 0,
                valueMax: 4,
                valueStep: 1,
                description: "Smart fan speed: Auto (0), Low (1) ... Maximum (3)",
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