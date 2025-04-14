type Table = 'vlogs' | 'comments' | 'users';

const mockDatabase: Record<Table, any[]> = {
  vlogs: [],
  comments: [],
  users: [],
};

export const db = {
  async insert(table: Table, data: any) {
    const id = `${Date.now()}`;
    const newData = { id, ...data };
    mockDatabase[table].push(newData);
    return newData;
  },
  async findOne(table: Table, query: Record<string, any>) {
    return mockDatabase[table].find((item) =>
      Object.keys(query).every((key) => item[key] === query[key])
    );
  },
  async update(table: Table, query: Record<string, any>, updates: Record<string, any>) {
    const item = await this.findOne(table, query);
    if (item) {
      Object.assign(item, updates);
    }
    return item;
  },
  async findAll(table: Table) {
    return mockDatabase[table] || []; // Devuelve un array vacío si no hay datos
  },
};