const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');

const e = exposes.presets;
const ea = exposes.access;

const definition = {
    zigbeeModel: ['TCL-1-ZB-S'],
    model: 'TCL-1-ZB-S',
    vendor: 'ONOKOM',
    description: 'Zigbee кондиционер ONOKOM TCL',
    ota: require('zigbee-herdsman-converters/lib/ota'),

    fromZigbee: [
        {
            cluster: 'hvacThermostat',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                const result = {};
                const data = msg.data;
                meta.logger.info(`Received data hvacThermostat: ${JSON.stringify(data)}`); // Логируем полученные данные

                if ('localTemp' in data) {
                    result.current_temperature = data.localTemp / 100;
                }

                if ('18176' in data) { //vanes hor
                    result.vanes_hor = data[0x4700];
                }

                if ('18177' in data) { // vanes ver
                    result.vanes_ver = data[0x4701];
                }

                if ('18178' in data) { // air direction
                    result.air_direction = data[0x4702];
                }

                if ('18208' in data) { // ionization
                    result.ionization = !!data[0x4720];
                }


                if ('outdoorTemp' in data) {
                    result.outdoor_temperature = data.outdoorTemp / 100; // Конвертация в °C
                }

                if ('occupiedCoolingSetpoint' in data) {
                    //meta.logger.info(`Received data hvacThermostat: ${JSON.stringify(data)}`); // Логируем полученные данные.target_temperature = data.occupiedCoolingSetpoint / 100;
                }
                if ('systemMode' in data) {
                    const systemModeMap = {
                        0: 'off',
                        1: 'auto',
                        3: 'cool',
                        4: 'heat',
                        7: 'fan_only',
                        8: 'dry'
                    };

                    result.system_mode = systemModeMap[data.systemMode] || 'unknown';  // Преобразуем число в строку
                }

                if ('acLouverPosition' in data) {
                    result.ac_louver_position = data.acLouverPosition; // Добавляем обработку для acLouverPosition
                }

                return result;
            },
        },
        {
            cluster: 'hvacFanCtrl',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                const result = {};
                const data = msg.data;
                meta.logger.info(`Received data hvacFanCtrl: ${JSON.stringify(data)}`); // Логируем полученные данные

                if ('fanMode' in data){
                    result.fan_speed = data.fanMode;
                }   

                if ('18176' in data) { // fanSpeed
                    result.ok_fan_speed = data[0x4700];
                }

                if ('18177' in data) { // smartFanSpeed
                    result.ok_smart_fan_speed = data[0x4701];
                }
                return result;
            },
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
                const systemModeReverseMap = {
                    'off': 0,
                    'auto': 1,
                    'cool': 3,
                    'heat': 4,
                    'fan_only': 7,
                    'dry': 8
                };

                const modeValue = systemModeReverseMap[value];
                if (modeValue !== undefined) {
                    await entity.write('hvacThermostat', { systemMode: modeValue });
                    return { state: { system_mode: value } };
                } else {
                    meta.logger.warn(`Unsupported system_mode: ${value}`);
                    return { state: { system_mode: 'unknown' } };
                }
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
            key: ['ok_fan_speed'],
            convertSet: async (entity, key, value, meta) => {
                if (value >= 0 && value <= 7) {
                    await entity.write('hvacFanCtrl', { 0x4700: {value: value, type: 0x30}}, {manufacturerCode: 0x4703});
                    return { state: { ok_fan_speed: value } };
                } else {
                    meta.logger.warn(`Invalid ok_fan_speed value: ${value}`);
                    return { state: { ok_fan_speed: 'unknown' } };
                }
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
        {
            key: ['ac_louver_position'],
            convertSet: async (entity, key, value, meta) => {
                if (value >= 1 && value <= 5) {
                    await entity.write('hvacThermostat', { acLouverPosition: value });
                    return { state: { ac_louver_position: value } };
                } else {
                    meta.logger.warn(`Invalid acLouverPosition value: ${value}`);
                    return { state: { ac_louver_position: 'unknown' } };
                }
            },
        },
        {
            key: ['vanes_hor'],
            convertSet: async (entity, key, value, meta) => {
                if (value >= 0 && value <= 6) {
                    await entity.write('hvacThermostat', { 0x4700: {value: value, type: 0x30}}, {manufacturerCode: 0x4703});
                    return { state: { vanes_hor: value } };
                } else {
                    meta.logger.warn(`Invalid vanes_hor value: ${value}`);
                    return { state: { vanes_hor: 'unknown' } };
                }
            },
        },
        {
            key: ['vanes_ver'],
            convertSet: async (entity, key, value, meta) => {
                if (value >= 0 && value <= 6) {
                    await entity.write('hvacThermostat', { 0x4701: {value: value, type: 0x30}}, {manufacturerCode: 0x4703});
                    return { state: { vanes_ver: value } };
                } else {
                    meta.logger.warn(`Invalid vanes_ver value: ${value}`);
                    return { state: { vanes_ver: 'unknown' } };
                }
            },
        },
        {
            key: ['air_direction'],
            convertSet: async (entity, key, value, meta) => {
                if (value >= 0 && value <= 3) {
                    await entity.write('hvacThermostat', { 0x4702: {value: value, type: 0x30}}, {manufacturerCode: 0x4703});
                    return { state: { air_direction: value } };
                } else {
                    meta.logger.warn(`Invalid acLouverPosition value: ${value}`);
                    return { state: { air_direction: 'unknown' } };
                }
            },
        },
        {
            key: ['ionization'],
            convertSet: async (entity, key, value, meta) => {
                //if (value >= 0 && value <= 3) {
                    await entity.write('hvacThermostat', { 0x4720: {value: value, type: 0x10}}, {manufacturerCode: 0x4703});
                    return { state: { ionization: value } };
                //} else {
                //    meta.logger.warn(`Invalid acLouverPosition value: ${value}`);
                //    return { state: { ionization: 'unknown' } };
                //}
            },
        }
    ],

    exposes: [
        e.switch(),//.withState('state', true, 'Включение/выключение устройства'),
        e.numeric('current_temperature', ea.STATE)
        .withUnit('°C')
        .withDescription('Текущая температура'),
        e.numeric('outdoor_temperature', ea.STATE)
            .withValueMin(-40)
            .withValueMax(50)
            .withUnit('°C')
            .withDescription('Температура на улице'), // Внешняя температура
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
        e.numeric('ok_fan_speed', ea.ALL)
            .withValueMin(0)
            .withValueMax(7)
            .withDescription('Скорость вентилятора'),
        e.numeric('ok_smart_fan_speed', ea.ALL)
            .withValueMin(0)
            .withValueMax(7)
            .withDescription('Скорость вентилятора'),
        e.numeric('ac_louver_position', ea.ALL)
            .withValueMin(0)
            .withValueMax(5)
            .withValueStep(1)
            .withDescription('Положение жалюзи кондиционера (0-5)'),
        e.numeric('vanes_hor', ea.ALL)
            .withValueMin(0)
            .withValueMax(6)
            .withValueStep(1)
            .withDescription('Положение горизонтальной шторки (0-6)'),
        e.numeric('vanes_ver', ea.ALL)
            .withValueMin(0)
            .withValueMax(6)
            .withValueStep(1)
            .withDescription('Положение вертикальной шторки (0-6)'),
        e.numeric('air_direction', ea.ALL)
            .withValueMin(0)
            .withValueMax(3)
            .withValueStep(1)
            .withDescription('Направление воздуха (0-3)'),
       e.switch().withProperty('ionization')
            .withDescription('Ионизация')
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

module.exports = definition;
