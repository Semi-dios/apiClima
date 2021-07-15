//DBConfig.js|tsx

export const DBConfig = {
    name: 'MyDB',
    version: 1,
    objectStoresMeta: [
      {
        store: 'climas',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'city', keypath: 'city', options: { unique: false } },
          { name: 'country', keypath: 'country', options: { unique: false } },
          { name: 'temperature', keypath: 'temperature', options: { unique: false } },
          { name: 'humidity', keypath: 'humidity', options: { unique: false } },
          { name: 'lat', keypath: 'lat', options: { unique: false } },
          { name: 'lng', keypath: 'lng', options: { unique: false } },
          { name: 'hour', keypath: 'hour', options: { unique: false } },
        ]
      }
    ]
  };
  