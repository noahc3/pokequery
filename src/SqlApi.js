import initSqlJs from "sql.js";

let db;
let init = false;

export async function initSqlite() {
    if (init) return;

    const sqlPromise = initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
    });
    const dataPromise = fetch("/pokequery.sqlite").then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
    db = new SQL.Database(new Uint8Array(buf));
    init = true;
}

//Execute a prepared statement
export async function execPrepared(query, values) {
    if (!init) return undefined;

    const statement = db.prepare(query);
    return statement.getAsObject(values);
}

//Execute a unprepared query
export async function exec(query) {
    if (!init) return undefined;

    return db.exec(query);
}

//Execute an unprepared query, ignore return value
export async function execQuiet(query) {
    if (!init) return undefined;

    db.run(query);
}