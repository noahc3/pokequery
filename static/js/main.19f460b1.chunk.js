(this.webpackJsonppokequery=this.webpackJsonppokequery||[]).push([[0],{184:function(e,t,n){},185:function(e,t,n){},193:function(e,t){},195:function(e,t){},205:function(e,t){},207:function(e,t){},234:function(e,t){},236:function(e,t){},237:function(e,t){},242:function(e,t){},244:function(e,t){},250:function(e,t){},252:function(e,t){},271:function(e,t){},283:function(e,t){},286:function(e,t){},294:function(e,t,n){"use strict";n.r(t);var s={};n.r(s),n.d(s,"initSqlite",(function(){return f})),n.d(s,"isReady",(function(){return _})),n.d(s,"execPrepared",(function(){return k})),n.d(s,"exec",(function(){return g})),n.d(s,"execQuiet",(function(){return w}));n(179);var i,a=n(1),c=n.n(a),r=n(34),o=n.n(r),l=(n(184),n(9)),u=n(10),d=n(11),j=n(12),p=(n(185),n(7)),h=n(172),m=n(116),b=n.n(m),v=n(173),O=n.n(v),x=!1;function f(){return y.apply(this,arguments)}function y(){return(y=Object(h.a)(b.a.mark((function e(){var t,n,s,a,c,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x){e.next=3;break}return console.warn("Already initialized."),e.abrupt("return");case 3:return e.prev=3,t=O()({locateFile:function(e){return"https://sql.js.org/dist/".concat(e)}}),n=fetch("/pokequery.sqlite").then((function(e){return e.arrayBuffer()})),e.next=8,Promise.all([t,n]);case 8:s=e.sent,a=Object(p.a)(s,2),c=a[0],r=a[1],i=new c.Database(new Uint8Array(r)),x=!0,e.next=19;break;case 16:e.prev=16,e.t0=e.catch(3),console.error("Failed to load database file.");case 19:case"end":return e.stop()}}),e,null,[[3,16]])})))).apply(this,arguments)}function _(){return x}function k(e,t){if(x){var n=i.prepare(e);return console.log(n),n.getAsObject(t)}}function g(e){if(x)return i.exec(e)}function w(e){x&&i.run(e)}var q=n(175),C=n(300),S=n(174),N=n(0),P=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"saveAsCsv",value:function(){var e=this.props.cols,t=this.props.rows,n=new Blob([[e.join(",")].concat(t.map((function(e){return e.join(",")}))).join("\n")],{type:"text/plain;charset=utf-8"});Object(S.saveAs)(n,"output.csv")}},{key:"render",value:function(){var e=this,t=this.props.cols,n=this.props.rows,s=Object(N.jsx)(q.a,{size:"sm",onClick:function(){return e.saveAsCsv()},children:"Dump as CSV"});return Object(N.jsxs)("div",{className:"sql-result-table",children:[Object(N.jsx)("div",{children:Object(N.jsxs)("p",{children:["Got ",n.length," results. ",s]})}),n.length>1500&&Object(N.jsx)("p",{children:"Warning: Too many rows to display, only first 1500 rows are shown. All rows will be included in CSV dump."}),Object(N.jsx)("div",{className:"limit",children:Object(N.jsxs)(C.a,{striped:!0,bordered:!0,hover:!0,size:"sm",children:[Object(N.jsx)("thead",{children:Object(N.jsx)("tr",{children:t.map((function(e,t){return Object(N.jsx)("td",{children:e},t)}))})}),Object(N.jsx)("tbody",{children:n.slice(0,2e3).map((function(e,t){return Object(N.jsx)("tr",{children:e.map((function(e,t){return Object(N.jsx)("td",{children:e},t)}))},t)}))})]})})]})}}]),n}(c.a.Component),Q=n(302),G=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;Object(l.a)(this,n);var i=g((s=t.call(this,e)).props.query)[0];return s.props.onChange(i.values[0][0]),s.state={options:i.values,selectedOption:i.values[0][0],onChange:s.props.onChange},s}return Object(u.a)(n,[{key:"setValue",value:function(e){this.setState({selectedOption:e}),this.props.onChange(e)}},{key:"render",value:function(){var e=this,t=this.state.options,n=t.filter((function(t){return t[0]===e.state.selectedOption}))[0];return Object(N.jsxs)(Q.a,{className:"query-dropdown",children:[Object(N.jsx)(Q.a.Toggle,{size:"sm",variant:"success",id:"dropdown-basic",children:n[1]}),Object(N.jsx)(Q.a.Menu,{children:t.map((function(t,s){return Object(N.jsx)(Q.a.Item,{active:n[0]===t[0],onClick:function(){e.setValue(t[0])},eventKey:s,children:t[1]},s)}))})]})}}]),n}(c.a.Component),M=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={pokedex:1,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){console.log(this.state.pokedex);var e=g('select distinct pokedex_number "Dex Number", ps.name Name, genus Genus, group_concat(t.name, "; ") "Types", ps.generation_id Gen\n            from pokemon p\n            left join pokemon_species ps on p.species_id = ps.id\n            left join pokemon_dex_numbers pdn on ps.id = pdn.species_id\n            left join pokemon_types pt on p.id = pt.pokemon_id\n            left join types t on pt.type_id = t.id\n            where pdn.pokedex_id = '.concat(this.state.pokedex,"\n            group by p.id\n            order by pokedex_number;"))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show all Pokemon in the"}),Object(N.jsx)(G,{onChange:function(e){t.setState({pokedex:e})},query:"select id, name from pokedexes;"}),Object(N.jsx)("span",{children:"Pokedex."}),Object(N.jsx)("p",{}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),A=n(303),E=n(301),z=n(305),L=n(306),R=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={type:1,ailment:1,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g("select distinct ps.name Pokemon, m.name Move, CASE WHEN m.ailment_chance = 0 THEN 100 ELSE m.ailment_chance END || '%' \"Success Chance\"\n            from pokemon p\n            left join pokemon_species ps on p.species_id = ps.id\n            left join pokemon_moves pm on p.id = pm.pokemon_id\n            left join moves m on pm.move_id = m.id\n            left join ailments a on m.ailment_id = a.id\n            left join types t on m.type_id = t.id\n            where m.type_id = ".concat(this.state.type,"\n            and a.id = ").concat(this.state.ailment,"\n            order by m.id;"))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show all Pokemon that can learn a "}),Object(N.jsx)(G,{onChange:function(e){t.setState({type:e})},query:"select id, name from types;"}),Object(N.jsx)("span",{children:"type move which inflicts the "}),Object(N.jsx)(G,{onChange:function(e){t.setState({ailment:e})},query:"select a.id, a.name from ailments a where a.id in (select distinct m.ailment_id from moves m where m.ailment_id not null and m.ailment_id > 0)"}),Object(N.jsx)("span",{children:"ailment."}),Object(N.jsx)("p",{}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),K=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={type:1,stat:1,target:1,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g('select distinct ps.name Pokemon, m.name Move, CASE WHEN m.stat_chance = 0 THEN 100 ELSE m.stat_chance END || \'%\' "Success Chance", msc.change "Stat Change"\n            from pokemon p\n            left join pokemon_species ps on p.species_id = ps.id\n            left join pokemon_moves pm on p.id = pm.pokemon_id\n            left join moves m on pm.move_id = m.id\n            left join move_stat_changes msc on m.id = msc.move_id\n            left join stats s on msc.stat_id = s.id\n            left join move_targets mt on m.target_id = mt.id\n            where m.type_id = '.concat(this.state.type,"\n            and mt.id = ").concat(this.state.target,"\n            and s.id = ").concat(this.state.stat,"\n            and msc.change not null\n            order by m.id;"))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show all Pokemon that can learn a "}),Object(N.jsx)(G,{onChange:function(e){t.setState({type:e})},query:"select id, name from types;"}),Object(N.jsx)("span",{children:"type move which affects the "}),Object(N.jsx)(G,{onChange:function(e){t.setState({stat:e})},query:"select s.id, s.name from stats s where s.id in (select distinct stat_id from moves m left join move_stat_changes msc on m.id = msc.move_id where msc.stat_id not null);"}),Object(N.jsx)("span",{children:"stat and targets "}),Object(N.jsx)(G,{onChange:function(e){t.setState({target:e})},query:"select mt.id, mt.name from move_targets mt where mt.id in (select distinct target_id from moves m left join move_stat_changes msc on m.id = msc.move_id where msc.stat_id not null);"}),Object(N.jsx)("span",{children:"."}),Object(N.jsx)("p",{}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),V=n(304),T=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={value:s.props.initialValue},s}return Object(u.a)(n,[{key:"setValue",value:function(e){e=Math.min(this.props.max,Math.max(this.props.min,e.target.value)),this.setState({value:e}),this.props.onChange(e)}},{key:"render",value:function(){var e=this;return Object(N.jsx)("div",{className:"nud-input",children:Object(N.jsx)(V.a.Control,{size:"sm",type:"number",min:this.props.min,max:this.props.max,value:this.state.value,onChange:function(t){return e.setValue(t)}})})}}]),n}(c.a.Component),I=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={type:1,pp:5,accuracy:50,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g('select m.name "Move", tsrc.name "Type", m.pp "PP", m.accuracy || \'%\' "Accuracy"\n            from moves m\n            left join type_efficacy te on m.type_id = te.source_type_id\n            left join types tsrc on te.source_type_id = tsrc.id\n            left join types tdest on te.target_type_id = tdest.id\n            where damage_factor > 100\n            and tdest.id = '.concat(this.state.type,"\n            and m.pp >= ").concat(this.state.pp,"\n            and m.accuracy >= ").concat(this.state.accuracy,";"))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show all moves that are super effective against "}),Object(N.jsx)(G,{onChange:function(e){t.setState({type:e})},query:"select id, name from types;"}),Object(N.jsx)("span",{children:" type Pokemon with a PP of at least "}),Object(N.jsx)(T,{onChange:function(e){t.setState({pp:e})},initialValue:this.state.pp,min:0,max:40}),Object(N.jsx)("span",{children:" and an accuracy of at least "}),Object(N.jsx)(T,{onChange:function(e){t.setState({accuracy:e})},initialValue:this.state.accuracy,min:0,max:100}),Object(N.jsx)("span",{children:" percent."}),Object(N.jsx)("p",{}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),D=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={version:1,type:1,min:1,max:100,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g('select * from \n            (select distinct ps.name "Pokemon", l.name "Location", v.name "Game", min(e.min_level) "Min Level", max(e.max_level) "Max Level" \n            from encounters e\n            left join pokemon p on e.pokemon_id = p.id\n            left join pokemon_species ps on p.species_id = ps.id\n            left join pokemon_types pt on p.id = pt.pokemon_id\n            left join versions v on e.version_id = v.id\n            left join location_areas la on e.location_area_id = la.id\n            left join locations l on la.location_id = l.id\n            where v.id = '.concat(this.state.version,"\n            and pt.type_id = ").concat(this.state.type,'\n            group by p.id, l.id\n            order by e.location_area_id)\n            where "Max Level" >= ').concat(this.state.min,'\n            and "Min Level" <= ').concat(this.state.max,";"))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show where to catch "}),Object(N.jsx)(G,{onChange:function(e){t.setState({type:e})},query:"select id, name from types;"}),Object(N.jsx)("span",{children:" type Pokemon between levels "}),Object(N.jsx)(T,{onChange:function(e){t.setState({min:e})},initialValue:this.state.min,min:0,max:100}),Object(N.jsx)("span",{children:" and "}),Object(N.jsx)(T,{onChange:function(e){t.setState({max:e})},initialValue:this.state.max,min:0,max:100}),Object(N.jsx)("span",{children:" in Pokemon "}),Object(N.jsx)(G,{onChange:function(e){t.setState({version:e})},query:"select id, name from versions v where v.id in (select e.version_id from encounters e);"}),Object(N.jsx)("span",{children:"."}),Object(N.jsx)("p",{}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),F=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={version:1,location:1,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g('select ps.name "Pokemon", types "Types", l.name "Location", min(e.min_level) "Min Level", max(e.max_level) "Max Level" from encounters e\n            left join (\n                select p.id id, ps.name name, group_concat(t.name, ", ") types from pokemon p\n                left join pokemon_species ps on p.species_id = ps.id\n                left join pokemon_types pt on p.id = pt.pokemon_id\n                left join types t on pt.type_id = t.id\n                group by p.id\n                ) ps on e.pokemon_id = ps.id\n            left join location_areas la on e.location_area_id = la.id\n            left join locations l on la.location_id = l.id\n            where e.version_id = '.concat(this.state.version,"\n            and l.id = ").concat(this.state.location,"\n            group by e.pokemon_id, la.location_id\n            order by la.id;"))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show which Pokemon can be obtained in Pokemon "}),Object(N.jsx)(G,{onChange:function(e){t.setState({version:e,location:1})},query:"select id, name from versions v where v.id in (select e.version_id from encounters e);"}),Object(N.jsx)("span",{children:" at "}),Object(N.jsx)(G,{onChange:function(e){t.setState({location:e})},query:"select distinct l.id, l.name from encounters e left join location_areas la on e.location_area_id = la.id left join locations l on la.location_id = l.id where e.version_id = ".concat(this.state.version,";")},"q6-location-dropdown-pkmn-"+this.state.version),Object(N.jsx)("span",{children:"."}),Object(N.jsx)("p",{}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),B=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={version:1,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g('select ps.name, count(*) "Possible Locations" from pokemon p\n            left join (\n                select distinct e2.pokemon_id "pid", e2.location_area_id "lid"\n                from encounters e2\n                where version_id = '.concat(this.state.version,"\n                ) e on p.id = e.pid\n            left join pokemon_species ps on p.species_id = ps.id\n            where p.id in (select pokemon_id from encounters e where version_id = ").concat(this.state.version,')\n            group by p.id\n            order by "Possible Locations" desc;'))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show how many locations each Pokemon can be encounted at in Pokemon "}),Object(N.jsx)(G,{onChange:function(e){t.setState({version:e})},query:"select id, name from versions v where v.id in (select e.version_id from encounters e);"}),Object(N.jsx)("span",{children:"."}),Object(N.jsx)("p",{className:"italics",children:'In this context, a "location" may be a specific patch of grass, a specific fishing pond, a specific building with an NPC interaction, etc.'}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),H=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={generation:1,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g('select name "Pokemon", group_concat(gid, ", ") "Also Available in Generations" from\n            (select distinct p.id "pid", g.id "gid", ps.name "name" from encounters e\n            left join pokemon p on e.pokemon_id = p.id\n            left join pokemon_species ps on p.species_id = ps.id\n            left join versions v on e.version_id = v.id\n            left join version_groups vg on v.version_group_id = vg.id\n            left join generations g on vg.generation_id = g.id\n            where ps.generation_id = '.concat(this.state.generation,'\n            except\n                select distinct p2.id "pid", ps2.generation_id "gid", ps2.name "name" from pokemon p2\n                left join pokemon_species ps2 on p2.species_id = ps2.id)\n            group by pid\n            order by pid;'))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show which other generations Pokemon from "}),Object(N.jsx)(G,{onChange:function(e){t.setState({generation:e})},query:"select id, name from generations g where g.id < 6;"}),Object(N.jsx)("span",{children:" can be naturally obtained in."}),Object(N.jsx)("p",{className:"italics",children:'In this context, "naturally obtained" means can be encountered in the game without trading or special events. Some special locations are excluded (ex. Mirage Island). Data from Generation 7+ is not included.'}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),W=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={generation:1,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g('select t.name "Pokemon", count(*) "Number of Pokemon Introduced" from pokemon p\n            left join pokemon_species ps on p.species_id = ps.id\n            left join generations g on ps.generation_id = g.id\n            left join pokemon_types pt on p.id = pt.pokemon_id\n            left join types t on pt.type_id = t.id\n            where ps.generation_id = '.concat(this.state.generation,'\n            and p.id < 10000\n            group by t.id\n            order by "Number of Pokemon Introduced" desc;'))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show the number of Pokemon of each type introduced in "}),Object(N.jsx)(G,{onChange:function(e){t.setState({generation:e})},query:"select id, name from generations;"}),Object(N.jsx)("span",{children:"."}),Object(N.jsx)("p",{className:"italics",children:"In situations where Pokemon typings have changed (ex. Fairy type), the newest type data is used. Forms (Megas, Alolan, Galarian, etc) are excluded."}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),J=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={generation:1,result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g('select t.name, count(*) "Count" from moves m\n            left join generations g on m.generation_id = g.id\n            left join types t on m.type_id = t.id\n            where m.generation_id = '.concat(this.state.generation,'\n            group by t.id\n            order by "Count" desc;'))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show the number of moves of each type introduced in "}),Object(N.jsx)(G,{onChange:function(e){t.setState({generation:e})},query:"select id, name from generations;"}),Object(N.jsx)("span",{children:"."}),Object(N.jsx)("p",{className:"italics",children:"In situations where move typings have changed (ex. Fairy type), the newest type data is used."}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),U=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={table:"ailments",result:null},s}return Object(u.a)(n,[{key:"runQuery",value:function(){var e=g("select * from ".concat(this.state.table,";"))[0];this.setState({result:e})}},{key:"render",value:function(){var e,t=this,n=this.state.result;return e=n?Object(N.jsx)(P,{rows:n.values,cols:n.columns}):void 0===n?Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Got 0 results."})}):Object(N.jsx)("div",{className:"sql-result-table",children:Object(N.jsx)("p",{children:"Results will appear here."})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"inline-query-span",children:[Object(N.jsx)("span",{children:"Show all data for the "}),Object(N.jsx)(G,{onChange:function(e){t.setState({table:e})},query:'select distinct tbl_name, tbl_name from sqlite_master where type = "table";'}),Object(N.jsx)("span",{children:"table."}),Object(N.jsx)("p",{}),Object(N.jsx)(q.a,{size:"sm",onClick:function(){t.runQuery()},children:"Query"})]}),Object(N.jsx)("hr",{}),e]})}}]),n}(c.a.Component),X=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var i;return Object(l.a)(this,n),(i=t.call(this,e)).state={init:!1},f().then((function(){window.sql=s,i.setState({init:!0})})),i}return Object(u.a)(n,[{key:"render",value:function(){return this.state.init?Object(N.jsxs)("div",{children:[Object(N.jsx)(A.a,{bg:"dark",variant:"dark",children:Object(N.jsx)(A.a.Brand,{children:"PokeQuery"})}),Object(N.jsx)(E.a,{children:Object(N.jsxs)(z.a,{defaultActiveKey:"q1",children:[Object(N.jsx)(L.a,{eventKey:"q1",title:"Pokedex Lookup",children:Object(N.jsx)(M,{})}),Object(N.jsx)(L.a,{eventKey:"q5",title:"Encounter Lookup by Pokemon",children:Object(N.jsx)(D,{})}),Object(N.jsx)(L.a,{eventKey:"q6",title:"Encounter Lookup by Location",children:Object(N.jsx)(F,{})}),Object(N.jsx)(L.a,{eventKey:"q2",title:"Pokemon Moves by Ailment",children:Object(N.jsx)(R,{})}),Object(N.jsx)(L.a,{eventKey:"q3",title:"Pokemon Moves by Stat",children:Object(N.jsx)(K,{})}),Object(N.jsx)(L.a,{eventKey:"q4",title:"Effective Moves",children:Object(N.jsx)(I,{})}),Object(N.jsx)(L.a,{eventKey:"q7",title:"Pokemon Encounter Rarity",children:Object(N.jsx)(B,{})}),Object(N.jsx)(L.a,{eventKey:"q8",title:"Pokemon Alt. Generations",children:Object(N.jsx)(H,{})}),Object(N.jsx)(L.a,{eventKey:"q9",title:"Pokemon Type Popularity",children:Object(N.jsx)(W,{})}),Object(N.jsx)(L.a,{eventKey:"q10",title:"Move Type Popularity",children:Object(N.jsx)(J,{})}),Object(N.jsx)(L.a,{eventKey:"qex",title:"Raw Tables",children:Object(N.jsx)(U,{})})]})})]}):Object(N.jsx)("div",{className:"App",children:Object(N.jsx)("p",{children:"Please wait while we load the database..."})})}}]),n}(c.a.Component);o.a.render(Object(N.jsx)(c.a.StrictMode,{children:Object(N.jsx)(X,{})}),document.getElementById("root"))}},[[294,1,2]]]);
//# sourceMappingURL=main.19f460b1.chunk.js.map