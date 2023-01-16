class Cat {
    static _client;
    static _tableName;

    static _attributes = {
        name: 'string',
        breed: 'string',
        color: 'string',
        birthday: 'date',
        weight: 'number'
    }

    static async createCat (insertValues) {
        // const {rows} = await this._client.query(`INSERT INTO ${this._tableName} (name, breed, color, birthday, weight) VALUES ('${name}', '${breed}', '${color}', '${birthday}', ${weight}) RETURNING *;`);
        // return rows;



        const insertAttr = Object
                            .entries(this._attributes)
                            .filter(([attr, domain]) => attr in insertValues)
                            .map(([attr]) => attr);

        const insertAttrSchema = insertAttr.map(attr => `${attr}`).join(',');

        const insertValueString = insertAttr.map(attr => {
            const value = insertValues[attr];
            return typeof value === 'string' || typeof value === 'date' ? `'${value}'` : value
        }).join(',');

        const str = `INSERT INTO ${this._tableName} (${insertAttrSchema}) VALUES
                (${insertValueString}) RETURNING *;`

        const {rows} = await this._client.query(str);
        return rows;

    }

    static async getOne(catId) {
        const {rows: foundedCat} = await this._client.query(`SELECT * FROM ${this._tableName} WHERE id = ${catId};`);
        return foundedCat;
    }
    static async getAll() {
        const {rows: allCats} = await this._client.query(`SELECT * FROM ${this._tableName};`);
        return allCats;
    }

    static async deleteCat(catId) {
        const {rows: deleted} = await this._client.query(`DELETE FROM ${this._tableName} WHERE id = ${catId} RETURNING *;`);
        return deleted;
    }

    static async updateCat({catId, updateValues}) {
        const insertAttr = Object
                            .entries(this._attributes)
                            .filter(([attr, domain]) => attr in updateValues)
                            .map(([attr]) => attr);
        const insertValueString = insertAttr.map(attr => {
            const value = updateValues[attr];
            return `${attr} = ${typeof value === 'string' || typeof value === 'date' ? `'${value}'` : value}`
        }).join(',');

        const {rows} = await this._client.query(`UPDATE ${this._tableName} SET ${insertValueString} WHERE id = ${catId} RETURNING *;`);

        return rows;

    }

}


module.exports = Cat;

/*
{
    name: ...,
    breed: ...,
    weight: ...,
}
*/


/*
UPDATE cats
SET att1 = value, attr2 = value, attr3 = value
WHERE id = 1;
*/