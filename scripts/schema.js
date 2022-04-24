import jsf from 'json-schema-faker';
import randomDate from 'random-datetime';

const schema = {
  type: 'object',
  properties: {
    schedules: {
      type: 'array',
      minItems: 15,
      items: {
        properties: {
          id: {
            $ref: '#/definitions/positiveInt',
          },
          name: {
            type: 'string',
            format: 'name',
          },
          description: {
            type: 'string',
          },
          intervalType: {
            type: 'string',
            pattern: 'Never|Once|Hour|Day|Week|Month|Year|Minute|Second',
          },
          timePeriod: {
            type: 'integer',
            minimum: 1,
            maximum: 31,
          },
          isRetired: {
            type: 'boolean',
          },
          tasksCount: {
            type: 'integer',
            minimum: 1,
            maximum: 10,
          },
          startPoint: {
            type: 'string',
            format: 'isodate',
          },
          endPoint: {
            type: 'string',
            format: 'isodate',
          },
          dayOfWeek: {
            type: 'integer',
            minimum: 1,
            maximum: 7,
          },
          dayOfMonth: {
            type: 'integer',
            minimum: 1,
            maximum: 31,
          },
          startDate: {
            type: 'string',
            format: 'isodate',
          },
          endDate: {
            type: 'string',
            format: 'isodate',
          },
        },
        required: ['id', 'name', 'description', 'isRetired', 'tasksCount', 'startPoint', 'endPoint', 'dayOfWeek', 'dayOfMonth', 'startDate', 'endDate'],
      },
    },
    scheduleLogs: {
      type: 'array',
      minItems: 150,
      items: {
        id: {
          $ref: '#/definitions/positiveInt',
        },
        startTime: {
          type: 'string',
          format: 'isodate',
        },
        endTime: {
          type: 'string',
          format: 'isodate',
        },
        status: {
          type: 'string',
          pattern:'Pending|Running|Terminated|Completed|Exception',
        },
        serverName: {
          type: 'string',
        },
        scheduleId: {
          type: 'integer',
        }
      },
      required: ['id', 'startTime', 'endTime', 'status', 'serverName', 'scheduleId'],
    },
  },
  required: ['schedules', 'scheduleLogs'],
  definitions: {
    positiveInt: {
      type: 'integer',
      minimum: 1,
      exclusiveMinimum: true
    }
  }
};

jsf.format('name', () => `Random Schedule Name (${Math.random(1000) * 1000 << 0})`);
jsf.format('isodate', () => randomDate({ year: 2021 }).toISOString());

const generatedData = await jsf.resolve(schema);
const scheduleIds = generatedData.schedules.map(schedule => schedule.id);

export const mockData = {
  schedules: [...generatedData.schedules],
  scheduleLogs: generatedData.scheduleLogs.map((log, index) => ({
    ...log,
    scheduleId: scheduleIds[index % scheduleIds.length],
  })),
};
