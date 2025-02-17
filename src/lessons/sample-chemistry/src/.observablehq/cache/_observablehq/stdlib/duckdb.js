var M=Object.defineProperty;var s=(t,a)=>M(t,"name",{value:a,configurable:!0});var u;import*as l from"../../_npm/@duckdb/duckdb-wasm@1.29.0/_esm.js";var $=Object.defineProperty,o=s((t,a)=>$(t,"name",{value:a,configurable:!0}),"s"),_={extensions:{json:{install:!0,load:!1,mvp:"../../_duckdb/json-9e17312a",eh:"../../_duckdb/json-84958e8b"},parquet:{install:!0,load:!1,mvp:"../../_duckdb/parquet-e73e2805",eh:"../../_duckdb/parquet-e24fb295"}}};const f={mvp:{mainModule:import.meta.resolve("../../_npm/@duckdb/duckdb-wasm@1.29.0/dist/duckdb-mvp.wasm"),mainWorker:import.meta.resolve("../../_npm/@duckdb/duckdb-wasm@1.29.0/dist/duckdb-browser-mvp.worker.js")},eh:{mainModule:import.meta.resolve("../../_npm/@duckdb/duckdb-wasm@1.29.0/dist/duckdb-eh.wasm"),mainWorker:import.meta.resolve("../../_npm/@duckdb/duckdb-wasm@1.29.0/dist/duckdb-browser-eh.worker.js")}},q=l.selectBundle(f),j=new l.ConsoleLogger(l.LogLevel.WARNING);let m,p=[];const b=new Map;function k(t,a){a==null?(b.delete(t),m=w.of(),p=Array.from(b,e=>m.then(n=>y(n._db,...e)))):(b.set(t,a),m??=w.of(),p.push(m.then(e=>y(e._db,t,a))))}s(k,"N"),o(k,"registerTable");async function g(t,...a){return(await A()).query(t.join("?"),a)}s(g,"R"),o(g,"sql");async function A(){return await Promise.all(p),await(m??=w.of())}s(A,"T"),o(A,"getDefaultClient");const I=(u=class{constructor(a){Object.defineProperties(this,{_db:{value:a}})}async queryStream(a,e){const n=await this._db.connect();let r,i;try{if(e?.length>0?r=await(await n.prepare(a)).send(...e):r=await n.send(a),i=await r.next(),i.done)throw new Error("missing first batch")}catch(c){throw await n.close(),c}return{schema:i.value.schema,async*readRows(){try{for(;!i.done;)yield i.value.toArray(),i=await r.next()}finally{await n.close()}}}}async query(a,e){const n=await this._db.connect();let r;try{e?.length>0?r=await(await n.prepare(a)).query(...e):r=await n.query(a)}finally{await n.close()}return r}async queryRow(a,e){const n=(await this.queryStream(a,e)).readRows();try{const{done:r,value:i}=await n.next();return r||!i.length?null:i[0]}finally{await n.return()}}async sql(a,...e){return await this.query(a.join("?"),e)}queryTag(a,...e){return[a.join("?"),e]}escape(a){return`"${a}"`}async describeTables(){return Array.from(await this.query("SHOW TABLES"),({name:a})=>({name:a}))}async describeColumns({table:a}={}){return Array.from(await this.query(`DESCRIBE ${this.escape(a)}`),({column_name:e,column_type:n,null:r})=>({name:e,type:B(n),nullable:r!=="NO",databaseType:n}))}static async of(a={},e={}){const n=await S();return e.query?.castTimestampToDate===void 0&&(e={...e,query:{...e.query,castTimestampToDate:!0}}),e.query?.castBigIntToDouble===void 0&&(e={...e,query:{...e.query,castBigIntToDouble:!0}}),await n.open(e),await v(n,e.extensions),await Promise.all(Object.entries(a).map(([r,i])=>y(n,r,i))),new u(n)}static sql(){return this.of.apply(this,arguments).then(a=>a.sql.bind(a))}},s(u,"d"),u);o(I,"DuckDBClient");let w=I;Object.defineProperty(w.prototype,"dialect",{value:"duckdb"});async function v(t,a){const{mainModule:e}=await q,n=Object.keys(f).find(i=>e===f[i].mainModule),r=await t.connect();try{await Promise.all(Object.entries(_.extensions).map(([i,{load:c,[n]:N}])=>r.query(`INSTALL "${i}" FROM '${import.meta.resolve(N)}'`).then(()=>(a===void 0?c:a.includes(i))&&r.query(`LOAD "${i}"`))))}finally{await r.close()}}s(v,"B"),o(v,"registerExtensions");async function y(t,a,e){if(e=await e,C(e))return T(t,a,e);if(E(e))return d(t,a,e);if(Array.isArray(e))return h(t,a,e);if(O(e))return R(t,a,e);if(typeof e=="string")return L(t,a,e);if(e&&typeof e=="object"){if("data"in e){const{data:n,...r}=e;return E(n)?d(t,a,n,r):h(t,a,n,r)}if("file"in e){const{file:n,...r}=e;return T(t,a,n,r)}}throw new Error(`invalid source: ${e}`)}s(y,"b"),o(y,"insertSource");async function L(t,a,e){const n=await t.connect();try{await n.query(`CREATE VIEW '${a}' AS FROM '${e}'`)}finally{await n.close()}}s(L,"M"),o(L,"insertUrl");async function T(t,a,e,n){const r=await e.url();if(r.startsWith("blob:")){const c=await e.arrayBuffer();await t.registerFileBuffer(e.name,new Uint8Array(c))}else await t.registerFileURL(e.name,new URL(r,location).href,4);const i=await t.connect();try{switch(e.mimeType){case"text/csv":case"text/tab-separated-values":return await i.insertCSVFromPath(e.name,{name:a,schema:"main",...n}).catch(async c=>{if(c.toString().includes("Could not convert"))return await D(i,e,a);throw c});case"application/json":return await i.insertJSONFromPath(e.name,{name:a,schema:"main",...n});default:if(/\.arrow$/i.test(e.name)){const c=new Uint8Array(await e.arrayBuffer());return await i.insertArrowFromIPCStream(c,{name:a,schema:"main",...n})}if(/\.parquet$/i.test(e.name)){const c=e.size<5e7?"TABLE":"VIEW";return await i.query(`CREATE ${c} '${a}' AS SELECT * FROM parquet_scan('${e.name}')`)}if(/\.(db|ddb|duckdb)$/i.test(e.name))return await i.query(`ATTACH '${e.name}' AS ${a} (READ_ONLY)`);throw new Error(`unknown file type: ${e.mimeType}`)}}finally{await i.close()}}s(T,"h"),o(T,"insertFile");async function D(t,a,e){return await(await t.prepare(`CREATE TABLE '${e}' AS SELECT * FROM read_csv_auto(?, ALL_VARCHAR=TRUE)`)).send(a.name)}s(D,"C"),o(D,"insertUntypedCSV");async function d(t,a,e,n){const r=await t.connect();try{await r.insertArrowTable(e,{name:a,schema:"main",...n})}finally{await r.close()}}s(d,"y"),o(d,"insertArrowTable");async function R(t,a,e){const n=(await import("../../_npm/apache-arrow@19.0.0/_esm.js")).tableFromIPC(e.toArrowBuffer());return await d(t,a,n)}s(R,"D"),o(R,"insertArqueroTable");async function h(t,a,e,n){const r=(await import("../../_npm/apache-arrow@19.0.0/_esm.js")).tableFromJSON(e);return await d(t,a,r,n)}s(h,"E"),o(h,"insertArray");async function S(){const{mainWorker:t,mainModule:a}=await q,e=await l.createWorker(t),n=new l.AsyncDuckDB(j,e);return await n.instantiate(a),n}s(S,"O"),o(S,"createDuckDB");function B(t){switch(t){case"BIGINT":case"HUGEINT":case"UBIGINT":return"bigint";case"DOUBLE":case"REAL":case"FLOAT":return"number";case"INTEGER":case"SMALLINT":case"TINYINT":case"USMALLINT":case"UINTEGER":case"UTINYINT":return"integer";case"BOOLEAN":return"boolean";case"DATE":case"TIMESTAMP":case"TIMESTAMP WITH TIME ZONE":return"date";case"VARCHAR":case"UUID":return"string";default:return/^DECIMAL\(/.test(t)?"integer":"other"}}s(B,"g"),o(B,"getDuckDBType");function C(t){return t&&typeof t.name=="string"&&typeof t.url=="function"&&typeof t.arrayBuffer=="function"}s(C,"U"),o(C,"isFileAttachment");function O(t){return t&&typeof t.toArrowBuffer=="function"}s(O,"$"),o(O,"isArqueroTable");function E(t){return t&&typeof t.getChild=="function"&&typeof t.toArray=="function"&&t.schema&&Array.isArray(t.schema.fields)}s(E,"I"),o(E,"isArrowTable");export{w as DuckDBClient,A as getDefaultClient,k as registerTable,g as sql};
