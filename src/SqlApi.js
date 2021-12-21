import initSqlJs from "sql.js";

let db;
let init = false;

export async function initSqlite() {
    if (init) {
        console.warn("Already initialized.");
        return;
    }
    
    try {
        const sqlPromise = initSqlJs({
            locateFile: file => `https://sql.js.org/dist/${file}`
        });
        const dataPromise = fetch("/pokequery.sqlite").then(res => res.arrayBuffer());
        const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
        db = new SQL.Database(new Uint8Array(buf));
        init = true;
    } catch {
        console.error("Failed to load database file.");
    }
}

export function isReady() {
    return init;
}

//Execute a prepared statement
export function execPrepared(query, values) {
    if (!init) return undefined;

    const statement = db.prepare(query);
    console.log(statement);
    return statement.getAsObject(values);
}

//Execute a unprepared query
export function exec(query) {
    if (!init) return undefined;

    return db.exec(query);
}

//Execute an unprepared query, ignore return value
export function execQuiet(query) {
    if (!init) return undefined;

    db.run(query);
}