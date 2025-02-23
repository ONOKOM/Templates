const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');

const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: ['HR-1-ZB-S'],
    model: 'HR-1-ZB-S',
    vendor: 'ONOKOM',
    description: 'Zigbee кондиционер ONOKOM',
    ota: require('zigbee-herdsman-converters/lib/ota'),

    fromZigbee: [
        {
            cluster: 'hvacThermostat',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                const result = {};
                const data = msg.data;

                if ('localTemperature' in data) {
                    result.current_temperature = data.localTemperature / 100;
                }
                if ('occupiedCoolingSetpoint' in data) {
                    result.target_temperature = data.occupiedCoolingSetpoint / 100;
                }
                if ('systemMode' in data) {
                    result.system_mode = data.systemMode;
                }

                return result;
            },
        },
        {
            cluster: 'hvacFanCtrl',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => ({
                fan_speed: msg.data.fanMode,
            }),
        },
        {
            cluster: 'genOnOff',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => ({
                state: msg.data.onOff === 1 ? 'ON' : 'OFF',
            }),
        },
    ],

    toZigbee: [
        {
            key: ['target_temperature'],
            convertSet: async (entity, key, value, meta) => {
                await entity.write('hvacThermostat', {
                    occupiedCoolingSetpoint: Math.round(value * 100),
                });
                return { state: { target_temperature: value } };
            },
        },
        {
            key: ['system_mode'],
            convertSet: async (entity, key, value, meta) => {
                await entity.write('hvacThermostat', {
                    systemMode: value,
                });
                return { state: { system_mode: value } };
            },
        },
        {
            key: ['fan_speed'],
            convertSet: async (entity, key, value, meta) => {
                await entity.write('hvacFanCtrl', {
                    fanMode: value,
                });
                return { state: { fan_speed: value } };
            },
        },
        {
            key: ['state'],
            convertSet: async (entity, key, value, meta) => {
                const action = value.toLowerCase() === 'on' ? 'on' : 'off';
                await entity.command('genOnOff', action, {}, meta);
                return { state: value.toUpperCase() };
            },
        },
    ],

    exposes: [
        e.switch().withState('state', true, 'Включение/выключение устройства'),
        e.temperature().withDescription('Текущая температура'),
        e.numeric('target_temperature', ea.ALL)
            .withUnit('°C')
            .withValueMin(16)
            .withValueMax(30)
            .withValueStep(1)
            .withDescription('Целевая температура'),
        e.enum('system_mode', ea.ALL, ['off', 'auto', 'cool', 'heat', 'fan_only', 'dry'])
            .withDescription('Режим работы системы'),
        e.numeric('fan_speed', ea.ALL)
            .withValueMin(0)
            .withValueMax(4)
            .withDescription('Скорость вентилятора'),
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
    },
};

module.exports = definition;
