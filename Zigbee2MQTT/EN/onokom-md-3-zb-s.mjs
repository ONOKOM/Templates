
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
                externalAirTemperature: {name: "externalAirTemperature", ID: 0x4751, type: Zcl.DataType.INT16, write: true},
                horizontalVanes: {name: "horizontalVanes", ID: 0x4700, type: Zcl.DataType.ENUM8, write: true},
                vanesSwing: {name: "vanesSwing", ID: 0x4702, type: Zcl.DataType.ENUM8, write: true},
                ecoMode: {name: "ecoMode", ID: 0x4727, type: Zcl.DataType.BOOLEAN, write: true},
                statusLed: {name: "statusLed", ID: 0x4704, type: Zcl.DataType.ENUM8, write: true},
                indoorHeatExchangerTemperature: {name: "indoorHeatExchangerTemperature", ID: 0x4740, type: Zcl.DataType.UINT16},
                outdoorHeatExchangerTemperature: {name: "outdoorHeatExchangerTemperature", ID: 0x4741, type: Zcl.DataType.UINT16},
                acConnected: {name: "acConnected", ID: 0x4734, type: Zcl.DataType.ENUM8},
                externalTemperatureSensorValidityPeriod: {name: "externalTemperatureSensorValidityPeriod", ID: 0x4752, type: Zcl.DataType.UINT16, write: true},
                allowTheUseOfAnExternalTemperatureSensor: {name: "allowTheUseOfAnExternalTemperatureSensor", ID: 0x4750, type: Zcl.DataType.ENUM8, write: true}
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
                    disconnected: 0,
                    invalid_data_recieved: 1,
                    connected_with_issues: 2,
                    connected: 3
                },
                description: "AC connected",
                access: "STATE",
            
                ...args}),
    onOff: (args = {}) => m.onOff({
                powerOnBehavior: false,
                description: "On/off state",
            
                ...args}),
    currentTemperature: (args = {}) => m.numeric({
                name: "current_temperature",
                cluster: "hvacThermostat",
                attribute: "localTemp",
                scale: 100,
                unit: "°C",
                description: "Indoor air temperature",
                access: "STATE",
            
                ...args}),
    targetTemperature: (args = {}) => m.numeric({
                name: "target_temperature",
                cluster: "hvacThermostat",
                attribute: "occupiedCoolingSetpoint",
                valueMin: 16,
                valueMax: 30,
                valueStep: 1,
                scale: 100,
                unit: "°C",
                description: "Target temperature",
            
                ...args}),
    systemMode: (args = {}) => m.enumLookup({
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
            
                ...args}),
    mode: (args = {}) => m.enumLookup({
                name: "mode",
                cluster: "hvacThermostat",
                attribute: "mode",
                lookup: {
                    heat: 1,
                    cool: 2,
                    auto: 3,
                    dry: 4,
                    fan_only: 5
                },
                description: "Mode",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    allowExternalTemperatureSensor: (args = {}) => m.enumLookup({
                name: "allow_the_use_of_an_external_temperature_sensor",
                cluster: "hvacThermostat",
                attribute: "allowTheUseOfAnExternalTemperatureSensor",
                lookup: {
                    No: 0,
                    Yes: 1
                },
                description: "Allow the use of an external temperature sensor",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    externalAirTemperature: (args = {}) => m.numeric({
                    name: "external_air_temperature",
                    attribute: "externalAirTemperature",
                    cluster: "hvacThermostat",
                    valueMin: -50,
                    valueMax: 50,
                    valueStep: 1,
                    scale: 100,
                    unit: "°C",
                    description: "External air temperature",
                    zigbeeCommandOptions: {manufacturerCode},
                
                ...args}),
    externalTemperatureSensorValidityPeriod: (args = {}) => m.numeric({
                    name: "external_temperature_sensor_validity_period",
                    attribute: "externalTemperatureSensorValidityPeriod",
                    cluster: "hvacThermostat",
                    valueMin: 0,
                    valueMax: 100,
                    valueStep: 1,
                    description: "External temperature sensor validity period",
                    zigbeeCommandOptions: {manufacturerCode},
                
                ...args}),
    zbFanSpeed: (args = {}) => m.numeric({
                name: "zb_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanMode",
                valueMin: 1,
                valueMax: 5,
                valueStep: 1,
                description: "Fan speed modes: Auto(5), Low(1), Medium(2), Maximum(3)",
            
                ...args}),
    horizontalVanes: (args = {}) => m.numeric({
                name: "horizontal_vanes",
                cluster: "hvacThermostat",
                attribute: "horizontalVanes",
                valueMin: 0,
                valueMax: 1,
                valueStep: 1,
                description: "Horizontal vanes: Stopped(0), Swing(1)",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    fanSpeed: (args = {}) => m.numeric({
                name: "fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanSpeed",
                valueMin: 0,
                valueMax: 3,
                valueStep: 1,
                description: "Fan speed: Auto(0), First(1) - Maximum(3)",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    smartFanSpeed: (args = {}) => m.numeric({
                name: "smart_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "smartFanSpeed",
                valueMin: 0,
                valueMax: 4,
                valueStep: 1,
                description: "Smart fan speed: Auto (0), Low (1) ... Maximum (3)",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    vanesSwing: (args = {}) => m.numeric({
                name: "vanes_swing",
                cluster: "hvacThermostat",
                attribute: "vanesSwing",
                valueMin: 0,
                valueMax: 2,
                valueStep: 2,
                description: "Vanes swing: Stopped(0), Horizontal and vertical swing(1), Horizontal swing(2), Vertical swing(3)",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    statusLed: (args = {}) => m.enumLookup({
                name: "status_led",
                cluster: "hvacThermostat",
                attribute: "statusLed",
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
            
                ...args}),
    ecoMode: (args = {}) => m.binary({
                name: "eco_mode",
                cluster: "hvacThermostat",
                attribute: "ecoMode",
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Eco mode",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    indoorHeatExchangerTemperature: (args = {}) => m.numeric({
                name: "indoor_heat_exchanger_temperature",
                cluster: "hvacThermostat",
                attribute: "indoorHeatExchangerTemperature",                
                access: "STATE",                
                valueMin: 0,
                valueMax: 100,
                valueStep: 1,
                unit: "°C",
                description: "Indoor heat exchanger temperature",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
    outdoorHeatExchangerTemperature: (args = {}) => m.numeric({
                name: "outdoor_heat_exchanger_temperature",
                cluster: "hvacThermostat",
                attribute: "outdoorHeatExchangerTemperature",                
                access: "STATE",                
                valueMin: 0,
                valueMax: 100,
                valueStep: 1,
                unit: "°C",
                description: "Outdoor heat exchanger temperature",
                zigbeeCommandOptions: {manufacturerCode},
            
                ...args}),
};
 export default {
        zigbeeModel: ["MD-3-ZB-S"],
        model: "MD-3-ZB-S",
        vendor: "ONOKOM",
        description: "Adapter for semi-industrial MDV systems",
        ota: true,
        extend: [
            onokomExtend.onokomHvacThermostatCluster(),
            onokomExtend.onokomHvacFanCtrlCluster(),
            onokomExtend.acConnected({name: "ac_connected",
                cluster: "hvacThermostat",
                attribute: "acConnected",
                lookup: {
                    disconnected: 0,
                    invalid_data_recieved: 1,
                    connected_with_issues: 2,
                    connected: 3
                },
                description: "AC connected",
                access: "STATE",}),
            onokomExtend.onOff({powerOnBehavior: false,
                description: "On/off state",}),
            onokomExtend.currentTemperature({name: "current_temperature",
                cluster: "hvacThermostat",
                attribute: "localTemp",
                scale: 100,
                unit: "°C",
                description: "Indoor air temperature",
                access: "STATE",}),
            onokomExtend.targetTemperature({name: "target_temperature",
                cluster: "hvacThermostat",
                attribute: "occupiedCoolingSetpoint",
                valueMin: 16,
                valueMax: 30,
                valueStep: 1,
                scale: 100,
                unit: "°C",
                description: "Target temperature",}),
            onokomExtend.systemMode({name: "system_mode",
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
                description: "Active mode",}),
            onokomExtend.mode({name: "mode",
                cluster: "hvacThermostat",
                attribute: "mode",
                lookup: {
                    heat: 1,
                    cool: 2,
                    auto: 3,
                    dry: 4,
                    fan_only: 5
                },
                description: "Mode",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.allowExternalTemperatureSensor({name: "allow_the_use_of_an_external_temperature_sensor",
                cluster: "hvacThermostat",
                attribute: "allowTheUseOfAnExternalTemperatureSensor",
                lookup: {
                    No: 0,
                    Yes: 1
                },
                description: "Allow the use of an external temperature sensor",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.externalAirTemperature({name: "external_air_temperature",
                    attribute: "externalAirTemperature",
                    cluster: "hvacThermostat",
                    valueMin: -50,
                    valueMax: 50,
                    valueStep: 1,
                    scale: 100,
                    unit: "°C",
                    description: "External air temperature",
                    zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.externalTemperatureSensorValidityPeriod({name: "external_temperature_sensor_validity_period",
                    attribute: "externalTemperatureSensorValidityPeriod",
                    cluster: "hvacThermostat",
                    valueMin: 0,
                    valueMax: 100,
                    valueStep: 1,
                    description: "External temperature sensor validity period",
                    zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.zbFanSpeed({name: "zb_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanMode",
                valueMin: 1,
                valueMax: 5,
                valueStep: 1,
                description: "Fan speed modes: Auto(5), Low(1), Medium(2), Maximum(3)",}),
            onokomExtend.horizontalVanes({name: "horizontal_vanes",
                cluster: "hvacThermostat",
                attribute: "horizontalVanes",
                valueMin: 0,
                valueMax: 1,
                valueStep: 1,
                description: "Horizontal vanes: Stopped(0), Swing(1)",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.fanSpeed({name: "fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "fanSpeed",
                valueMin: 0,
                valueMax: 3,
                valueStep: 1,
                description: "Fan speed: Auto(0), First(1) - Maximum(3)",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.smartFanSpeed({name: "smart_fan_speed",
                cluster: "hvacFanCtrl",
                attribute: "smartFanSpeed",
                valueMin: 0,
                valueMax: 4,
                valueStep: 1,
                description: "Smart fan speed: Auto (0), Low (1) ... Maximum (3)",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.vanesSwing({name: "vanes_swing",
                cluster: "hvacThermostat",
                attribute: "vanesSwing",
                valueMin: 0,
                valueMax: 2,
                valueStep: 2,
                description: "Vanes swing: Stopped(0), Horizontal and vertical swing(1), Horizontal swing(2), Vertical swing(3)",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.statusLed({name: "status_led",
                cluster: "hvacThermostat",
                attribute: "statusLed",
                lookup: {
                    normal_mode: 0,
                    disabled_if_no_errors: 1,
                    disabled_untill_reboot: 2,
                    always_disabled: 3,
                    green_untill_reboot: 8,
                    red_untill_reboot: 9
                },
                description: "Status LED",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.ecoMode({name: "eco_mode",
                cluster: "hvacThermostat",
                attribute: "ecoMode",
                valueOn: ["ON", 1],
                valueOff: ["OFF", 0],
                description: "Eco mode",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.indoorHeatExchangerTemperature({name: "indoor_heat_exchanger_temperature",
                cluster: "hvacThermostat",
                attribute: "indoorHeatExchangerTemperature",                
                access: "STATE",                
                valueMin: 0,
                valueMax: 100,
                valueStep: 1,
                unit: "°C",
                description: "Indoor heat exchanger temperature",
                zigbeeCommandOptions: {manufacturerCode},}),
            onokomExtend.outdoorHeatExchangerTemperature({name: "outdoor_heat_exchanger_temperature",
                cluster: "hvacThermostat",
                attribute: "outdoorHeatExchangerTemperature",                
                access: "STATE",                
                valueMin: 0,
                valueMax: 100,
                valueStep: 1,
                unit: "°C",
                description: "Outdoor heat exchanger temperature",
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